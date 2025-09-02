export interface SessionData {
  loginId: string;
  buildNumber: number;
  numberOfParts: number;
  timePerPart: number;
  startTime: number;
  totalPausedTime: number;
  defects: number;
  totalParts: number;
  interactions: SessionInteraction[];
  submittedBy: 'manual' | 'auto' | 'unkown';
  totalActiveTime: number; // milliseconds of active work time
  totalInactiveTime: number; // milliseconds of inactive time
}

export interface SessionInteraction {
  type: 'pause' | 'resume' | 'popup_shown' | 'popup_yes' | 'popup_no' | 'defect_update';
  timestamp: number;
  metadata?: Record<string, any>;
}

