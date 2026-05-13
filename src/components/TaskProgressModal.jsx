import { useState } from 'react';
import { X, Save } from 'lucide-react';
import ProgressBar from './ProgressBar';
import ProgressBadge from './ProgressBadge';
import Button from './ui/Button';

const TaskProgressModal = ({ task, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: task.status || 'not_started',
    progressPercentage: task.progressPercentage || 0,
    submitted: task.submitted || false,
    progressNote: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onUpdate(task._id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update progress');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-lg w-full p-8 shadow-paper animate-slide-up max-h-[90vh] overflow-y-auto border border-line">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-serif text-ink mb-1">Update progress</h2>
            <p className="text-ink-muted">{task.title}</p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary px-3 py-2"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Status Preview */}
          <div className="rounded-lg p-5 border border-line bg-paper-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-ink-muted">Current status</span>
              <ProgressBadge status={formData.status} submitted={formData.submitted} />
            </div>
            <ProgressBar percentage={formData.progressPercentage} status={formData.status} />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="input"
            >
              <option value="not_started">Not Started </option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Progress Slider */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-3">
              Progress: {formData.progressPercentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.progressPercentage}
              onChange={(e) => setFormData({ ...formData, progressPercentage: parseInt(e.target.value) })}
              className="w-full h-3 bg-paper-200 rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(82 75 130) 0%, rgb(82 75 130) ${formData.progressPercentage}%, rgb(240 236 228) ${formData.progressPercentage}%, rgb(240 236 228) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-ink-muted mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Submitted Checkbox */}
          <div className="flex items-center space-x-3 p-4 bg-paper-50 rounded-lg border border-line">
            <input
              type="checkbox"
              id="submitted"
              checked={formData.submitted}
              onChange={(e) => setFormData({ ...formData, submitted: e.target.checked })}
              className="w-4 h-4 accent-accent-sage cursor-pointer"
            />
            <label htmlFor="submitted" className="text-ink font-semibold cursor-pointer flex-1">
              Mark as submitted
            </label>
          </div>

          {/* Progress Note */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Add Progress Note (Optional)
            </label>
            <textarea
              value={formData.progressNote}
              onChange={(e) => setFormData({ ...formData, progressNote: e.target.value })}
              placeholder="E.g., Finished research, working on outline..."
              className="input"
              rows={3}
            />
          </div>

          {/* Previous Progress Notes */}
          {task.progressNotes && task.progressNotes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-ink mb-3">
                Progress History
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {task.progressNotes.map((pNote, index) => (
                  <div key={index} className="bg-paper-50 border border-line rounded-lg p-3 text-sm">
                    <p className="text-ink">{pNote.note}</p>
                    <p className="text-xs text-ink-muted mt-1">
                      {new Date(pNote.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button type="submit" disabled={saving} className="flex-1">
              <Save size={18} />
              {saving ? 'Saving…' : 'Save'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskProgressModal;
