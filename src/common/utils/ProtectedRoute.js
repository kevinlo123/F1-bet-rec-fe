import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; 
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, requireAdmin }) => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);
    const router = useRouter();

    const showToast = (type, message) => {
        toast.remove(); // Clear any existing toasts
        toast[type](message);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else if (requireAdmin && !isAdmin) {
            setTimeout(() => {
                router.push('/profile');
                showToast('error', 'You must be an admin to access this page'); // Use the custom message here
            }, 100 )
        }
    }, [isAuthenticated, isAdmin, requireAdmin, router]);

    if (!isAuthenticated || (requireAdmin && !isAdmin)) {
        return null;
    }

    return children; 
};

export default ProtectedRoute;
