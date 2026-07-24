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
  {
    id: BigInt(7),
    jobRole: "Software Engineer",
    company: "Infosys",
    date: "2026-04-26",
    time: "9:00 AM – 4:00 PM",
    location: "Infosys Campus, Electronics City Phase 1, Bangalore",
    description:
      "Infosys is a global leader in technology services and consulting with over 300,000 employees worldwide. Walk-in drive for B.E./B.Tech/MCA freshers for software development roles. Carry 2 copies of resume, ID proof, and all mark sheets.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(8),
    jobRole: "Associate Software Engineer",
    company: "Wipro",
    date: "2026-04-28",
    time: "10:00 AM – 3:00 PM",
    location: "Wipro Technologies, Gachibowli, Hyderabad",
    description:
      "Wipro Limited is a leading global IT, consulting and business process services company. Walk-in for freshers and candidates with up to 1 year of experience. Strong programming fundamentals required.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(9),
    jobRole: "IT Analyst",
    company: "TCS (Tata Consultancy Services)",
    date: "2026-04-30",
    time: "9:00 AM – 5:00 PM",
    location: "TCS Office, Rajiv Gandhi Infotech Park, Pune",
    description:
      "TCS is one of India's largest IT companies and a global leader in digital services. Walk-in for 2024–2026 graduates across CS, IT, and electronics disciplines. Aptitude test + technical interview on the spot.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(10),
    jobRole: "Graduate Engineer Trainee",
    company: "HCL Technologies",
    date: "2026-05-03",
    time: "10:00 AM – 4:00 PM",
    location: "HCL Technologies, Sector 136, Noida",
    description:
      "HCL Technologies is a next-generation global technology company with revenue of $13.4 billion. Walk-in for engineering graduates. Roles in software development, support, and infrastructure services.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(11),
    jobRole: "Associate",
    company: "Accenture India",
    date: "2026-05-05",
    time: "9:30 AM – 3:30 PM",
    location: "Accenture, Eco Space Business Park, Bangalore",
    description:
      "Accenture is a global professional services company offering strategy, consulting, digital, technology, and operations services. Walk-in for freshers across multiple technology and BPO roles. Communication skills and aptitude are key selection criteria.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(12),
    jobRole: "Process Executive",
    company: "Cognizant",
    date: "2026-05-07",
    time: "10:00 AM – 2:00 PM",
    location: "Cognizant Technology Solutions, OMR, Chennai",
    description:
      "Cognizant is one of the world's leading professional services companies, transforming clients' business, operating, and technology models. Walk-in for BPS and IT roles. Freshers and experienced candidates up to 2 years welcome.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(13),
    jobRole: "Software Developer",
    company: "Tech Mahindra",
    date: "2026-05-09",
    time: "9:00 AM – 3:00 PM",
    location: "Tech Mahindra, Hinjewadi IT Park, Pune",
    description:
      "Tech Mahindra is a leading provider of digital transformation, consulting and business reengineering services. Walk-in for Java and Python developers. Minimum 6 months experience preferred, freshers with strong coding skills may apply.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(14),
    jobRole: "Technical Consultant",
    company: "Capgemini India",
    date: "2026-05-12",
    time: "10:00 AM – 4:00 PM",
    location: "Capgemini, DLF Cyber City, Gurugram",
    description:
      "Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. Walk-in for graduates in IT and engineering disciplines. SAP knowledge is an added advantage.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(15),
    jobRole: "Technical Support Engineer",
    company: "IBM India",
    date: "2026-05-14",
    time: "9:30 AM – 2:30 PM",
    location: "IBM India, ITPL Whitefield, Bangalore",
    description:
      "IBM is a leading global hybrid cloud and AI, and consulting services company. Walk-in for technical support and infrastructure roles. Candidates should have basic knowledge of networking, cloud concepts, and operating systems.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(16),
    jobRole: "Operations Executive",
    company: "Amazon India",
    date: "2026-05-16",
    time: "9:00 AM – 4:00 PM",
    location: "Amazon Fulfillment Center, Bhiwandi, Mumbai",
    description:
      "Amazon is the world's largest e-commerce and cloud computing company. Walk-in for warehouse operations, logistics coordination, and customer operations roles. Graduate freshers and experienced candidates welcome.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(17),
    jobRole: "Business Development Associate",
    company: "Google India",
    date: "2026-05-19",
    time: "10:00 AM – 3:00 PM",
    location: "Google India, BanerghattaMain Road, Bangalore",
    description:
      "Google is a global technology leader focused on improving the ways people connect with information. Walk-in for sales, business development, and customer solutions roles. Strong analytical and communication skills required.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(18),
    jobRole: "Category Specialist",
    company: "Flipkart",
    date: "2026-05-21",
    time: "10:00 AM – 4:00 PM",
    location: "Flipkart Office, Embassy Tech Village, Bangalore",
    description:
      "Flipkart is India's leading e-commerce marketplace with over 350 million registered users. Walk-in for supply chain, operations, and category management roles. Freshers with strong analytical skills and MBA background preferred.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(19),
    jobRole: "Software Development Engineer",
    company: "Microsoft India",
    date: "2026-05-23",
    time: "9:00 AM – 5:00 PM",
    location: "Microsoft India, Hiranandani Estate, Hyderabad",
    description:
      "Microsoft is a leading global technology company enabling digital transformation for the era of an intelligent cloud. Walk-in for software engineering and product support roles. Strong problem-solving and coding skills in C++, Java, or Python required.",
    isActive: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(20),
    jobRole: "Product Support Engineer",
    company: "Zoho Corporation",
    date: "2026-05-26",
    time: "9:30 AM – 3:30 PM",
    location: "Zoho Corporation, Estancia IT Park, Chennai",
    description:
      "Zoho Corporation is an Indian multinational technology company providing business software and SaaS products used by over 80 million users globally. Walk-in for product support, technical writing, and QA roles. Candidates with knowledge of databases and APIs preferred.",
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
