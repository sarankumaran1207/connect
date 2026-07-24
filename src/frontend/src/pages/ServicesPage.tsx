import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle,
  ClipboardList,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const BRANCH_OPTIONS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Business Administration",
  "Commerce",
  "Arts",
  "Other",
];

const GOVT_ID_OPTIONS = [
  "Aadhaar Card",
  "PAN Card",
  "Voter ID",
  "Driving License",
  "Passport",
];

type InternshipFormState = {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  address: string;
  govtId: string;
  githubLink: string;
  linkedinLink: string;
};

const EMPTY_FORM: InternshipFormState = {
  fullName: "",
  email: "",
  phone: "",
  branch: "",
  address: "",
  govtId: "",
  githubLink: "",
  linkedinLink: "",
};

type FormErrors = {
  phone?: string;
  githubLink?: string;
  linkedinLink?: string;
};

const PHONE_REGEX = /^\d{10}$/;
const GITHUB_REGEX = /^https?:\/\/(www\.)?github\.com\/.+/;
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?linkedin\.com\/.+/;

function validateField(
  field: keyof FormErrors,
  value: string,
): string | undefined {
  if (field === "phone") {
    if (!PHONE_REGEX.test(value))
      return "Phone number must be exactly 10 digits";
  }
  if (field === "githubLink") {
    if (value && !GITHUB_REGEX.test(value))
      return "Please enter a valid GitHub URL (must be from github.com)";
  }
  if (field === "linkedinLink") {
    if (value && !LINKEDIN_REGEX.test(value))
      return "Please enter a valid LinkedIn profile URL (must be from linkedin.com)";
  }
  return undefined;
}

function InternshipApplicationForm({
  internshipTitle,
  onClose,
}: {
  internshipTitle: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<InternshipFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(field: keyof InternshipFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof FormErrors, value: string) {
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate all validated fields
    const newErrors: FormErrors = {
      phone: validateField("phone", form.phone),
      githubLink: validateField("githubLink", form.githubLink),
      linkedinLink: validateField("linkedinLink", form.linkedinLink),
    };
    setErrors(newErrors);
    if (newErrors.phone || newErrors.githubLink || newErrors.linkedinLink)
      return;
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="border border-primary/30 rounded-xl bg-card shadow-elevated overflow-hidden"
      data-ocid="internship-application-form"
    >
      {/* Form Header */}
      <div className="bg-primary px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-primary-foreground/80 text-xs font-medium uppercase tracking-wider">
            Applying for
          </p>
          <h3 className="font-display font-bold text-lg text-primary-foreground leading-tight">
            {internshipTitle}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-smooth text-primary-foreground"
          aria-label="Close application form"
          data-ocid="internship-form-close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-12 text-center space-y-3"
          data-ocid="internship-form-success"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h4 className="font-display font-bold text-xl text-foreground">
            Application Submitted!
          </h4>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Thank you for applying for <strong>{internshipTitle}</strong>. Our
            team will review your details and get back to you shortly.
          </p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 mt-2"
            onClick={onClose}
            data-ocid="internship-form-done"
          >
            Close
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Step indicator row */}
          <p className="text-xs text-muted-foreground font-medium">
            All fields are required. Please fill in your details accurately.
          </p>

          {/* Row 1 — Full Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="intern-fullName"
              className="font-semibold text-foreground text-sm"
            >
              1. Full Name
            </Label>
            <Input
              id="intern-fullName"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
              data-ocid="intern-input-fullname"
              className="bg-background border-input focus:border-primary"
            />
          </div>

          {/* Row 2 — Email + Phone (side by side on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="intern-email"
                className="font-semibold text-foreground text-sm"
              >
                2. Email Address
              </Label>
              <Input
                id="intern-email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                data-ocid="intern-input-email"
                className="bg-background border-input focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="intern-phone"
                className="font-semibold text-foreground text-sm"
              >
                3. Phone Number
              </Label>
              <Input
                id="intern-phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                maxLength={10}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={(e) => handleBlur("phone", e.target.value)}
                onKeyPress={(e) => {
                  if (!/\d/.test(e.key)) e.preventDefault();
                }}
                required
                data-ocid="intern-input-phone"
                className={`bg-background border-input focus:border-primary ${errors.phone ? "border-destructive focus:border-destructive" : ""}`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Row 3 — Branch */}
          <div className="space-y-1.5">
            <Label
              htmlFor="intern-branch"
              className="font-semibold text-foreground text-sm"
            >
              4. Branch / Stream
            </Label>
            <Select
              value={form.branch}
              onValueChange={(v) => handleChange("branch", v)}
              required
            >
              <SelectTrigger
                id="intern-branch"
                className="bg-background border-input focus:border-primary"
                data-ocid="intern-select-branch"
              >
                <SelectValue placeholder="Select your branch or stream" />
              </SelectTrigger>
              <SelectContent>
                {BRANCH_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 4 — Current Address */}
          <div className="space-y-1.5">
            <Label
              htmlFor="intern-address"
              className="font-semibold text-foreground text-sm"
            >
              5. Current Address
            </Label>
            <Textarea
              id="intern-address"
              placeholder="House/Flat No., Street, City, State, PIN"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
              rows={3}
              data-ocid="intern-input-address"
              className="bg-background border-input focus:border-primary resize-none"
            />
          </div>

          {/* Row 5 — Govt ID */}
          <div className="space-y-1.5">
            <Label
              htmlFor="intern-govtId"
              className="font-semibold text-foreground text-sm"
            >
              6. Government ID Proof
            </Label>
            <Select
              value={form.govtId}
              onValueChange={(v) => handleChange("govtId", v)}
              required
            >
              <SelectTrigger
                id="intern-govtId"
                className="bg-background border-input focus:border-primary"
                data-ocid="intern-select-govtid"
              >
                <SelectValue placeholder="Select your ID proof type" />
              </SelectTrigger>
              <SelectContent>
                {GOVT_ID_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Row 6 — GitHub + LinkedIn (side by side on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="intern-github"
                className="font-semibold text-foreground text-sm"
              >
                7. GitHub Repository Link
              </Label>
              <Input
                id="intern-github"
                type="url"
                placeholder="https://github.com/your-username/project"
                value={form.githubLink}
                onChange={(e) => handleChange("githubLink", e.target.value)}
                onBlur={(e) => handleBlur("githubLink", e.target.value)}
                required
                data-ocid="intern-input-github"
                className={`bg-background border-input focus:border-primary ${errors.githubLink ? "border-destructive focus:border-destructive" : ""}`}
              />
              {errors.githubLink && (
                <p className="text-xs text-red-500">{errors.githubLink}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="intern-linkedin"
                className="font-semibold text-foreground text-sm"
              >
                8. LinkedIn Profile Link
              </Label>
              <Input
                id="intern-linkedin"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={form.linkedinLink}
                onChange={(e) => handleChange("linkedinLink", e.target.value)}
                onBlur={(e) => handleBlur("linkedinLink", e.target.value)}
                required
                data-ocid="intern-input-linkedin"
                className={`bg-background border-input focus:border-primary ${errors.linkedinLink ? "border-destructive focus:border-destructive" : ""}`}
              />
              {errors.linkedinLink && (
                <p className="text-xs text-red-500">{errors.linkedinLink}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
              data-ocid="intern-form-submit"
            >
              Submit Application
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={onClose}
              data-ocid="intern-form-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: DollarSign,
    title: "Internships with Stipend",
    badge: "Paid",
    badgeVariant: "default" as const,
    description:
      "Earn while you learn. Our stipend-based internship programme connects fresh graduates with companies offering real work experience and monthly compensation.",
    features: [
      "Stipend range: ₹5,000 – ₹25,000/month",
      "Duration: 3 to 12 months",
      "Domains: IT, Marketing, Finance, HR, Operations",
      "Certificate of completion provided",
      "Pre-placement offer (PPO) possibility",
    ],
    cta: "Find Paid Internships",
    colorBg: "bg-primary/8",
    iconColor: "text-primary",
    isInternship: true,
  },
  {
    icon: GraduationCap,
    title: "Internships without Stipend",
    badge: "Skill Building",
    badgeVariant: "secondary" as const,
    description:
      "Build your portfolio and resume with hands-on exposure. Perfect for recent graduates who want industry experience to land their first job.",
    features: [
      "Duration: 1 to 6 months",
      "Gain industry-relevant skills",
      "Letter of recommendation on completion",
      "Mentorship from professionals",
      "Resume & LinkedIn profile support",
    ],
    cta: "Explore Skill Internships",
    colorBg: "bg-accent/15",
    iconColor: "text-accent-foreground",
    isInternship: true,
  },
  {
    icon: Briefcase,
    title: "Job Opportunities",
    badge: "Full-time",
    badgeVariant: "default" as const,
    description:
      "Curated full-time job listings for unemployed individuals. From entry-level roles to mid-management, we partner with companies actively hiring right now.",
    features: [
      "Entry-level and experienced roles",
      "Salary range: ₹2L – ₹12L CTC",
      "Verified employers only",
      "Fast-tracked hiring process",
      "All industries and sectors covered",
    ],
    cta: "Browse Job Openings",
    colorBg: "bg-primary/8",
    iconColor: "text-primary",
    isInternship: false,
    linkTo: "/apply" as const,
  },
  {
    icon: MapPin,
    title: "Walk-in Interview Drives",
    badge: "Walk-in Only",
    badgeVariant: "default" as const,
    description:
      "No online rounds, no video calls. Walk directly into our organised drives and face-to-face interviews. The most human way to get hired.",
    features: [
      "185+ drives every month",
      "Multiple companies, one venue",
      "No prior registration required",
      "Instant feedback from interviewers",
      "Multiple roles per drive",
    ],
    cta: "View Upcoming Drives",
    colorBg: "bg-primary/8",
    iconColor: "text-primary",
    isInternship: false,
    linkTo: "/interviews" as const,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Register",
    description:
      "Fill out a simple form with your name, qualification, skills, and contact details. Takes less than 2 minutes.",
  },
  {
    step: "02",
    icon: Search,
    title: "Browse Opportunities",
    description:
      "Explore internships, jobs, and upcoming walk-in interview drives tailored to your profile and interests.",
  },
  {
    step: "03",
    icon: Building2,
    title: "Walk-in & Get Hired",
    description:
      "Show up at the scheduled venue, meet employers directly, and take the first step toward your new career.",
  },
];

type InternshipListing = {
  id: number;
  company: string;
  role: string;
  stipend: string;
  isPaid: boolean;
  duration: string;
  location: string;
  description: string;
};

const PAID_INTERNSHIPS: InternshipListing[] = [
  {
    id: 1,
    company: "Google India",
    role: "Software Engineering Intern",
    stipend: "₹25,000/month",
    isPaid: true,
    duration: "3 months",
    location: "Bangalore",
    description:
      "Google is a global technology leader focused on improving the ways people connect with information. Interns work on real product features alongside senior engineers, gaining hands-on experience with cutting-edge technology.",
  },
  {
    id: 2,
    company: "Microsoft India",
    role: "Product Development Intern",
    stipend: "₹22,000/month",
    isPaid: true,
    duration: "6 months",
    location: "Hyderabad",
    description:
      "Microsoft is a leading global technology company enabling digital transformation for the era of an intelligent cloud. Interns contribute to Azure, Microsoft 365, and other enterprise products with mentorship from industry experts.",
  },
  {
    id: 3,
    company: "Amazon India",
    role: "Software Development Intern",
    stipend: "₹20,000/month",
    isPaid: true,
    duration: "3 months",
    location: "Bangalore / Hyderabad",
    description:
      "Amazon is the world's largest e-commerce and cloud computing company. Interns work on AWS cloud projects and consumer technology, receiving world-class mentorship and the possibility of a full-time return offer.",
  },
  {
    id: 4,
    company: "Razorpay",
    role: "Backend Engineering Intern",
    stipend: "₹20,000/month",
    isPaid: true,
    duration: "6 months",
    location: "Bangalore",
    description:
      "Razorpay is India's leading full-stack financial solutions company, trusted by over 8 million businesses. Interns build scalable payment infrastructure and financial APIs in a high-growth fintech environment.",
  },
  {
    id: 5,
    company: "PhonePe",
    role: "Data Analyst Intern",
    stipend: "₹18,000/month",
    isPaid: true,
    duration: "6 months",
    location: "Bangalore",
    description:
      "PhonePe is India's leading digital payments platform with over 500 million registered users. Interns work with large-scale transaction datasets, building dashboards and driving product analytics insights.",
  },
  {
    id: 6,
    company: "Flipkart",
    role: "Product Management Intern",
    stipend: "₹18,000/month",
    isPaid: true,
    duration: "3 months",
    location: "Bangalore",
    description:
      "Flipkart is India's leading e-commerce marketplace with over 350 million registered users. Interns collaborate with product, design, and engineering teams to shape the future of online commerce in India.",
  },
  {
    id: 7,
    company: "Swiggy",
    role: "Operations & Logistics Intern",
    stipend: "₹15,000/month",
    isPaid: true,
    duration: "3 months",
    location: "Bangalore / Mumbai",
    description:
      "Swiggy is India's leading on-demand delivery platform, delivering food and groceries to millions of customers daily. Interns gain hands-on exposure to hyperlocal logistics, supply chain, and growth operations.",
  },
  {
    id: 8,
    company: "Zomato",
    role: "Marketing & Growth Intern",
    stipend: "₹15,000/month",
    isPaid: true,
    duration: "3 months",
    location: "Gurugram",
    description:
      "Zomato is India's most popular food delivery and restaurant discovery platform with a presence in 1,000+ cities. Interns work on user acquisition, content strategy, and brand marketing campaigns.",
  },
];

const FREE_INTERNSHIPS: InternshipListing[] = [
  {
    id: 9,
    company: "Infosys",
    role: "Technology Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Bangalore / Pune",
    description:
      "Infosys is a global leader in technology services and consulting with over 300,000 employees worldwide. Interns get structured training, mentorship, and a certificate of completion from one of India's most respected IT brands.",
  },
  {
    id: 10,
    company: "Wipro",
    role: "IT & Business Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Hyderabad / Chennai",
    description:
      "Wipro Limited is a leading global IT, consulting and business process services company. The internship programme focuses on skill development in software engineering, quality assurance, and business consulting.",
  },
  {
    id: 11,
    company: "TCS (Tata Consultancy Services)",
    role: "Digital Technology Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "6 months",
    location: "Mumbai / Chennai / Pune",
    description:
      "TCS is one of India's largest IT companies with a 50-year legacy of innovation. Interns are exposed to enterprise digital transformation projects, gaining experience in cloud, AI, and agile methodologies.",
  },
  {
    id: 12,
    company: "BYJU's",
    role: "Content & Curriculum Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Bangalore",
    description:
      "BYJU's is India's largest ed-tech company and one of the world's most valuable education startups. Interns contribute to developing learning content, teaching aids, and digital curriculum materials for millions of students.",
  },
  {
    id: 13,
    company: "Ola",
    role: "Operations & Strategy Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Bangalore",
    description:
      "Ola is India's leading mobility platform offering ride-hailing, EVs, and financial services. Interns get exposure to urban mobility operations, driver partner management, and city-level growth strategy.",
  },
  {
    id: 14,
    company: "Paytm",
    role: "Fintech Business Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Noida",
    description:
      "Paytm is India's leading digital financial services platform offering payments, banking, insurance, and wealth management. Interns learn about digital payment ecosystems, merchant solutions, and financial product development.",
  },
  {
    id: 15,
    company: "Myntra",
    role: "Fashion & E-commerce Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Bangalore",
    description:
      "Myntra is India's leading fashion and lifestyle e-commerce platform under the Flipkart Group. Interns work across category management, visual merchandising, and customer experience teams in a fast-moving retail environment.",
  },
  {
    id: 16,
    company: "Meesho",
    role: "Social Commerce Intern",
    stipend: "Unpaid",
    isPaid: false,
    duration: "3 months",
    location: "Bangalore",
    description:
      "Meesho is India's fastest-growing social commerce platform empowering millions of small businesses and entrepreneurs. Interns work on seller growth, social media strategy, and community-driven e-commerce initiatives.",
  },
];

function InternshipCard({
  listing,
  onApply,
}: {
  listing: InternshipListing;
  onApply: (title: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="border-border h-full hover:shadow-elevated transition-smooth"
        data-ocid={`internship-listing-${listing.id}`}
      >
        <CardContent className="p-5 flex flex-col h-full space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-display font-bold text-base text-foreground leading-tight truncate">
                {listing.company}
              </h4>
              <p className="text-sm text-primary font-medium mt-0.5 truncate">
                {listing.role}
              </p>
            </div>
            <Badge
              variant={listing.isPaid ? "default" : "secondary"}
              className="shrink-0 text-xs"
            >
              {listing.isPaid ? "Paid" : "Unpaid"}
            </Badge>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-1 gap-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span className="font-medium text-foreground">
                {listing.stipend}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{listing.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span className="truncate">{listing.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {listing.description}
          </p>

          {/* Apply button */}
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 mt-auto"
            onClick={() => onApply(`${listing.role} at ${listing.company}`)}
            data-ocid={`internship-apply-${listing.id}`}
          >
            Apply Now
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ServicesPage() {
  // activeForm stores the title of the internship whose form is currently open, or null
  const [activeForm, setActiveForm] = useState<string | null>(null);

  function openForm(title: string) {
    setActiveForm((prev) => (prev === title ? null : title));
  }

  function closeForm() {
    setActiveForm(null);
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="bg-card border-b border-border py-14 lg:py-20"
        data-ocid="services-hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-5"
          >
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              Our Services
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight">
              Every pathway you need to{" "}
              <span className="text-primary">launch your career</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a fresh graduate or have been job-seeking for
              months, CONNECT has a programme tailored for exactly where you
              are.
            </p>
            {/* Walk-in Only Badge */}
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2.5 font-display font-semibold text-sm shadow-elevated">
              <BadgeCheck className="w-4 h-4 shrink-0" />
              Walk-in Only — No Online Interviews
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section
        className="bg-background py-16 lg:py-20"
        data-ocid="service-cards-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              What We Offer
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Four focused programmes, each designed to meet you where you are
              and take you where you want to go.
            </p>
          </motion.div>

          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;
            const isFormOpen = activeForm === service.title;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-0"
              >
                <Card
                  className={`border-border overflow-hidden ${isFormOpen ? "rounded-b-none border-b-0" : ""}`}
                  data-ocid={`service-detail-${i}`}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div
                        className={`${service.colorBg} p-8 lg:p-12 flex flex-col justify-center space-y-4 ${!isEven ? "lg:order-2" : ""}`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-background/70 flex items-center justify-center">
                          <Icon className={`w-7 h-7 ${service.iconColor}`} />
                        </div>
                        <Badge
                          variant={service.badgeVariant}
                          className="w-fit text-xs"
                        >
                          {service.badge}
                        </Badge>
                        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                          {service.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>

                        {service.isInternship ? (
                          <Button
                            className={`w-fit gap-2 font-semibold transition-smooth ${
                              isFormOpen
                                ? "bg-primary/15 text-primary border border-primary hover:bg-primary/20"
                                : "bg-primary hover:bg-primary/90 text-primary-foreground"
                            }`}
                            onClick={() => openForm(service.title)}
                            data-ocid={`service-cta-${i}`}
                          >
                            {isFormOpen ? "Close Application" : service.cta}
                            <ArrowRight
                              className={`w-4 h-4 transition-transform duration-200 ${isFormOpen ? "rotate-90" : ""}`}
                            />
                          </Button>
                        ) : (
                          <Link to={service.linkTo!}>
                            <Button
                              className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-semibold"
                              data-ocid={`service-cta-${i}`}
                            >
                              {service.cta}
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                      <div
                        className={`p-8 lg:p-12 bg-card space-y-3 ${!isEven ? "lg:order-1" : ""}`}
                      >
                        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                          What's Included
                        </h3>
                        {service.features.map((feat) => (
                          <div
                            key={feat}
                            className="flex items-start gap-3 border-l-2 border-primary pl-3"
                          >
                            <span className="text-sm text-foreground">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inline Application Form — only for internship cards */}
                {service.isInternship && (
                  <AnimatePresence>
                    {isFormOpen && (
                      <div className="border border-t-0 border-primary/30 rounded-b-xl overflow-hidden">
                        <InternshipApplicationForm
                          internshipTitle={service.title}
                          onClose={closeForm}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Paid Internship Listings ── */}
      <section
        className="bg-muted/30 py-16 lg:py-20"
        data-ocid="paid-internships-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              Currently Open
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                  Paid Internships
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Earn a monthly stipend while gaining real industry experience
                  at India's top companies.
                </p>
              </div>
              <Badge className="w-fit h-fit text-sm px-3 py-1.5 bg-primary text-primary-foreground shrink-0">
                {PAID_INTERNSHIPS.length} Openings
              </Badge>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAID_INTERNSHIPS.map((listing) => (
              <InternshipCard
                key={listing.id}
                listing={listing}
                onApply={openForm}
              />
            ))}
          </div>

          {/* Inline form for company-level applications */}
          <AnimatePresence>
            {activeForm && !SERVICES.some((s) => s.title === activeForm) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <InternshipApplicationForm
                  internshipTitle={activeForm}
                  onClose={closeForm}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Free / Unpaid Internship Listings ── */}
      <section
        className="bg-background py-16 lg:py-20"
        data-ocid="free-internships-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              Skill Building
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
                  Free Internships
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Build your skills and resume at top Indian companies. Get a
                  certificate, mentorship, and a strong career foundation.
                </p>
              </div>
              <Badge
                variant="secondary"
                className="w-fit h-fit text-sm px-3 py-1.5 shrink-0"
              >
                {FREE_INTERNSHIPS.length} Openings
              </Badge>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FREE_INTERNSHIPS.map((listing) => (
              <InternshipCard
                key={listing.id}
                listing={listing}
                onApply={openForm}
              />
            ))}
          </div>

          {/* Inline form for free internship applications */}
          <AnimatePresence>
            {activeForm && !SERVICES.some((s) => s.title === activeForm) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <InternshipApplicationForm
                  internshipTitle={activeForm}
                  onClose={closeForm}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="bg-muted/30 py-16 lg:py-20"
        data-ocid="how-it-works-section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to go from unemployed to employed — no
              complicated process, no waiting around.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-card rounded-xl p-6 text-center border border-border shadow-subtle relative"
                  data-ocid={`step-card-${index}`}
                >
                  {/* Step number */}
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm mx-auto mb-4 shadow-elevated">
                    {step.step}
                  </div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {/* Arrow between steps */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-3.5 top-10 w-7 h-7 text-primary z-10 bg-muted/30 rounded-full p-1" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Walk-in Spotlight */}
      <section
        className="bg-background py-14 px-4"
        data-ocid="walkin-spotlight"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary rounded-2xl p-8 md:p-10 text-primary-foreground text-center shadow-elevated"
          >
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-5">
              <BadgeCheck className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Walk-in Only — No Online Interviews
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6 leading-relaxed">
              Every interview at CONNECT is conducted in person. We believe in
              real connections — meet your future employer face-to-face, make a
              lasting impression, and get hired faster.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold">
              {[
                "No video calls",
                "No written tests online",
                "No ghosting",
                "Direct employer access",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-4 py-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-14" data-ocid="services-cta">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mt-2">
              Join thousands of youth who have found internships and jobs
              through CONNECT. Your opportunity is just one walk-in away.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link to="/apply">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                  data-ocid="services-cta-apply"
                >
                  Apply Now — Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/interviews">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 font-semibold"
                  data-ocid="services-cta-interviews"
                >
                  View Walk-in Drives
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
