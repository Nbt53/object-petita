import  { createContext, useState, useEffect } from 'react';

// Create Context object.
export const MediaContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const MediaQueryProvider = ({ children }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth > 1200);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <MediaContext.Provider value={isDesktop}>
            {children}
        </MediaContext.Provider>
    );
};

