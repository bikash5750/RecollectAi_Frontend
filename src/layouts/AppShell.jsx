import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckSquare, Home, LogOut, Menu, MessageCircle, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import BrandMark from '../components/BrandMark';
import Button from '../components/ui/Button';
import { cn } from '../lib/cn';

const NAV = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
];

function NavItems({ onNavigate }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="mt-6 space-y-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
              active
                ? 'bg-brand-50 text-brand-800 border border-brand-600/20'
                : 'text-ink-muted hover:text-ink hover:bg-paper-50 border border-transparent',
            )}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userLabel = useMemo(() => {
    if (!user) return null;
    return user.email || user.name || 'Account';
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-72 md:flex-col md:border-r md:border-line md:bg-white md:px-5 md:py-6">
        <BrandMark to="/home" subtitle="Your knowledge, edited" />
        <NavItems />

        <div className="mt-auto pt-6 subtle-divider" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-semibold text-ink-muted">Signed in</div>
            <div className="truncate text-sm font-semibold text-ink">{userLabel}</div>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary px-3 py-2"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur">
        <div className="mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <BrandMark to="/home" className="gap-2" />
            <button
              className="btn btn-secondary px-3 py-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/35" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white border-r border-line p-5 shadow-paper">
            <div className="flex items-center justify-between">
              <BrandMark to="/home" onClick={() => setMobileOpen(false)} />
              <button
                className="btn btn-secondary px-3 py-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <NavItems onNavigate={() => setMobileOpen(false)} />
            <div className="mt-8 subtle-divider" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-ink-muted">Signed in</div>
                <div className="truncate text-sm font-semibold text-ink">{userLabel}</div>
              </div>
              <Button variant="secondary" className="px-3 py-2" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Content */}
      <div className="md:pl-72">
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    </div>
  );
}

