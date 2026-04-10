export type InterviewId = bigint;
export type Timestamp = bigint;

export interface Interview {
  id: InterviewId;
  jobRole: string;
  company: string;
  date: string;
  time: string;
  location: string;
  description: string;
  isActive: boolean;
  createdAt: Timestamp;
}

export interface ApplicationInput {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  skills: string;
  message: string;
  interviewId?: InterviewId;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}
