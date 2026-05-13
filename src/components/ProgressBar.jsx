const ProgressBar = ({ percentage, status }) => {
  const getColor = () => {
    if (status === 'completed') return 'bg-accent-sage';
    if (status === 'in_progress') return 'bg-brand-600';
    return 'bg-paper-200';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-ink-muted">Progress</span>
        <span className="text-sm font-semibold text-ink">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-paper-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
