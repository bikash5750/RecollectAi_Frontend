const ProgressBadge = ({ status, submitted }) => {
  const getBadgeStyle = () => {
    if (submitted) {
      return 'bg-[color:rgb(47_107_88_/_.12)] text-[color:#1F4B3E] border-accent-sage/30';
    }
    
    switch (status) {
      case 'completed':
        return 'bg-[color:rgb(47_107_88_/_.12)] text-[color:#1F4B3E] border-accent-sage/30';
      case 'in_progress':
        return 'bg-brand-50 text-brand-800 border-brand-600/25';
      case 'not_started':
        return 'bg-paper-50 text-ink-muted border-line';
      default:
        return 'bg-paper-50 text-ink-muted border-line';
    }
  };

  const getIcon = () => {
    if (submitted) return '✅';
    switch (status) {
      case 'completed': return 'completed';
      case 'in_progress': return 'in progress';
      case 'not_started': return 'not started';
      default: return '○';
    }
  };

  const getLabel = () => {
    if (submitted) return 'Submitted';
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'not_started': return 'Not Started';
      default: return 'Unknown';
    }
  };

  return (
    <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}>
      <span>{getIcon()}</span>
      <span>{getLabel()}</span>
    </span>
  );
};

export default ProgressBadge;
