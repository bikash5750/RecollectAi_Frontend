import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import Badge from './ui/Badge';
import Card from './ui/Card';

const NoteCard = ({ note }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return d.toLocaleDateString();
    }
  };

  const getCategoryTone = (category) => {
    const tones = {
      'Lecture Notes': 'brand',
      'Assignments & Deadlines': 'gold',
      'Exams/Test Reminders': 'rose',
      'Events & Meetups': 'sage',
      'Personal Reflections': 'neutral',
    };
    return tones[category] || 'neutral';
  };

  return (
    <Link to={`/note/${note._id}`}>
      <Card className="p-6 hover:shadow-[0_1px_0_rgba(17,24,39,0.06),_0_14px_30px_rgba(17,24,39,0.08)] transition-shadow duration-200 cursor-pointer">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-xl font-serif text-ink line-clamp-2 flex-1">
            {note.title}
          </h3>
        </div>

        <Badge tone={getCategoryTone(note.category)} className="mb-4">
          {note.category}
        </Badge>

        <p className="text-ink-muted mb-4 line-clamp-4 leading-relaxed">
          {note.summary}
        </p>

        {note.keyPoints && note.keyPoints.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {note.keyPoints.slice(0, 2).map((point, index) => (
                <li key={index} className="text-sm text-ink-muted flex items-start">
                  <span className="text-brand-700 mr-2">•</span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
            {note.keyPoints.length > 2 && (
              <p className="text-xs text-ink-muted mt-1">
                +{note.keyPoints.length - 2} more points
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-ink-muted pt-3 border-t border-line">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatDate(note.createdAt)}</span>
          </div>
          {note.highlightedSections && note.highlightedSections.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag size={14} />
              <span>{note.highlightedSections.length} highlights</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default NoteCard;
