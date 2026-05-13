import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Trash2, CheckSquare, ChevronDown, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { notesAPI, tasksAPI } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [relatedTasks, setRelatedTasks] = useState([]);

  useEffect(() => {
    fetchNote();
    fetchRelatedTasks();
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await notesAPI.getNote(id);
      setNote(response.data);
    } catch (error) {
      toast.error('Failed to fetch note');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      const tasks = response.data.tasks.filter(task => task.note === id);
      setRelatedTasks(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(id);
        toast.success('Note deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete note');
      }
    }
  };

  const handleCreateTask = async () => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const dueDate = prompt('Enter due date (e.g., tomorrow, next Monday, 2024-12-25):');
    if (!dueDate) return;

    try {
      await tasksAPI.createTask({
        title,
        dueDate,
        noteId: id,
        description: note.summary,
        category: 'Other',
      });
      toast.success('Task created successfully');
      fetchRelatedTasks();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category) => {
    const tones = {
      'Lecture Notes': 'brand',
      'Assignments & Deadlines': 'gold',
      'Exams/Test Reminders': 'rose',
      'Events & Meetups': 'sage',
      'Personal Reflections': 'neutral',
    };
    return tones[category] || 'neutral';
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader className="animate-spin text-brand-600 mx-auto mb-3" size={36} />
        <p className="text-ink-muted font-medium">Loading note…</p>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-ink transition-colors"
      >
        <ArrowLeft size={18} />
        Back to notes
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-4xl md:text-5xl font-serif text-ink leading-tight">{note.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge tone={getCategoryColor(note.category)}>{note.category}</Badge>
            <div className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <Clock size={16} />
              <span>{formatDate(note.createdAt)}</span>
            </div>
            {note.highlightedSections && note.highlightedSections.length > 0 ? (
              <div className="inline-flex items-center gap-2 text-sm text-ink-muted">
                <Tag size={16} />
                <span>{note.highlightedSections.length} highlights</span>
              </div>
            ) : null}
          </div>
        </div>

        <Button variant="secondary" className="shrink-0" onClick={handleDelete} title="Delete note">
          <Trash2 size={18} />
          Delete
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        <Card className="p-8">
          <h2 className="text-2xl font-serif text-ink mb-4">Summary</h2>
          <p className="text-ink-muted leading-relaxed whitespace-pre-line">{note.summary}</p>
        </Card>

        {note.keyPoints && note.keyPoints.length > 0 ? (
          <Card className="p-8">
            <h2 className="text-2xl font-serif text-ink mb-5">Key points</h2>
            <ul className="space-y-3">
              {note.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full border border-line bg-paper-50 text-xs font-bold text-ink">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-ink-muted leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        {note.highlightedSections && note.highlightedSections.length > 0 ? (
          <Card className="p-8">
            <h2 className="text-2xl font-serif text-ink mb-5">Highlights</h2>
            <div className="space-y-4">
              {note.highlightedSections.map((highlight, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-line bg-paper-50 p-5 shadow-[0_1px_0_rgba(17,24,39,0.06)]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Badge tone="gold">
                      <Tag size={14} />
                      {highlight.keyword}
                    </Badge>
                  </div>
                  <p className="text-ink leading-relaxed">{highlight.text}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        {relatedTasks.length > 0 ? (
          <Card className="p-8">
            <h2 className="text-2xl font-serif text-ink mb-5">Related tasks</h2>
            <div className="space-y-3">
              {relatedTasks.map((task) => (
                <Link
                  key={task._id}
                  to="/tasks"
                  className="flex items-center justify-between rounded-lg border border-line bg-white p-4 hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-white shadow-[0_1px_0_rgba(17,24,39,0.06)]">
                      <CheckSquare size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-ink">{task.title}</div>
                      <div className="text-sm text-ink-muted">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ) : null}

        <Button className="w-full" onClick={handleCreateTask}>
          <CheckSquare size={18} />
          Convert to task
        </Button>

        <Card className="p-8">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between gap-3 text-left"
          >
            <h2 className="text-2xl font-serif text-ink">Full transcript</h2>
            <span
              className={`btn btn-secondary px-3 py-2 ${showTranscript ? 'rotate-180' : ''} transform duration-200`}
              aria-hidden="true"
            >
              <ChevronDown size={18} />
            </span>
          </button>

          {showTranscript ? (
            <div className="mt-6 subtle-divider pt-6 animate-slide-up">
              <p className="text-ink-muted text-base leading-relaxed whitespace-pre-wrap">{note.transcript}</p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default NoteDetail;
