import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;