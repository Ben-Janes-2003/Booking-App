import { useEffect } from 'react';
import { useBookingStore } from '../state/bookingStore';

const MyBookingsPage = () => {
  const { bookings, isLoading, error, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-xl font-semibold">
                Booking ID: {booking.id}
              </p>
              <p className="text-gray-300 mt-2">
                {new Date(booking.timeSlot.startTime).toLocaleString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className="text-gray-400 mt-1">{booking.timeSlot.durationMinutes} minutes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;