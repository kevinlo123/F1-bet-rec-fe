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
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (res, token, adminData) => {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('admin', adminData);
        setIsAdmin(adminData);
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
