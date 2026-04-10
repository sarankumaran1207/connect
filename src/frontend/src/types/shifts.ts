export type ShiftJobId = bigint;
export type ShiftType = "Morning" | "Afternoon" | "Night";

export interface ShiftJob {
  id: ShiftJobId;
  jobRole: string;
  company: string;
  shiftType: ShiftType;
  shiftStart: string;
  shiftEnd: string;
  location: string;
  description: string;
  isActive: boolean;
  createdAt: bigint;
}
