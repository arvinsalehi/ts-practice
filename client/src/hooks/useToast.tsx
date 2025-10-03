// @ts-ignore
import { CustomToast } from "@/components/ui/custom-toast";
import { setSessionInteraction } from "@/services/session";
import type { SessionInteraction } from "@/types/session";
import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

// Hook to manage the toast.
export const useToastHook = () => {
    const toast = useToast();
    const toastIdRef = useRef<string | number | null>(null);
    const [isToastActive, setIsToastActive] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [_popupTimestamp, setpopupTimestamp] = useState<number[] | null>(null);


    const showToast = (onYes: () => void, onNo: () => void) => {
        const TOAST_ID = 'production-completion';

        // Check if a toast is already active before creating a new one.
        if (toastIdRef.current && toast.isActive(TOAST_ID)) {
            return;
        }

        const handleYesAction = () => {
            setIsToastActive(false);
            setpopupTimestamp(prev => prev ? [...prev, Date.now()] : [Date.now()]);
            // toast.close(TOAST_ID);
            scheduleNextToast(onYes, onNo, 10 * 60 * 1000); // Schedule next toast
            // Log interaction
            const interaction: SessionInteraction = {
                type: 'popup_yes',
                timestamp: Date.now(),
            }
            setSessionInteraction(interaction);
            onYes();
        };

        const handleNoAction = () => {
            setIsToastActive(false);
            setpopupTimestamp(prev => prev ? [...prev, Date.now()] : [Date.now()]);
            
            // toast.close(TOAST_ID);
            window.location.href = '/';
            scheduleNextToast(onYes, onNo, 10 * 60 * 10); // Schedule next toast

            // Log interaction
            const interaction: SessionInteraction = {
                type: 'popup_no',
                timestamp: Date.now(),
            }

            onNo();
            setSessionInteraction(interaction);

        };

        toastIdRef.current = toast({
            id: TOAST_ID,
            duration: null,
            isClosable: false,
            position: "top",
            render: () => (
                <CustomToast
                    onClose={() => toast.close(TOAST_ID)}
                    onYes={handleYesAction}
                    onNo={handleNoAction}
                    onAutoSubmit={handleAutoSubmit}
                />
            ),
        });

        // Log interaction
        const interaction: SessionInteraction = {
            type: 'popup_shown',
            timestamp: Date.now(),
        }
        setSessionInteraction(interaction);
    };

    const handleAutoSubmit = () => {
        if (isToastActive) {
            if (toastIdRef.current !== null) {
                toast.close(toastIdRef.current);
            }
            setIsToastActive(false);
        }
        localStorage.setItem('submittedBy', 'auto');
    };

    const scheduleNextToast = (onYes: () => void, onNo: () => void, eventTime: number) => {
        // Clear any existing timeouts to prevent a double-trigger
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            showToast(onYes, onNo);
        }, eventTime);
    };

    const closeToast = () => {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current);
            setIsToastActive(false);
        }
    };

    return {
        showToast,
        closeToast,
        isToastActive,
        scheduleNextToast
    };
};
