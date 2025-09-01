import type { SessionInteraction } from "@/types/session";

export const setSessionInteraction = (interaction: SessionInteraction) => {
    const existingData = localStorage.getItem('interactions') || '[]';
    const interactions: SessionInteraction[] = existingData ? JSON.parse(existingData) : [];
    interactions.push(interaction);
    localStorage.setItem('interactions', JSON.stringify(interactions));
}