import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const NAV_ITEMS = [
  {
    path: '/dashboard',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5v-6h4v6h5a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    path: '/trains',
    label: 'Trains',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="8" r="4" strokeLinecap="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-steel-950/95 backdrop-blur-md border-t border-steel-800 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-item flex-1 py-2 rounded-xl ${isActive ? 'active' : ''}`}
            >
              {item.path === '/profile' && user?.profilePicture ? (
                <div className={`w-6 h-6 rounded-full overflow-hidden border-2 ${isActive ? 'border-rail-400' : 'border-steel-600'}`}>
                  <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                item.icon
              )}
              <span className="text-[10px] font-semibold tracking-wider uppercase">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
