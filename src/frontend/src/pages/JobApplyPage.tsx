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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useSubmitApplication } from "../hooks/useApplications";
import { useInterview } from "../hooks/useInterviews";
import type { ApplicationInput } from "../types";

const QUALIFICATIONS = [
  { value: "10th", label: "10th Standard" },
  { value: "12th", label: "12th Standard" },
  { value: "Diploma", label: "Diploma" },
  { value: "Bachelor's", label: "Bachelor's Degree" },
  { value: "Master's", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  skills: string;
  message: string;
}

function JobDetailCard({
  jobRole,
  company,
  date,
  time,
  location,
}: {
  jobRole: string;
  company: string;
  date: string;
  time: string;
  location: string;
}) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="border-primary/30 bg-primary/5 shadow-subtle mb-6 overflow-hidden"
        data-ocid="job-apply-detail-card"
      >
        <div className="h-1 bg-primary w-full" />
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-lg text-foreground leading-snug">
                {jobRole}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-sm font-medium text-primary truncate">
                  {company}
                </span>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs shrink-0 ml-auto">
              Walk-in
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-primary/15 pt-4">
            <div className="flex items-start gap-2">
              <CalendarDays className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Interview Date
                </p>
                <p className="text-sm text-foreground font-medium mt-0.5">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Time
                </p>
                <p className="text-sm text-foreground font-medium mt-0.5">
                  {time}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Location
                </p>
                <p className="text-sm text-foreground font-medium mt-0.5 leading-relaxed">
                  {location}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function JobApplyPage() {
  const search = useSearch({ strict: false }) as { interviewId?: string };
  const rawId = search.interviewId;
  const interviewId = rawId ? BigInt(rawId) : null;

  const { data: interview, isLoading } = useInterview(interviewId ?? BigInt(0));

  const { mutate, isPending, isSuccess, isError, error, data } =
    useSubmitApplication();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      qualification: "",
      skills: "",
      message: "",
    },
  });

  const qualificationValue = watch("qualification");

  const onSubmit = (formData: FormData) => {
    const input: ApplicationInput = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      skills: formData.skills,
      message: formData.message,
      interviewId: interviewId ?? undefined,
    };
    mutate(input);
  };

  // No interviewId param or invalid
  if (!interviewId) {
    return (
      <div>
        <section className="bg-card border-b border-border py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="w-6 h-0.5 bg-primary inline-block" />
                Apply for a Role
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
                Job Not <span className="text-primary">Found</span>
              </h1>
            </motion.div>
          </div>
        </section>
        <section className="bg-background py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
              <Briefcase className="w-9 h-9 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-2xl text-foreground">
                No job selected
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                It looks like you navigated here directly. Please choose a
                walk-in interview from the listings to apply.
              </p>
            </div>
            <Link to="/interviews">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-smooth"
                data-ocid="job-apply-back-to-interviews"
              >
                <ArrowLeft className="w-4 h-4" />
                View Walk-in Interviews
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Interview not found after loading
  if (!isLoading && !interview) {
    return (
      <div>
        <section className="bg-card border-b border-border py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="w-6 h-0.5 bg-primary inline-block" />
                Apply for a Role
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
                Interview <span className="text-primary">Not Found</span>
              </h1>
            </motion.div>
          </div>
        </section>
        <section className="bg-background py-12 lg:py-16">
          <div
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
            data-ocid="job-apply-not-found"
          >
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
              <AlertCircle className="w-9 h-9 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-2xl text-foreground">
                This interview listing couldn't be found
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
                The interview you're looking for may have expired or been
                removed. Check the current listings for active opportunities.
              </p>
            </div>
            <Link to="/interviews">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-smooth"
                data-ocid="job-apply-not-found-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Walk-in Interviews
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="bg-card border-b border-border py-12 lg:py-16"
        data-ocid="job-apply-hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Link
              to="/interviews"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              data-ocid="job-apply-breadcrumb"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Walk-in Interviews
            </Link>

            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              Apply for a Role
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-80 rounded" />
                <Skeleton className="h-5 w-56 rounded" />
              </div>
            ) : (
              <>
                <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
                  Apply for{" "}
                  <span className="text-primary">{interview?.jobRole}</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  at{" "}
                  <span className="text-foreground font-semibold">
                    {interview?.company}
                  </span>
                </p>
              </>
            )}

            <div className="flex flex-wrap gap-5 pt-1">
              {["Walk-in Interview", "Free to Apply", "Quick Response"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="bg-background py-12 lg:py-16"
        data-ocid="job-apply-form-section"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {isSuccess && data?.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6 py-12"
                data-ocid="job-apply-success-state"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-3">
                  <h2 className="font-display font-bold text-3xl text-foreground">
                    Application Submitted!
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                    {data.message}
                  </p>
                  {interview && (
                    <p className="text-sm text-primary font-medium">
                      Applied for {interview.jobRole} at {interview.company}
                    </p>
                  )}
                </div>
                <div className="bg-card border border-border rounded-xl p-5 max-w-sm mx-auto text-sm text-muted-foreground">
                  <p>
                    Keep an eye on your email and phone — our team will contact
                    you within{" "}
                    <strong className="text-foreground">
                      1–2 business days
                    </strong>
                    .
                  </p>
                </div>
                <Link to="/interviews">
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/8 gap-2"
                    data-ocid="job-apply-success-back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    View More Opportunities
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Job Details Card */}
                {isLoading ? (
                  <Card className="border-border shadow-subtle mb-6">
                    <CardContent className="p-5 sm:p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-5 w-48 rounded" />
                          <Skeleton className="h-4 w-32 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
                        <Skeleton className="h-12 rounded" />
                        <Skeleton className="h-12 rounded" />
                        <Skeleton className="h-12 rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  interview && (
                    <JobDetailCard
                      jobRole={interview.jobRole}
                      company={interview.company}
                      date={interview.date}
                      time={interview.time}
                      location={interview.location}
                    />
                  )
                )}

                <Card className="border-border shadow-elevated overflow-hidden">
                  <div className="h-1.5 bg-primary w-full" />
                  <CardContent className="p-6 sm:p-8">
                    {/* Error Banner */}
                    {isError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6"
                        data-ocid="job-apply-error-banner"
                      >
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-destructive">
                            Submission Failed
                          </p>
                          <p className="text-xs text-destructive/80 mt-0.5">
                            {error?.message ??
                              "Something went wrong. Please try again."}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-6"
                      data-ocid="job-apply-form"
                    >
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h2 className="font-display font-semibold text-lg text-foreground border-b border-border pb-3">
                          Personal Information
                        </h2>

                        {/* Name */}
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="ja-name"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <UserRound className="w-3.5 h-3.5 text-primary" />
                            Full Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="ja-name"
                            placeholder="e.g. Priya Sharma"
                            data-ocid="job-apply-input-name"
                            className={
                              errors.name
                                ? "border-destructive focus-visible:ring-destructive/30"
                                : ""
                            }
                            {...register("name", {
                              required: "Full name is required",
                              minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                              },
                            })}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="ja-email"
                              className="flex items-center gap-1.5 text-sm font-medium"
                            >
                              <Mail className="w-3.5 h-3.5 text-primary" />
                              Email Address{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="ja-email"
                              type="email"
                              placeholder="you@example.com"
                              data-ocid="job-apply-input-email"
                              className={
                                errors.email
                                  ? "border-destructive focus-visible:ring-destructive/30"
                                  : ""
                              }
                              {...register("email", {
                                required: "Email address is required",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Enter a valid email address",
                                },
                              })}
                            />
                            {errors.email && (
                              <p className="text-xs text-destructive">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="ja-phone"
                              className="flex items-center gap-1.5 text-sm font-medium"
                            >
                              <Phone className="w-3.5 h-3.5 text-primary" />
                              Phone Number{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="ja-phone"
                              type="tel"
                              placeholder="10-digit mobile number"
                              maxLength={10}
                              data-ocid="job-apply-input-phone"
                              onKeyPress={(e) => {
                                if (!/\d/.test(e.key)) e.preventDefault();
                              }}
                              className={
                                errors.phone
                                  ? "border-destructive focus-visible:ring-destructive/30"
                                  : ""
                              }
                              {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                  value: /^\d{10}$/,
                                  message:
                                    "Phone number must be exactly 10 digits",
                                },
                              })}
                            />
                            {errors.phone && (
                              <p className="text-xs text-destructive">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Education & Skills */}
                      <div className="space-y-4">
                        <h2 className="font-display font-semibold text-lg text-foreground border-b border-border pb-3">
                          Education &amp; Skills
                        </h2>

                        {/* Qualification */}
                        <div className="space-y-1.5">
                          <Label className="flex items-center gap-1.5 text-sm font-medium">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" />
                            Highest Qualification{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={qualificationValue}
                            onValueChange={(val) =>
                              setValue("qualification", val, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger
                              data-ocid="job-apply-select-qualification"
                              className={
                                errors.qualification
                                  ? "border-destructive focus:ring-destructive/30"
                                  : ""
                              }
                            >
                              <SelectValue placeholder="Select your qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              {QUALIFICATIONS.map((q) => (
                                <SelectItem key={q.value} value={q.value}>
                                  {q.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <input
                            type="hidden"
                            {...register("qualification", {
                              required: "Please select your qualification",
                            })}
                          />
                          {errors.qualification && (
                            <p className="text-xs text-destructive">
                              {errors.qualification.message}
                            </p>
                          )}
                        </div>

                        {/* Skills */}
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="ja-skills"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Skills <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="ja-skills"
                            placeholder="e.g. JavaScript, Communication, MS Excel"
                            data-ocid="job-apply-input-skills"
                            className={
                              errors.skills
                                ? "border-destructive focus-visible:ring-destructive/30"
                                : ""
                            }
                            {...register("skills", {
                              required: "Please enter at least one skill",
                            })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Separate multiple skills with commas
                          </p>
                          {errors.skills && (
                            <p className="text-xs text-destructive">
                              {errors.skills.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="space-y-4">
                        <h2 className="font-display font-semibold text-lg text-foreground border-b border-border pb-3">
                          Additional Details
                        </h2>
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="ja-message"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            Message{" "}
                            <span className="text-muted-foreground font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <Textarea
                            id="ja-message"
                            placeholder="Tell us about yourself, your experience, or why you're a great fit for this role..."
                            rows={4}
                            data-ocid="job-apply-textarea-message"
                            className="resize-none"
                            {...register("message")}
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isPending}
                        size="lg"
                        className="w-full font-display font-semibold gap-2 transition-smooth"
                        data-ocid="job-apply-submit-btn"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting Application…
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Application
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By submitting, you agree to CONNECT's privacy policy.
                        Your data is safe and never shared without consent.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
