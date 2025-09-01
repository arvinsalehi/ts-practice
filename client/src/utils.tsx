// utils/index.ts
export interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isNegative: boolean;
}

export const msToMinutes = (ms: number) => ms / 60000;

export const getTime = () => new Date().getTime();

export const calculateTimeUnits = (time: number) => {
  const isNegative = time < 0;
  const absTime = Math.abs(time);

  const seconds = Math.floor((absTime / 1000) % 60);
  const minutes = Math.floor((absTime / (1000 * 60)) % 60);
  const hours = Math.floor((absTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(absTime / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isNegative };
};

export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

