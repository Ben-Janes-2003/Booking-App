import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

const RegisterPage = () => {
    const { name, setName, email, setEmail, password, setPassword, register, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await register();
        if (success) {
            navigate('/login');
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name</label>
                <input 
                type="text" 
                id="name" 
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
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
                className="w-full bg-green-600 hover:bg-green-700 p-2 rounded disabled:bg-gray-500"
                disabled={isLoading}
            >
                {isLoading ? 'Registering...' : 'Register'}
            </button>
            </form>
        </div>
        </div>
    );
};

export default RegisterPage;