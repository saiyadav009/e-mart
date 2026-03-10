import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    // Check localStorage first, or default to 'blue' (default)
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('emart-theme')
        return (storedTheme === 'red') ? 'blue' : (storedTheme || 'blue')
    })

    useEffect(() => {
        localStorage.setItem('emart-theme', theme)
        // Apply to body attribute to allow CSS selectors to catch it globally
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === 'blue') return 'green'
            return 'blue'
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
