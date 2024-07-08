import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
    }, []);

    const login = (res, token, adminData, id) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', id); 
        if (adminData !== null) {
            localStorage.setItem('admin', adminData);
            setIsAdmin(adminData);
        }
        setIsAuthenticated(true);
        toast.success(`${res.message}`);
        setTimeout(() => {
            router.push('/');
        }, 1000);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('admin');
        setIsAuthenticated(false);
        setIsAdmin(false);
        toast.success('Logged out successfully');
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    };

    const getUserData = async (token, userId) => {
        if (!userId) {
            console.error('User ID not available');
            return;
        }

        try {
            const response = await fetch(`https://limitless-escarpment-05345-1ca012576c29.herokuapp.com/api/v1/users/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                return userData;
                // Handle userData as needed (e.g., set state, display information)
            } else {
                console.error('Failed to fetch user data');
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to fetch user data');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
