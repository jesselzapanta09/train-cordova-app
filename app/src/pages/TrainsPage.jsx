import { useState } from 'react';
import { useTrains } from '../hooks/useTrains.js';
import { useToast } from '../components/Toast.jsx';
import BottomNav from '../components/BottomNav.jsx';
import PageHeader from '../components/PageHeader.jsx';
import TrainCard from '../components/TrainCard.jsx';
import TrainForm from '../components/TrainForm.jsx';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Spinner from '../components/Spinner.jsx';

export default function TrainsPage() {
  const { trains, loading, createTrain, editTrain, removeTrain } = useTrains();
  const { show } = useToast();

  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = trains.filter(
    (t) =>
      t.train_name.toLowerCase().includes(search.toLowerCase()) ||
      t.route.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await createTrain(data);
      setShowCreate(false);
      show('Train added successfully!', 'success');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (data) => {
    setFormLoading(true);
    try {
      await editTrain(data);
      setEditTarget(null);
      show('Train updated!', 'success');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setFormLoading(true);
    try {
      await removeTrain(deleteTarget.id);
      setDeleteTarget(null);
      show('Train deleted.', 'success');
    } catch (err) {
      show(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Trains"
        subtitle={`${trains.length} train${trains.length !== 1 ? 's' : ''} in fleet`}
        action={
          <button
            onClick={() => setShowCreate(true)}
            className="w-10 h-10 bg-rail-500 rounded-xl flex items-center justify-center rail-glow active:scale-90 transition-transform hover:bg-rail-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-steel-500">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="input-field pl-10"
              placeholder="Search trains or routes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-20 h-20 rounded-3xl bg-steel-900 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10 text-steel-700">
                <rect x="4" y="3" width="16" height="13" rx="2" />
                <path strokeLinecap="round" d="M4 11h16M8 7h8" />
                <circle cx="8.5" cy="13.5" r="1" fill="currentColor" />
                <circle cx="15.5" cy="13.5" r="1" fill="currentColor" />
                <path strokeLinecap="round" d="M8 16l-2 4M16 16l2 4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">
                {search ? 'No trains found' : 'No trains yet'}
              </p>
              <p className="text-steel-500 text-sm mt-1">
                {search ? 'Try a different search term' : 'Click + to add your first train'}
              </p>
            </div>
            {!search && (
              <button onClick={() => setShowCreate(true)} className="btn-primary">
                Add First Train
              </button>
            )}
          </div>
        ) : (
          /* 1 col mobile → 2 col sm → 3 col lg → 4 col xl */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Add New Train">
        <TrainForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Train">
        {editTarget && (
          <TrainForm
            initial={editTarget}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
            loading={formLoading}
          />
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Train"
        message={`Are you sure you want to delete "${deleteTarget?.train_name}"? This action cannot be undone.`}
        loading={formLoading}
      />

      <BottomNav />
    </div>
  );
}
