import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ShiftJobId = bigint;
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
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export type UserId = Principal;
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
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
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
export type ApplicationId = bigint;
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
export interface UserProfileInput {
    fullName: string;
    email: string;
}
export interface UserProfile {
    id: UserId;
    createdAt: Timestamp;
    fullName: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addShiftJob(input: NewShiftJob): Promise<ShiftJob>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getActiveInterviews(): Promise<Array<Interview>>;
    getAllApplications(): Promise<Array<Application>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInterview(id: InterviewId): Promise<Interview | null>;
    getShiftJobs(): Promise<Array<ShiftJob>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfileInput): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitApplication(input: ApplicationInput): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
