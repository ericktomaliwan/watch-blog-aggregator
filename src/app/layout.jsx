import { Outlet } from 'react-router-dom';
import '../styles/app.scss';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Outlet />
    </div>
  );
}
