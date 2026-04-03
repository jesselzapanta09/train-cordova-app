import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const NAV_ITEMS = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    path: '/trains',
    label: 'Trains',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="4" y="3" width="16" height="13" rx="2" strokeLinecap="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16M8 16l-2 4M16 16l2 4M8 7h8M8 11V7" />
        <circle cx="8.5" cy="13.5" r="1" fill="currentColor" />
        <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" strokeLinecap="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    /* Hidden on mobile, fixed sidebar on lg+ */
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-steel-950 border-r border-steel-800 flex-col z-40">
      {/* Brand */}
      <div className="px-6 py-8 border-b border-steel-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rail-500 rail-glow flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-6 h-6">
              <rect x="4" y="3" width="16" height="13" rx="2" />
              <path strokeLinecap="round" d="M4 11h16M8 7h8" />
              <circle cx="8.5" cy="13.5" r="1" fill="white" />
              <circle cx="15.5" cy="13.5" r="1" fill="white" />
              <path strokeLinecap="round" d="M8 16l-2 4M16 16l2 4" />
            </svg>
          </div>
          <span className="font-display text-2xl tracking-widest uppercase text-gradient">TrainApp</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150
                ${isActive
                  ? 'bg-rail-500/15 text-rail-400 border border-rail-500/20'
                  : 'text-steel-400 hover:bg-steel-800 hover:text-white'
                }`}
            >
              <span className={isActive ? 'text-rail-400' : ''}>{item.icon}</span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-rail-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-steel-800">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-steel-900">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-steel-800 border border-steel-700 shrink-0">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-lg text-white uppercase">{user?.username?.[0]}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{user?.username}</p>
            <p className="text-steel-500 text-xs">Operator</p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="text-steel-500 hover:text-red-400 transition-colors p-1 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
