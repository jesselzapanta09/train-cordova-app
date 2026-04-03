import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useImageUpload } from '../hooks/useImageUpload.js';
import { useToast } from '../components/Toast.jsx';
import ImageUploader from '../components/ImageUploader.jsx';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();
  const { preview, base64, handleFile } = useImageUpload();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    else if (form.username.trim().length < 3) e.username = 'Username must be at least 3 characters.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (mode === 'register' && form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ username: form.username, password: form.password });
        show('Welcome back!', 'success');
      } else {
        await register({ username: form.username, password: form.password, profilePicture: base64 });
        show('Account created! Welcome aboard.', 'success');
      }
      navigate('/dashboard');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'));
    setForm({ username: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-steel-950 flex flex-col lg:flex-row">

      {/* Left panel — hero / branding (full width mobile, half on lg) */}
      <div className="relative flex-shrink-0 h-56 lg:h-auto lg:w-1/2 xl:w-5/12 overflow-hidden bg-steel-900">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="60" x2="400" y2="100" stroke="#4a77ff" strokeWidth="2" />
          <line x1="0" y1="90" x2="400" y2="130" stroke="#4a77ff" strokeWidth="2" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 22} y1="55" x2={i * 22 + 8} y2="135" stroke="#4a77ff" strokeWidth="1.5" />
          ))}
          <line x1="0" y1="140" x2="400" y2="175" stroke="#85a8ff" strokeWidth="1.5" />
          <line x1="0" y1="165" x2="400" y2="200" stroke="#85a8ff" strokeWidth="1.5" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 22} y1="135" x2={i * 22 + 8} y2="205" stroke="#85a8ff" strokeWidth="1" />
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-rail-900/60 to-steel-950" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 lg:gap-4">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-rail-500 rail-glow flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-9 h-9 lg:w-11 lg:h-11">
              <rect x="4" y="3" width="16" height="13" rx="2" />
              <path strokeLinecap="round" d="M4 11h16M8 7h8" />
              <circle cx="8.5" cy="13.5" r="1" fill="white" />
              <circle cx="15.5" cy="13.5" r="1" fill="white" />
              <path strokeLinecap="round" d="M8 16l-2 4M16 16l2 4" />
            </svg>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-widest text-white uppercase">TrainApp</h1>
          <p className="text-steel-400 text-sm lg:text-base">Manage your fleet with ease</p>

          {/* Extra desktop-only tagline */}
          <p className="hidden lg:block text-steel-600 text-xs text-center max-w-xs mt-4 leading-relaxed">
            Full offline train management — add, update, and track your fleet from anywhere.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 lg:py-12">
        <div className="w-full max-w-md">
          <div className="flex bg-steel-900 rounded-2xl p-1 mb-8">
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrors({}); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all
                  ${mode === m ? 'bg-rail-500 text-white shadow-lg' : 'text-steel-400 hover:text-white'}`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in" key={mode}>
            {mode === 'register' && (
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-2">
                  <ImageUploader preview={preview} onFile={handleFile} shape="circle" label="Photo" />
                  <span className="text-steel-500 text-xs">Profile photo (optional)</span>
                </div>
              </div>
            )}

            <div>
              <label className="label">Username</label>
              <input
                className={`input-field ${errors.username ? 'ring-2 ring-red-500' : ''}`}
                name="username"
                autoComplete="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <input
                className={`input-field ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {mode === 'register' && (
              <div>
                <label className="label">Confirm Password</label>
                <input
                  className={`input-field ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
              {loading
                ? mode === 'login' ? 'Signing in…' : 'Creating account…'
                : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-steel-500 text-sm mt-6">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={switchMode} className="text-rail-400 font-semibold hover:text-rail-300 transition-colors">
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
