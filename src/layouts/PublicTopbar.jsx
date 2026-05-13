import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import Button from '../components/ui/Button';

export default function PublicTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <BrandMark to="/" subtitle="Scholarly voice notes" />
          <nav className="flex items-center gap-2">
            <Link to="/login" className="btn btn-secondary">
              Sign in
            </Link>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

