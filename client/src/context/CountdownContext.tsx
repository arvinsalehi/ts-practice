import { useCountdown } from '@/hooks/useCountdown';
import { createContext, useContext, type ReactNode } from 'react';

type CountdownContextType = ReturnType<typeof useCountdown>;

const CountdownContext = createContext<CountdownContextType | undefined>(undefined);

// The provider
export const CountdownProvider = ({ children }: { children: ReactNode }) => {
    const countdown = useCountdown();
    return (
        <CountdownContext.Provider value={countdown}>
            {children}
        </CountdownContext.Provider>
    );
};

// A custom hook
export const useSharedCountdown = () => {
    const context = useContext(CountdownContext);
    if (context === undefined) {
        throw new Error('useSharedCountdown must be used within a CountdownProvider');
    }
    return context;
};