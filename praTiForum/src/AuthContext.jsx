import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);