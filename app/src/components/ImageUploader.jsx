import { useRef } from 'react';

export default function ImageUploader({ preview, onFile, label = 'Upload Image', shape = 'rect', className = '' }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  const isCircle = shape === 'circle';

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative overflow-hidden border-2 border-dashed border-steel-600 hover:border-rail-500 transition-colors bg-steel-800 active:scale-95
          ${isCircle ? 'w-24 h-24 rounded-full' : 'w-full h-40 rounded-2xl'}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-steel-500 h-full w-full">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            {!isCircle && <span className="text-xs font-medium">{label}</span>}
          </div>
        )}
        {preview && (
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Change</span>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
