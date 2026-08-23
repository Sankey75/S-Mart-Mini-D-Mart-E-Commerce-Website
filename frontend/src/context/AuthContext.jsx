import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        // Do not set user here, force them to login
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
