import { useState, useEffect, useCallback } from 'react';
import { getTrains, addTrain, updateTrain, deleteTrain } from '../services/db.js';

export function useTrains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrains = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTrains();
      setTrains(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  const createTrain = useCallback(async (trainData) => {
    const payload = { ...trainData, createdAt: Date.now() };
    const id = await addTrain(payload);
    const newTrain = { ...payload, id };
    setTrains((prev) => [newTrain, ...prev]);
    return newTrain;
  }, []);

  const editTrain = useCallback(async (trainData) => {
    await updateTrain(trainData);
    setTrains((prev) =>
      prev.map((t) => (t.id === trainData.id ? { ...t, ...trainData } : t))
    );
  }, []);

  const removeTrain = useCallback(async (id) => {
    await deleteTrain(id);
    setTrains((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { trains, loading, error, createTrain, editTrain, removeTrain, refetch: fetchTrains };
}
