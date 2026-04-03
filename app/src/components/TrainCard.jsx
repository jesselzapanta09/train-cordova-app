export default function TrainCard({ train, onEdit, onDelete }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(price);

  return (
    <div className="card animate-fade-in group">
      <div className="relative h-44 bg-steel-800 overflow-hidden">
        {train.image ? (
          <img
            src={train.image}
            alt={train.train_name}
            className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-steel-700">
              <rect x="4" y="3" width="16" height="13" rx="2" />
              <path strokeLinecap="round" d="M4 11h16M8 7h8" />
              <circle cx="8.5" cy="13.5" r="1" fill="currentColor" />
              <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
              <path strokeLinecap="round" d="M8 16l-2 4M16 16l2 4" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-rail-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
            {formatPrice(train.price)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-xl tracking-wider text-white mb-1 uppercase">{train.train_name}</h3>
        <div className="flex items-center gap-1.5 text-steel-400 text-sm mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{train.route}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(train)}
            className="flex-1 flex items-center justify-center gap-2 bg-steel-800 hover:bg-steel-700 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(train)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-900/30 hover:bg-red-900/50 active:scale-95 text-red-400 text-sm font-semibold py-2.5 rounded-xl transition-all border border-red-900/40"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
