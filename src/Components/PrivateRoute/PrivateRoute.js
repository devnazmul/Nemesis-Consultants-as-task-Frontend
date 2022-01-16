import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import UserForm from '../UserForm/UserForm';

export default function PrivateOutlet() {
    const { isAuthenticated, isLoading } = useAuth();
    return <>
        {
            (isLoading ? <div>Loading...</div> : (isAuthenticated ? <UserForm></UserForm> : <Navigate to='/login' />))

        }
    </>;
}
