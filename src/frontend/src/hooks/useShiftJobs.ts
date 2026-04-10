import { useQuery } from "@tanstack/react-query";
import type { ShiftJob } from "../types/shifts";

const SAMPLE_SHIFT_JOBS: ShiftJob[] = [
  {
    id: BigInt(1),
    jobRole: "Cashier / Billing Executive",
    company: "FreshMart Superstore",
    shiftType: "Morning",
    shiftStart: "07:00 AM",
    shiftEnd: "12:00 PM",
    location: "FreshMart, Anna Nagar, Chennai",
    description:
      "Morning shift cashier needed for weekend and weekday coverage. Basic computer knowledge required. Ideal for candidates available only in mornings.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    jobRole: "Customer Support Representative",
    company: "CareFirst BPO",
    shiftType: "Afternoon",
    shiftStart: "01:00 PM",
    shiftEnd: "06:00 PM",
    location: "CareFirst Office, Anna Salai, Chennai",
    description:
      "Afternoon shift replacement role for inbound customer support. Good English communication skills required. Ideal for candidates with morning college schedules.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    jobRole: "Security Guard",
    company: "SafeGuard Facilities",
    shiftType: "Night",
    shiftStart: "10:00 PM",
    shiftEnd: "06:00 AM",
    location: "SafeGuard, Velachery, Chennai",
    description:
      "Night shift security personnel for residential complex. Prior security experience preferred. Accommodation may be provided on request.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    jobRole: "Data Entry Operator",
    company: "GlobalData Inc.",
    shiftType: "Morning",
    shiftStart: "08:00 AM",
    shiftEnd: "01:00 PM",
    location: "GlobalData Office, MG Road, Bangalore",
    description:
      "Part-time morning shift data entry for document digitisation project. Typing speed of 40 WPM required. No prior experience necessary.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    jobRole: "Delivery Executive",
    company: "QuickRun Logistics",
    shiftType: "Afternoon",
    shiftStart: "02:00 PM",
    shiftEnd: "08:00 PM",
    location: "QuickRun Hub, Koramangala, Bangalore",
    description:
      "Afternoon shift delivery partner for local parcel runs. Two-wheeler required. Fuel allowance and incentives provided.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    jobRole: "Production Line Associate",
    company: "Sunrise Manufacturing",
    shiftType: "Night",
    shiftStart: "09:00 PM",
    shiftEnd: "05:00 AM",
    location: "Sunrise Factory, SIPCOT Industrial Park, Sriperumbudur",
    description:
      "Night shift production associate for FMCG packaging line. On-the-job training provided. Suitable for candidates available exclusively at night.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
];

export function useShiftJobs() {
  return useQuery<ShiftJob[]>({
    queryKey: ["shiftJobs"],
    queryFn: async () => SAMPLE_SHIFT_JOBS,
    staleTime: 5 * 60 * 1000,
  });
}
