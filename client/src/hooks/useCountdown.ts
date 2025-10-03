import { useState, useEffect, useCallback, useRef } from 'react';

const END_TIME_KEY = 'endTime';
const PAUSED_TIME_KEY = 'pausedTime';
const DURATION_KEY = 'totalDuration';
// const RESUME_TIMESTAMP = 'resumeTimestamp';
// const PAUSE_TIMESTAMP = 'pauseTimestamp';

export const useCountdown = () => {
    // Initialize state by reading directly from localStorage.
    // This function only runs on the initial render.

    const [timeRemaining, setTimeRemaining] = useState(() => {
        const endTime = localStorage.getItem(END_TIME_KEY);
        if (!endTime) return 0;
        return Math.max(0, parseInt(endTime, 10) - Date.now());
    });

    const [isPaused, setIsPaused] = useState(() => !!localStorage.getItem(PAUSED_TIME_KEY));
    const [isActive, setIsActive] = useState(() => !!localStorage.getItem(END_TIME_KEY));
    const [_pauseTimestamp, setPauseTimestamp] = useState<number[] | null>(null);
    const [_resumeTimestamp, setResumeTimestamp] = useState<number[] | null>(null);

    const onCompleteCallback = useRef<(() => void) | null>(null);

    const [totalDuration, setTotalDuration] = useState(() => {
        const duration = localStorage.getItem(DURATION_KEY);
        return duration ? parseInt(duration, 10) : 0;
    });

    const start = useCallback((duration: number) => {
        const endTime = Date.now() + duration;
        localStorage.setItem(END_TIME_KEY, endTime.toString());
        localStorage.removeItem(PAUSED_TIME_KEY);
        localStorage.setItem(DURATION_KEY, duration.toString());
        setTimeRemaining(duration);
        setIsActive(true);
        setIsPaused(false);
        setTotalDuration(duration);
    }, []);

    const pause = useCallback(() => {
        if (!isActive || isPaused) return;
        setPauseTimestamp(prev => prev ? [...prev, Date.now()] : [Date.now()]);

        // Store the remaining time when paused
        localStorage.setItem(PAUSED_TIME_KEY, timeRemaining.toString());
        setIsPaused(true);
    }, [isActive, isPaused, timeRemaining]);

    const resume = useCallback(() => {
        if (!isActive || !isPaused) return;
        setResumeTimestamp(prev => prev ? [...prev, Date.now()] : [Date.now()]);

        const pausedTime = localStorage.getItem(PAUSED_TIME_KEY);
        if (pausedTime) {
            // Calculate a new endTime based on the time remaining when paused
            const newEndTime = Date.now() + parseInt(pausedTime, 10);
            localStorage.setItem(END_TIME_KEY, newEndTime.toString());
            localStorage.removeItem(PAUSED_TIME_KEY);
            setIsPaused(false);
        }
    }, [isActive, isPaused]);

    // Stop, reset and clear everything
    const stop = useCallback(() => {
        localStorage.removeItem(END_TIME_KEY);
        localStorage.removeItem(PAUSED_TIME_KEY);
        localStorage.removeItem(DURATION_KEY);
        setTimeRemaining(0);
        setIsActive(false);
        setIsPaused(false);
        setTotalDuration(0);
        onCompleteCallback.current = null;
    }, []);

    useEffect(() => {
        if (!isActive || isPaused) {
            return;
        }

        const interval = setInterval(() => {
            const endTime = parseInt(localStorage.getItem(END_TIME_KEY) || '0', 10);
            const remaining = Math.max(0, endTime - Date.now());

            setTimeRemaining(remaining);

            if (remaining === 0) {
                if (onCompleteCallback.current) onCompleteCallback.current();
                stop();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, isPaused, stop]);

    return { timeRemaining, isActive, isPaused, start, pause, resume, stop, totalDuration, onCompleteCallback };
};