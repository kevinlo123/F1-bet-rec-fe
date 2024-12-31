import React, { createContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const abortControllerRef = useRef(new AbortController()); // Abort controller for API calls

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const admin = localStorage.getItem('admin');

        setIsAuthenticated(!!token); // Ensure boolean value
        setIsAdmin(admin === 'true'); // Rehydrate and convert to boolean
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    const showToast = (type, message) => {
        toast.remove(); // Clear any existing toasts
        toast[type](message);
    };

    const logout = (message = 'Logged out successfully', type = 'success') => {
        try {
            // Clear storage and abort ongoing requests
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('admin');
            setIsAuthenticated(false);
            setIsAdmin(false); // Reset admin state

            // Show dynamic toast message
            showToast(type, message);

            setTimeout(() => router.push('/login'), 1000);
        } catch (error) {
            console.error('Logout error:', error);
            showToast('error', 'Failed to log out. Please try again.');
        }
    };

    const login = (res, token, adminData, id, message = 'Successfully logged in!') => {
        try {
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userId', id);
    
            if (adminData !== null) {
                localStorage.setItem('admin', adminData);
                setIsAdmin(adminData); // Explicitly update state here
            } else {
                setIsAdmin(false); // Ensure state consistency
            }
    
            setIsAuthenticated(true);
            showToast('success', message); // Use the custom message here
            setTimeout(() => router.push('/'), 1000);
        } catch (error) {
            console.error('Login error:', error);
            showToast('error', 'Failed to log in. Please try again.');
        }
    };

    const getUserData = async (token, userId) => {
        if (!userId) {
            console.error('User ID not available');
            logout('Session expired. Please log in again.', 'error');
            return;
        }

        try {
            const local = 'http://localhost:3000/'
            const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com'
            const apiUrl = window.location.hostname === 'localhost' ? local : prod;

            const response = await fetch(`${apiUrl}/api/v1/users/${userId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
                signal: abortControllerRef.current.signal, // Attach abort signal
            });

            if (response.ok) {
                const userData = await response.json();
                return userData;
            } else if (response.status === 401) {
                console.error('Unauthorized access. Logging out...');
                logout('Session expired. Please log in again.', 'error');
            } else if (response.status === 403) {
                console.error('Forbidden access. Logging out...');
                logout('You do not have access to this page.', 'error');
            } else {
                console.error('Failed to fetch user data. Logging out...');
                logout('Session expired. Please log in again.', 'error');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn('Request aborted due to logout.');
            } else {
                console.error('Error fetching user data:', error);
                logout('Session expired. Please log in again.', 'error');
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
