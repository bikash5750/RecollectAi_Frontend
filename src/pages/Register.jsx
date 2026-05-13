import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import BrandMark from '../components/BrandMark';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(formData.email, formData.password);
      const { token, ...userData } = response.data;
      
      login(userData, token);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper px-4">
      <div className="mx-auto max-w-md py-10">
        <div className="mb-8">
          <BrandMark to="/" subtitle="Scholarly voice notes" />
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-serif text-ink">Create account</h1>
          <p className="mt-2 text-ink-muted">Begin a calmer, more organized study workflow.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-ink-muted">At least 6 characters.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" size={18} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/login" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
                Already have an account?
              </Link>
              <Link to="/" className="text-sm font-semibold text-ink-muted hover:text-ink">
                Back home
              </Link>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <UserPlus size={18} />
              {loading ? 'Creating…' : 'Create account'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
