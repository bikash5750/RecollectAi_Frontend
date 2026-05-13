import { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Trash2, Plus, Filter, Loader, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import TaskProgressModal from '../components/TaskProgressModal';
import ProgressBar from '../components/ProgressBar';
import ProgressBadge from '../components/ProgressBadge';
import { tasksAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const TASK_CATEGORIES = ['all', 'Assignment', 'Exam', 'Project', 'Event', 'Other'];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Other',
  });

  useEffect(() => {
    fetchTasks();
    fetchUpcomingTasks();
    fetchStats();
  }, [selectedCategory, showCompleted]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {
        completed: showCompleted ? undefined : false,
      };
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingTasks = async () => {
    try {
      const response = await tasksAPI.getUpcomingTasks();
      setUpcomingTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch upcoming tasks');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await tasksAPI.getProgressStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleUpdateProgress = async (taskId, progressData) => {
    try {
      await tasksAPI.updateTask(taskId, progressData);
      toast.success('Progress updated successfully!');
      fetchTasks();
      fetchUpcomingTasks();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update progress');
      throw error;
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      await tasksAPI.updateTask(taskId, { completed: !currentStatus });
      toast.success(!currentStatus ? 'Task completed!' : 'Task reopened');
      fetchTasks();
      fetchUpcomingTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        toast.success('Task deleted');
        fetchTasks();
        fetchUpcomingTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.createTask(newTask);
      toast.success('Task created successfully');
      setShowAddModal(false);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        category: 'Other',
      });
      fetchTasks();
      fetchUpcomingTasks();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = d.toDateString() === today.toDateString();
    const isTomorrow = d.toDateString() === tomorrow.toDateString();
    const isPast = d < today && !isToday;

    let dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });

    if (isToday) dateStr = 'Today';
    if (isTomorrow) dateStr = 'Tomorrow';

    return { dateStr, isPast, isToday, isTomorrow };
  };

  const getCategoryTone = (category) => {
    const tones = {
      Assignment: 'gold',
      Exam: 'rose',
      Project: 'brand',
      Event: 'sage',
      Other: 'neutral',
    };
    return tones[category] || 'neutral';
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="page-header">Tasks</h1>
          <p className="text-ink-muted">A calm, academic view of what’s due next.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add task
        </Button>
      </div>

      {/* Progress Statistics Dashboard */}
      {stats && stats.total > 0 ? (
        <Card className="p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white shadow-[0_1px_0_rgba(17,24,39,0.06)]">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-2xl font-serif text-ink">Progress overview</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="rounded-lg border border-line bg-paper-50 p-4 text-center">
              <div className="text-3xl font-serif text-accent-sage mb-1">{stats.completed}</div>
              <div className="text-sm text-ink-muted font-semibold">Completed</div>
            </div>
            <div className="rounded-lg border border-line bg-paper-50 p-4 text-center">
              <div className="text-3xl font-serif text-brand-700 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-ink-muted font-semibold">In progress</div>
            </div>
            <div className="rounded-lg border border-line bg-paper-50 p-4 text-center">
              <div className="text-3xl font-serif text-ink mb-1">{stats.notStarted}</div>
              <div className="text-sm text-ink-muted font-semibold">Not started</div>
            </div>
            <div className="rounded-lg border border-line bg-paper-50 p-4 text-center">
              <div className="text-3xl font-serif text-accent-gold mb-1">{stats.submitted}</div>
              <div className="text-sm text-ink-muted font-semibold">Submitted</div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-ink-muted">Overall</span>
              <span className="text-2xl font-serif text-ink">{stats.averageProgress}%</span>
            </div>
            <div className="w-full h-3 bg-paper-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.averageProgress}%` }}
              />
            </div>
          </div>
        </Card>
      ) : null}

      {/* Upcoming Tasks */}
      {upcomingTasks.length > 0 ? (
        <Card className="p-8 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white shadow-[0_1px_0_rgba(17,24,39,0.06)]">
              <Calendar size={20} />
            </div>
            <h2 className="text-2xl font-serif text-ink">Coming up</h2>
            <span className="text-sm text-ink-muted">(next 7 days)</span>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const { dateStr, isToday } = formatDate(task.dueDate);
              return (
                <div
                  key={task._id}
                  className={`rounded-lg border border-line bg-white p-4 ${
                    isToday ? 'ring-2 ring-accent-rose/25' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-semibold text-ink truncate">{task.title}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge tone={getCategoryTone(task.category)}>{task.category}</Badge>
                        <span className={`text-sm ${isToday ? 'text-accent-rose font-semibold' : 'text-ink-muted'}`}>
                          Due {dateStr}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleComplete(task._id, task.completed)}
                      className="btn btn-secondary px-3 py-2"
                      title="Mark complete"
                    >
                      <CheckSquare size={18} className="text-ink-muted" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : null}

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-ink-muted" />
          <h3 className="text-xl font-serif text-ink">All tasks</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {TASK_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {category === 'all' ? 'All categories' : category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showCompleted"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-4 h-4 accent-brand-600 cursor-pointer"
          />
          <label htmlFor="showCompleted" className="text-sm text-ink-muted font-semibold cursor-pointer">
            Include completed
          </label>
        </div>
      </div>

      {/* Tasks List */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader className="animate-spin text-brand-600 mx-auto mb-3" size={32} />
          <p className="text-ink-muted font-medium">Loading tasks…</p>
        </div>
      ) : tasks.length === 0 ? (
        <Card className="p-10 text-center">
          <h3 className="text-2xl font-serif text-ink">No tasks found</h3>
          <p className="mt-2 text-ink-muted">
            {showCompleted ? 'No completed tasks yet.' : 'Create a task, or record a note with deadlines.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => {
            const { dateStr, isPast } = formatDate(task.dueDate);
            return (
              <Card key={task._id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleComplete(task._id, task.completed)}
                      className={`mt-1 grid h-6 w-6 place-items-center rounded-md border transition-colors ${
                        task.completed ? 'bg-brand-600 border-brand-600' : 'bg-white border-line hover:border-brand-600/50'
                      }`}
                      title={task.completed ? 'Reopen task' : 'Mark complete'}
                    >
                      {task.completed ? (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3
                          className={`text-lg font-semibold ${
                            task.completed ? 'line-through text-ink-muted' : 'text-ink'
                          }`}
                        >
                          {task.title}
                        </h3>
                        <ProgressBadge status={task.status} submitted={task.submitted} />
                      </div>

                      {task.description ? <p className="text-sm text-ink-muted mb-3">{task.description}</p> : null}

                      <div className="mb-3">
                        <ProgressBar percentage={task.progressPercentage || 0} status={task.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={getCategoryTone(task.category)}>{task.category}</Badge>
                        <span className={`text-sm font-semibold ${isPast && !task.completed ? 'text-accent-rose' : 'text-ink-muted'}`}>
                          Due {dateStr}
                        </span>
                        {task.submitted ? <span className="text-xs text-accent-sage font-semibold">Submitted</span> : null}
                      </div>

                      {task.progressNotes && task.progressNotes.length > 0 ? (
                        <div className="mt-3 rounded-lg border border-line bg-paper-50 p-3">
                          <p className="text-xs font-semibold text-ink mb-1">Latest update</p>
                          <p className="text-sm text-ink-muted">
                            {task.progressNotes[task.progressNotes.length - 1].note}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedTask(task)}>
                      Update
                    </Button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn btn-secondary px-3 py-2 text-accent-rose hover:bg-[color:rgb(178_100_118_/_.10)]"
                      title="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Progress Update Modal */}
      {selectedTask && (
        <TaskProgressModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateProgress}
        />
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-paper animate-slide-up border border-line">
            <h2 className="text-2xl font-serif text-ink mb-6">Add task</h2>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-2">
                  Category
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="input"
                >
                  {TASK_CATEGORIES.filter(c => c !== 'all').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  Add task
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
