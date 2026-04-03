import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useImageUpload } from '../hooks/useImageUpload.js';
import { useToast } from '../components/Toast.jsx';
import BottomNav from '../components/BottomNav.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ImageUploader from '../components/ImageUploader.jsx';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const { show } = useToast();
  const { preview, base64, handleFile, reset } = useImageUpload();

  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, username: user.username }));
      reset(user.profilePicture);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Username is required.';
    else if (form.username.trim().length < 3) e.username = 'Username must be at least 3 characters.';
    if (form.password && form.password.length < 6)
      e.password = 'Password must be at least 6 characters.';
    if (form.password && form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await updateProfile({
        username: form.username,
        password: form.password || null,
        profilePicture: base64,
      });
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      show('Profile updated successfully!', 'success');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Profile" subtitle="Manage your account" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column on lg: left = avatar panel, right = form */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">

          {/* Left column — avatar + info card */}
          <div className="lg:col-span-1 mb-6 lg:mb-0">
            <div className="card p-6 flex flex-col items-center gap-4 text-center lg:sticky lg:top-8">
              <ImageUploader preview={preview} onFile={handleFile} shape="circle" />
              <div>
                <p className="font-display text-xl tracking-wider uppercase text-white">{user?.username}</p>
                <p className="text-steel-500 text-xs mt-0.5">Click avatar to change photo</p>
              </div>

              <div className="w-full border-t border-steel-800 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-steel-500">Role</span>
                  <span className="text-steel-300 font-medium">Operator</span>
                </div>
              </div>

              {/* Logout */}
              <div className="w-full border-t border-steel-800 pt-4">
                {!showLogoutConfirm ? (
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm py-2 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-steel-400 text-xs mb-2">Are you sure?</p>
                    <div className="flex gap-2">
                      <button onClick={() => setShowLogoutConfirm(false)} className="btn-secondary flex-1 py-2 text-sm">
                        Cancel
                      </button>
                      <button onClick={logout} className="btn-danger flex-1 py-2 text-sm">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-2 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="card p-4 sm:p-5 space-y-4">
                <h3 className="text-steel-300 text-xs font-semibold uppercase tracking-widest">Account Details</h3>
                <div>
                  <label className="label">Username</label>
                  <input
                    className={`input-field ${errors.username ? 'ring-2 ring-red-500' : ''}`}
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Your username"
                  />
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </div>
              </div>

              <div className="card p-4 sm:p-5 space-y-4">
                <h3 className="text-steel-300 text-xs font-semibold uppercase tracking-widest">Change Password</h3>
                <p className="text-steel-500 text-xs -mt-2">Leave blank to keep current password</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">New Password</label>
                    <input
                      className={`input-field ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="New password (optional)"
                      autoComplete="new-password"
                    />
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input
                      className={`input-field ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full lg:w-auto lg:px-10" disabled={loading}>
                {loading ? 'Saving…' : 'Save Changes'}
              </button>
            </form>

            <div className="text-center lg:text-left pb-4">
              <p className="text-steel-700 text-xs">TrainApp v1.0.0 • Built with React + Cordova</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
