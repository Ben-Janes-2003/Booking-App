import { useState } from 'react';
import { useSlotStore } from '../state/slotStore';
import { useNavigate } from 'react-router-dom';

const CreateSlotPage = () => {
  const { createSlot, isLoading, error } = useSlotStore();
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(60);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localDate = new Date(startTime);
  
    const utcStartTime = localDate.toISOString();

    const success = await createSlot({ 
        startTime: utcStartTime, 
        durationMinutes: duration 
    });
  
    if (success) {
        alert('Slot created successfully!');
        navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Slot</h1>
      <form onSubmit={handleSubmit} className="max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="startTime" className="block mb-2">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="duration" className="block mb-2">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded disabled:bg-gray-500"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Slot'}
        </button>
      </form>
    </div>
  );
};

export default CreateSlotPage;