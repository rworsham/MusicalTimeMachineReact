import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const adminApi = axios.create({
    baseURL: 'http://localhost:8080/api/admin',
    withCredentials: true,
});

export const publicApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await adminApi.get('/auth/me'); // Assumes /auth/me returns current user
                setUser(response.data);
            } catch (err) {
                console.error('Not authenticated or session expired');
                setUser(null);
                throw err
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const loginUser = async (credentials) => {
        try {
            await adminApi.post('/auth/login', credentials);
            const response = await adminApi.get('/auth/me');
            setUser(response.data);
        } catch (err) {
            console.error('Login failed:', err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await adminApi.post('/auth/logout');
        } catch (err) {
            console.error('Logout failed:', err);
        } finally {
            setUser(null);
        }
    };

    const contextValue = {
        user,
        loading,
        loginUser,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};