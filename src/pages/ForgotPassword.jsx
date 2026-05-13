import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import BrandMark from '../components/BrandMark';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSent(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-paper px-4">
        <div className="mx-auto max-w-md py-10">
          <div className="mb-8">
            <BrandMark to="/" subtitle="Scholarly voice notes" />
          </div>

          <Card className="p-8 text-center">
            <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-line bg-paper-50">
              <Mail className="text-accent-sage" size={20} />
            </div>
            <h2 className="text-2xl font-serif text-ink">Check your email</h2>
            <p className="mt-2 text-ink-muted leading-relaxed">
              If an account exists for <span className="font-semibold text-ink">{email}</span>, we’ll send reset instructions.
            </p>
            <Link to="/login" className="mt-6 inline-flex">
              <Button variant="secondary">
                <ArrowLeft size={18} />
                Back to sign in
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper px-4">
      <div className="mx-auto max-w-md py-10">
        <div className="mb-8">
          <BrandMark to="/" subtitle="Scholarly voice notes" />
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-serif text-ink">Reset password</h1>
          <p className="mt-2 text-ink-muted">Enter your email and we’ll send instructions if your account exists.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending…' : 'Send reset link'}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="text-sm font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
            <Link to="/" className="text-sm font-semibold text-ink-muted hover:text-ink">
              Back home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
