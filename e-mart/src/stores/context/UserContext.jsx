import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    // Read initial state from localStorage
    const savedUser = localStorage.getItem('e-mart-user');
    const initialState = savedUser ? JSON.parse(savedUser) : { name: '', isLogin: false, isAdmin: false };
    const [user, setUser] = useState(initialState)

    const login = (name, isAdmin = false) => {
        const newUser = { name: name, isLogin: true, isAdmin };
        setUser(newUser)
        localStorage.setItem('e-mart-user', JSON.stringify(newUser));
    }

    const logout = () => {
        const loggedOutUser = { name: '', isLogin: false, isAdmin: false };
        setUser(loggedOutUser)
        localStorage.removeItem('e-mart-user');
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}
