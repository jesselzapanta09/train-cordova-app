import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTrains } from '../hooks/useTrains.js';
import BottomNav from '../components/BottomNav.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Spinner from '../components/Spinner.jsx';

function StatCard({ label, value, icon, accent }) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-steel-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-white text-2xl font-bold font-mono truncate">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { trains, loading } = useTrains();
  const navigate = useNavigate();

  const totalValue = trains.reduce((sum, t) => sum + (t.price || 0), 0);
  const formatCurrency = (v) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(v);

  const uniqueRoutes = new Set(trains.map((t) => t.route)).size;
  const recentTrains = trains.slice(0, 6);

  return (
    <div className="page-container">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.username}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* User greeting card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rail-800 to-rail-950 border border-rail-700/50 p-5 lg:p-6">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 120" className="w-48 h-28">
              <line x1="0" y1="30" x2="200" y2="60" stroke="white" strokeWidth="2" />
              <line x1="0" y1="55" x2="200" y2="85" stroke="white" strokeWidth="2" />
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={i} x1={i * 22} y1="25" x2={i * 22 + 8} y2="90" stroke="white" strokeWidth="1.5" />
              ))}
            </svg>
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden bg-rail-700 border-2 border-rail-500 shrink-0">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-2xl text-white uppercase">{user?.username?.[0]}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-rail-300 text-xs font-semibold uppercase tracking-wider">Operator</p>
              <h2 className="font-display text-2xl lg:text-3xl text-white tracking-wider uppercase">{user?.username}</h2>
            </div>
          </div>
        </div>

        {/* Stats — 1 col mobile, 3 col lg */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              label="Total Trains"
              value={trains.length}
              accent="bg-rail-900 text-rail-400"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                  <rect x="4" y="3" width="16" height="13" rx="2" />
                  <path strokeLinecap="round" d="M4 11h16M8 7h8" />
                  <circle cx="8.5" cy="13.5" r="1" fill="currentColor" />
                  <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
                </svg>
              }
            />
            <StatCard
              label="Active Routes"
              value={uniqueRoutes}
              accent="bg-green-950 text-green-400"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <StatCard
              label="Fleet Value"
              value={formatCurrency(totalValue)}
              accent="bg-amber-500/10 text-amber-400"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        )}

        {/* Recent Trains */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg tracking-widest uppercase text-steel-300">Recent Trains</h2>
            {trains.length > 0 && (
              <button onClick={() => navigate('/trains')} className="text-rail-400 text-sm font-semibold hover:text-rail-300 transition-colors">
                View All
              </button>
            )}
          </div>

          {trains.length === 0 && !loading ? (
            <div className="card p-8 flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-steel-800 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-steel-600">
                  <rect x="4" y="3" width="16" height="13" rx="2" />
                  <path strokeLinecap="round" d="M4 11h16" />
                  <circle cx="8.5" cy="13.5" r="1" fill="currentColor" />
                  <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
                  <path strokeLinecap="round" d="M8 16l-2 4M16 16l2 4" />
                </svg>
              </div>
              <p className="text-steel-500 text-sm">No trains yet. Add your first one!</p>
              <button onClick={() => navigate('/trains')} className="btn-primary px-6 py-2 text-sm mt-1">
                Add Train
              </button>
            </div>
          ) : (
            /* 1 col mobile, 2 col md, 3 col lg */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentTrains.map((train) => (
                <div key={train.id} className="card flex items-center gap-3 p-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-steel-800 shrink-0">
                    {train.image ? (
                      <img src={train.image} alt={train.train_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-steel-600">
                          <rect x="4" y="3" width="16" height="13" rx="2" />
                          <path strokeLinecap="round" d="M4 11h16" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{train.train_name}</p>
                    <p className="text-steel-500 text-xs truncate">{train.route}</p>
                  </div>
                  <span className="text-rail-400 text-sm font-bold font-mono shrink-0">
                    ₱{Number(train.price).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
