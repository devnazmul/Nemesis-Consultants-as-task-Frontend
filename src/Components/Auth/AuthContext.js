import { isJwtExpired } from 'jwt-check-expiration';
import React, { useContext, useEffect } from 'react';
import swal from 'sweetalert';

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [token, setToken] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const logout = () => {
        swal({
            title: "Are you sure for LogOut?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setIsAuthenticated(false);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            });
    };
    const tokenn = localStorage.getItem('token');
    useEffect(() => {
        if (tokenn) {
            if (isJwtExpired(tokenn)) {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
                console.log('isExpired is:', isJwtExpired(tokenn));
            }
        }
        setIsLoading(false)
    }, [tokenn]);

    useEffect(() => {
        const tokenn = localStorage.getItem('token');
        if (tokenn) {
            setIsAuthenticated(true);
            setToken(tokenn);
        }
        setIsLoading(false)
    }, []);



    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, setIsAuthenticated, setToken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
