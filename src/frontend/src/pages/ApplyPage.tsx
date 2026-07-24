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
import {
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useSubmitApplication } from "../hooks/useApplications";
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

export function ApplyPage() {
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
    };
    mutate(input);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="bg-card border-b border-border py-12 lg:py-16"
        data-ocid="apply-hero"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              Apply / Register
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
              Apply <span className="text-primary">Now</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              Take the first step toward your dream career. Submit your details
              and our team will match you with the best internship or job
              opportunity tailored just for you.
            </p>
            <div className="flex flex-wrap gap-5 pt-1">
              {[
                "Free Registration",
                "Quick Response",
                "Real Opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="bg-background py-12 lg:py-16"
        data-ocid="apply-form-section"
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
                data-ocid="apply-success-state"
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
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="border-border shadow-elevated overflow-hidden">
                  <div className="h-1.5 bg-primary w-full" />
                  <CardContent className="p-6 sm:p-8">
                    {/* Error Banner */}
                    {isError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6"
                        data-ocid="apply-error-banner"
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
                      data-ocid="apply-form"
                    >
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h2 className="font-display font-semibold text-lg text-foreground border-b border-border pb-3">
                          Personal Information
                        </h2>

                        {/* Name */}
                        <div className="space-y-1.5">
                          <Label
                            htmlFor="name"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <UserRound className="w-3.5 h-3.5 text-primary" />
                            Full Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="e.g. Priya Sharma"
                            data-ocid="apply-input-name"
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
                              htmlFor="email"
                              className="flex items-center gap-1.5 text-sm font-medium"
                            >
                              <Mail className="w-3.5 h-3.5 text-primary" />
                              Email Address{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              data-ocid="apply-input-email"
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
                              htmlFor="phone"
                              className="flex items-center gap-1.5 text-sm font-medium"
                            >
                              <Phone className="w-3.5 h-3.5 text-primary" />
                              Phone Number{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="10-digit mobile number"
                              maxLength={10}
                              data-ocid="apply-input-phone"
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
                              data-ocid="apply-select-qualification"
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
                          {/* hidden input drives RHF validation */}
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
                            htmlFor="skills"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            Skills <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="skills"
                            placeholder="e.g. JavaScript, Communication, MS Excel"
                            data-ocid="apply-input-skills"
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
                            htmlFor="message"
                            className="flex items-center gap-1.5 text-sm font-medium"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                            Message{" "}
                            <span className="text-muted-foreground font-normal">
                              (Optional)
                            </span>
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your goals, preferred role, or anything else you'd like us to know..."
                            rows={4}
                            data-ocid="apply-textarea-message"
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
                        data-ocid="apply-submit-btn"
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
