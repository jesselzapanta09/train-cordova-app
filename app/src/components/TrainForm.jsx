import { useState, useEffect } from 'react';
import { useImageUpload } from '../hooks/useImageUpload.js';
import ImageUploader from './ImageUploader.jsx';

const EMPTY = { train_name: '', price: '', route: '' };

export default function TrainForm({ initial = null, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ? {
    train_name: initial.train_name,
    price: String(initial.price),
    route: initial.route,
  } : EMPTY);

  const [errors, setErrors] = useState({});
  const { preview, base64, handleFile, reset } = useImageUpload();

  useEffect(() => {
    reset(initial?.image || null);
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.train_name.trim()) e.train_name = 'Train name is required.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = 'Enter a valid price.';
    if (!form.route.trim()) e.route = 'Route is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...(initial ? { id: initial.id, createdAt: initial.createdAt } : {}),
      train_name: form.train_name.trim(),
      price: Number(form.price),
      route: form.route.trim(),
      image: base64 || initial?.image || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUploader
        preview={preview}
        onFile={handleFile}
        label="Upload Train Image"
      />

      <div>
        <label className="label">Train Name</label>
        <input
          className={`input-field ${errors.train_name ? 'ring-2 ring-red-500' : ''}`}
          name="train_name"
          placeholder="e.g. Pacific Express"
          value={form.train_name}
          onChange={handleChange}
        />
        {errors.train_name && <p className="text-red-400 text-xs mt-1">{errors.train_name}</p>}
      </div>

      <div>
        <label className="label">Ticket Price (PHP)</label>
        <input
          className={`input-field ${errors.price ? 'ring-2 ring-red-500' : ''}`}
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 250.00"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
      </div>

      <div>
        <label className="label">Route</label>
        <input
          className={`input-field ${errors.route ? 'ring-2 ring-red-500' : ''}`}
          name="route"
          placeholder="e.g. Manila → Cebu"
          value={form.route}
          onChange={handleChange}
        />
        {errors.route && <p className="text-red-400 text-xs mt-1">{errors.route}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1" disabled={loading}>
          {loading ? 'Saving…' : initial ? 'Update Train' : 'Add Train'}
        </button>
      </div>
    </form>
  );
}
