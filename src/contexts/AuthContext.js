import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AuthContext = createContext();

let isToastVisible = false;

const showToast = (type, message) => {
    if (isToastVisible) return; 

    isToastVisible = true;
    toast[type](message, {
        onClose: () => (isToastVisible = false)
    });
};

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const admin = localStorage.getItem('admin');
        if (token) {
            setIsAuthenticated(true);
        }
        if (admin) {
            setIsAdmin(admin);
        }
        setLoading(false); 
    }, []);

    if (loading) {
        return null; 
    }

    const login = (res, token, adminData, id) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id);
        if (adminData !== null) {
            localStorage.setItem('admin', adminData);
        }
        setIsAuthenticated(true);
        showToast('success', 'Successfully logged in!');
        setTimeout(() => {
            router.push('/');
        }, 1000);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('admin');
        setIsAuthenticated(false);
        showToast('success', 'Logged out successfully');
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    };

    const getUserData = async (token, userId) => {
        if (!userId) {
            console.error('User ID not available');
            logout(); 
            return;
        }
    
        try {
            const local = 'http://localhost:3000';
            const prod = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/';
            const apiUrl = window.location.hostname === 'localhost' ? local : prod;

            const response = await fetch(`${apiUrl}/api/v1/users/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const userData = await response.json();
                return userData;
            } else {
                console.error('Failed to fetch user data. Logging out...');
                showToast('error', 'Session expired. Please log in again.');
                logout(); 
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            showToast('error', 'Session expired. Please log in again.');
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
