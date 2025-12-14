import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface ProtectedRouteProps {
    redirectPath?: string;
}

export default function ProtectedRoute({ redirectPath = '/login' }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />; 
    }

    return <Outlet />;
}