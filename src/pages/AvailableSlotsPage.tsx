import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSlotStore } from '../state/slotStore';
import { useAuthStore } from '../state/authStore';
import { useBookingStore } from '../state/bookingStore';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const AvailableSlotsPage = () => {
  const { slots, isLoading, error, fetchSlots } = useSlotStore();
  const { token } = useAuthStore();
  const { createBooking } = useBookingStore();
  const navigate = useNavigate();

  const handleBook = async (slotId: number) => {
    if (!token) {
      navigate('/login');
      return;
    }

    const success = await createBooking(slotId);
    if (success) {
      toast.success('Booking successful!');
      fetchSlots();
    } else {
      toast.error(error || 'Booking failed.');
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Available Slots</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map((slot) => (
          <div key={slot.id} className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold">
                {new Date(slot.startTime).toLocaleString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-400 mt-2">{slot.durationMinutes} minutes</p>
            </div>
            <button
              onClick={() => handleBook(slot.id)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlotsPage;