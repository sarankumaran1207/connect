import { useQuery } from "@tanstack/react-query";
import type { Interview } from "../types";

// Static sample data — backend is not yet wired for interviews
const SAMPLE_INTERVIEWS: Interview[] = [
  {
    id: BigInt(1),
    jobRole: "Frontend Developer",
    company: "TechCorp Solutions",
    date: "2026-04-15",
    time: "10:00 AM – 1:00 PM",
    location: "TechCorp Office, 4th Floor, Sector 62, Noida",
    description:
      "Walk-in drive for freshers and experienced candidates with React, HTML, CSS skills. Carry resume and education certificates.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    jobRole: "Data Entry Operator",
    company: "GlobalData Inc.",
    date: "2026-04-16",
    time: "9:00 AM – 12:00 PM",
    location: "GlobalData Office, MG Road, Bangalore",
    description:
      "Immediate openings for data entry roles. Typing speed of 40 WPM required. No prior experience needed.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    jobRole: "Marketing Executive",
    company: "BrandBridge Agency",
    date: "2026-04-18",
    time: "11:00 AM – 3:00 PM",
    location: "BrandBridge, Andheri West, Mumbai",
    description:
      "Drive for marketing graduates. Roles in digital marketing, content writing, and social media management.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    jobRole: "Customer Support Executive",
    company: "CareFirst BPO",
    date: "2026-04-20",
    time: "10:00 AM – 4:00 PM",
    location: "CareFirst Office, Anna Salai, Chennai",
    description:
      "Walk-in for voice and non-voice process. Good communication skills required. Both day and night shift available.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    jobRole: "HR Intern",
    company: "PeopleFirst HR",
    date: "2026-04-22",
    time: "9:30 AM – 1:30 PM",
    location: "PeopleFirst, Banjara Hills, Hyderabad",
    description:
      "3-month internship with stipend. Open to MBA HR freshers. Training provided in recruitment and onboarding.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    jobRole: "Software Tester",
    company: "QualityTech Labs",
    date: "2026-04-24",
    time: "10:00 AM – 2:00 PM",
    location: "QualityTech, Whitefield, Bangalore",
    description:
      "Walk-in for manual testing roles. Basic knowledge of SDLC, test cases, and bug reporting required.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
];

export function useInterviews() {
  return useQuery<Interview[]>({
    queryKey: ["interviews"],
    queryFn: async () => SAMPLE_INTERVIEWS,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInterview(id: InterviewId) {
  return useQuery<Interview | undefined>({
    queryKey: ["interview", id.toString()],
    queryFn: async () => SAMPLE_INTERVIEWS.find((i) => i.id === id),
    staleTime: 5 * 60 * 1000,
  });
}

type InterviewId = bigint;
