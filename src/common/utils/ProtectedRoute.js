import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; 
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return children; 
};


export default ProtectedRoute;
