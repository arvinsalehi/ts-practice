import type { SessionData, SessionInteraction } from "@/types/session";
import { post } from "./server";
import type { ApiResponse } from "@/types/api";

export const setSessionInteraction = (interaction: SessionInteraction) => {
    const existingData = localStorage.getItem('interactions') || '[]';
    const interactions: SessionInteraction[] = existingData ? JSON.parse(existingData) : [];
    interactions.push(interaction);
    localStorage.setItem('interactions', JSON.stringify(interactions));
}

export const submitSessionData = async () => {
    // Submit current session data to backend
    const sessionData: SessionData = {
        loginId: localStorage.getItem('loginId') || 'unknown',
        buildNumber: parseInt(localStorage.getItem('buildNumber') || '0', 10),
        numberOfParts: parseInt(localStorage.getItem('numberOfParts') || '0', 10),
        timePerPart: parseFloat(localStorage.getItem('timePerPart') || '0'),
        startTime: parseInt(localStorage.getItem('startTime') || Date.now().toString(), 10),
        totalPausedTime: parseInt(localStorage.getItem('totalPausedTime') || '0', 10),
        defects: parseInt(localStorage.getItem('defects') || '0', 10),
        totalParts: parseInt(localStorage.getItem('totalParts') || '0', 10),
        interactions: JSON.parse(localStorage.getItem('interactions') || '[]'),
        submittedBy: (["manual", "auto", "unkown"].includes(localStorage.getItem('submittedBy') || "") 
            ? (localStorage.getItem('submittedBy') as "manual" | "auto" | "unkown") 
            : "unkown"),
        totalActiveTime: parseInt(localStorage.getItem('totalActiveTime') || '0', 10),
        totalInactiveTime: parseInt(localStorage.getItem('totalInactiveTime') || '0', 10)
    };

    post<ApiResponse>(`http://localhost:3001/api/submit-session`, sessionData)
        .then(sessionInfo => {
            console.log('Session set successful:', sessionInfo.sessionId);
        }).catch(error => {
            console.error('Failed to submit session data:', error);
        });
};