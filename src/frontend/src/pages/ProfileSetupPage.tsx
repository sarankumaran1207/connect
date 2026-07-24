import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useSaveCallerUserProfile } from "../hooks/useUserProfile";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface FormErrors {
  fullName?: string;
  email?: string;
  form?: string;
}

export function ProfileSetupPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveCallerUserProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(email))
      errs.email = "Please enter a valid email address.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await saveProfile.mutateAsync({
        fullName: fullName.trim(),
        email: email.trim(),
      });
      await navigate({ to: "/" });
    } catch (err) {
      setErrors({
        form:
          err instanceof Error
            ? err.message
            : "Failed to create profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Tell us a bit about yourself to get started with CONNECT
          </p>
        </div>

        <div
          className="bg-card border border-border rounded-lg p-8 shadow-elevated card-hover"
          data-ocid="profile_setup.dialog"
        >
          {errors.form && (
            <div
              className="mb-5 px-4 py-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              data-ocid="profile_setup.error_state"
            >
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="profile-name"
                className="font-display font-medium text-foreground"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => {
                    if (!fullName.trim())
                      setErrors((p) => ({
                        ...p,
                        fullName: "Full name is required.",
                      }));
                    else setErrors((p) => ({ ...p, fullName: undefined }));
                  }}
                  className={`pl-10 rounded-md border-input focus-visible:ring-primary ${errors.fullName ? "border-destructive" : ""}`}
                  data-ocid="profile_setup.full_name.input"
                  aria-describedby={
                    errors.fullName ? "profile-name-error" : undefined
                  }
                  aria-invalid={!!errors.fullName}
                />
              </div>
              {errors.fullName && (
                <p
                  id="profile-name-error"
                  className="text-destructive text-xs mt-1"
                  data-ocid="profile_setup.full_name.field_error"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="profile-email"
                className="font-display font-medium text-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="profile-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if (!email.trim())
                      setErrors((p) => ({
                        ...p,
                        email: "Email is required.",
                      }));
                    else if (!validateEmail(email))
                      setErrors((p) => ({
                        ...p,
                        email: "Please enter a valid email address.",
                      }));
                    else setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={`pl-10 rounded-md border-input focus-visible:ring-primary ${errors.email ? "border-destructive" : ""}`}
                  data-ocid="profile_setup.email.input"
                  aria-describedby={
                    errors.email ? "profile-email-error" : undefined
                  }
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p
                  id="profile-email-error"
                  className="text-destructive text-xs mt-1"
                  data-ocid="profile_setup.email.field_error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary rounded-md h-11"
              data-ocid="profile_setup.submit_button"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                "Continue to CONNECT"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
