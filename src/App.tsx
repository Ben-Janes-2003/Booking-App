import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from './state/authStore';

function App() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white">BookingApp</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Available Slots</Link>
            {token ? (
              <>
                <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
                {user?.role === 'Admin' && (
                  <Link to="/admin/create-slot" className="text-indigo-400 hover:text-indigo-300">
                    Create Slot
                  </Link>
                )}
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Login</Link>
            )}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;