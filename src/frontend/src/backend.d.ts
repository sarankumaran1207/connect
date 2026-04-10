import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Interview {
    id: InterviewId;
    jobRole: string;
    date: string;
    createdAt: Timestamp;
    time: string;
    description: string;
    isActive: boolean;
    company: string;
    location: string;
}
export type Timestamp = bigint;
export interface Application {
    id: ApplicationId;
    appliedAt: Timestamp;
    interviewId?: InterviewId;
    name: string;
    email: string;
    message: string;
    phone: string;
    skills: string;
    qualification: string;
}
export type InterviewId = bigint;
export interface ApplicationInput {
    interviewId?: InterviewId;
    name: string;
    email: string;
    message: string;
    phone: string;
    skills: string;
    qualification: string;
}
export interface NewShiftJob {
    jobRole: string;
    description: string;
    company: string;
    shiftStart: string;
    shiftEnd: string;
    shiftType: string;
    location: string;
}
export interface ShiftJob {
    id: ShiftJobId;
    jobRole: string;
    createdAt: bigint;
    description: string;
    isActive: boolean;
    company: string;
    shiftStart: string;
    shiftEnd: string;
    shiftType: string;
    location: string;
}
export type ApplicationId = bigint;
export type ShiftJobId = bigint;
export interface backendInterface {
    addShiftJob(input: NewShiftJob): Promise<ShiftJob>;
    getActiveInterviews(): Promise<Array<Interview>>;
    getAllApplications(): Promise<Array<Application>>;
    getInterview(id: InterviewId): Promise<Interview | null>;
    getShiftJobs(): Promise<Array<ShiftJob>>;
    submitApplication(input: ApplicationInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
