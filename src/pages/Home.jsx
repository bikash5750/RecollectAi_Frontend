import { useState, useEffect } from 'react';
import { Filter, Loader, Mic } from 'lucide-react';
import toast from 'react-hot-toast';
import RecordButton from '../components/RecordButton';
import NoteCard from '../components/NoteCard';
import { notesAPI } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const CATEGORIES = [
  'all',
  'Lecture Notes',
  'Assignments & Deadlines',
  'Exams/Test Reminders',
  'Events & Meetups',
  'Personal Reflections',
];

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, [selectedCategory]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await notesAPI.getNotes(params);
      setNotes(response.data.notes);
    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleRecordingComplete = async (audioBlob, duration) => {
    setProcessing(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('duration', duration);

      toast.loading('Processing your recording...', { id: 'processing' });

      const response = await notesAPI.processAudio(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      });

      toast.dismiss('processing');
      toast.success('Note created successfully!');

      // Refresh notes
      fetchNotes();
    } catch (error) {
      toast.dismiss('processing');
      toast.error(error.response?.data?.message || 'Failed to process recording');
    } finally {
      setProcessing(false);
      setUploadProgress(0);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="page-header">Notes</h1>
        <p className="text-ink-muted">
          Record once, read forever. Your transcripts, summaries, and key points live here.
        </p>
      </div>

      {/* Recording */}
      <Card className="p-8 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <Badge tone="brand" className="mb-4">
              <Mic size={14} />
              Voice capture
            </Badge>
            <h2 className="section-header">Capture a new note</h2>
            <p className="text-ink-muted leading-relaxed">
              Speak naturally. RecollectAI turns your recording into a clean summary, key points, and a searchable transcript.
            </p>
          </div>

          <div className="md:shrink-0">
            <RecordButton onRecordingComplete={handleRecordingComplete} />
          </div>
        </div>

        {processing ? (
          <div className="mt-8 subtle-divider pt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Loader className="animate-spin text-brand-600" size={18} />
                <span className="text-sm font-semibold text-ink">
                  Processing… <span className="text-ink-muted">{uploadProgress}%</span>
                </span>
              </div>
              <Button variant="secondary" size="sm" disabled>
                Please wait
              </Button>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-paper-200">
              <div
                className="h-2 rounded-full bg-brand-600 transition-all duration-500"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : null}
      </Card>

      {/* Filters */}
      <div className="mt-10 mb-4 flex items-center gap-3">
        <Filter size={18} className="text-ink-muted" />
        <h3 className="text-xl font-serif text-ink">Browse</h3>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            {category === 'all' ? 'All notes' : category}
          </button>
        ))}
      </div>

      {/* Notes */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader className="animate-spin text-brand-600 mx-auto mb-3" size={32} />
          <p className="text-ink-muted font-medium">Loading your notes…</p>
        </div>
      ) : notes.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-line bg-paper-50">
            <Mic className="text-brand-700" size={24} />
          </div>
          <h3 className="text-2xl font-serif text-ink">No notes yet</h3>
          <p className="mt-2 text-ink-muted">
            Start with a recording above — you’ll get a transcript, summary, and key points automatically.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
