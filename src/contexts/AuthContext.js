import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (res, token) => {
        localStorage.setItem('jwtToken', token);
        setIsAuthenticated(true);
        router.push('/'); 
        setTimeout(() => {
            toast.success(`${res.message}`);
        }, 1000);
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        router.push('/login'); 
        setTimeout(() => {
            toast.success('Logged out successfully');
        }, 1000);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
