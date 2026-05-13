import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Search, MessageCircle, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RecollectAI</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/home"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                isActive('/home') 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/tasks"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                isActive('/tasks') 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <CheckSquare size={20} />
              <span className="hidden sm:inline">Tasks</span>
            </Link>

            <Link
              to="/search"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                isActive('/search') 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </Link>

            <Link
              to="/chat"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                isActive('/chat') 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <MessageCircle size={20} />
              <span className="hidden sm:inline">Chat</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all ml-2"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

