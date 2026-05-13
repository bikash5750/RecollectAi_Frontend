import { useState } from 'react';
import { Search as SearchIcon, Loader, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import { notesAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const CATEGORIES = [
  'all',
  'Lecture Notes',
  'Assignments & Deadlines',
  'Exams/Test Reminders',
  'Events & Meetups',
  'Personal Reflections',
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await notesAPI.searchNotes(
        query,
        selectedCategory !== 'all' ? selectedCategory : undefined
      );
      setResults(response.data.notes);
    } catch (error) {
      toast.error('Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <Badge tone="brand" className="mb-4">
          <SearchIcon size={14} />
          Smart search
        </Badge>
        <h1 className="page-header">Search</h1>
        <p className="text-ink-muted">Find phrases across transcripts, summaries, and key points.</p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for keywords, topics, or phrases…"
              className="input pl-11 text-base"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter size={16} className="text-ink-muted" />
              <label className="text-sm font-semibold text-ink">Category</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'btn btn-primary' : 'btn btn-secondary'}
                >
                  {category === 'all' ? 'All categories' : category}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            <SearchIcon size={18} />
            Search
          </Button>
        </form>
      </Card>

      <div className="mt-10">
        {loading ? (
          <div className="py-20 text-center">
            <Loader className="animate-spin text-brand-600 mx-auto mb-3" size={32} />
            <p className="text-ink-muted font-medium">Searching…</p>
          </div>
        ) : searched ? (
          results.length === 0 ? (
            <Card className="p-10 text-center">
              <h3 className="text-2xl font-serif text-ink">No results</h3>
              <p className="mt-2 text-ink-muted">Try a broader query or change the category filter.</p>
            </Card>
          ) : (
            <div className="animate-slide-up">
              <div className="mb-6 text-sm text-ink-muted">
                Found <span className="font-bold text-ink">{results.length}</span>{' '}
                {results.length === 1 ? 'result' : 'results'} for <span className="font-semibold text-ink">“{query}”</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            </div>
          )
        ) : (
          <Card className="p-10">
            <h3 className="text-2xl font-serif text-ink">Start with a question</h3>
            <p className="mt-2 text-ink-muted">
              Search is best for recall: names, definitions, dates, and phrases you remember hearing.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
