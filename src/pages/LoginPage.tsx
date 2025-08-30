import { useAuthStore } from '../state/authStore'; 
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const { email, setEmail, password, setPassword, login, isLoading, error } = useAuthStore();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        login();
    };
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                type="email"
                id="email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2">Password</label>
                <input
                type="password"
                id="password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded disabled:bg-gray-500"
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            </form>
            <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-400 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
        </div>
    );
};

export default LoginPage;