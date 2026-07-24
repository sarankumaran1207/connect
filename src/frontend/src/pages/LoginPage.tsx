import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  Clock,
  GraduationCap,
  MapPin,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const features = [
  {
    icon: Briefcase,
    title: "Browse Job Openings",
    desc: "Full-time positions from top verified companies across India",
  },
  {
    icon: GraduationCap,
    title: "Find Internship Opportunities",
    desc: "Paid and skill-building internships with stipends up to ₹25,000/month",
  },
  {
    icon: MapPin,
    title: "Walk-in Interviews — No Online Rounds",
    desc: "Meet employers face-to-face. No video calls, no written tests, no ghosting",
  },
  {
    icon: Clock,
    title: "Flexible Shift-Based Job Listings",
    desc: "Morning, afternoon, and night shifts for candidates who prefer specific hours",
  },
  {
    icon: Users,
    title: "Built for Fresh Graduates",
    desc: "Designed specifically for degree-completed students and first-time job seekers",
  },
  {
    icon: Building2,
    title: "Trusted by Top Companies",
    desc: "Listings from Infosys, TCS, Wipro, Amazon, Flipkart, and 100+ more",
  },
];

export function LoginPage() {
  const { login, isLoggingIn, isLoginError, loginError } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoginError && loginError) {
      setErrorMsg(
        loginError.message?.includes("popup")
          ? "Login popup was blocked. Please allow popups and try again."
          : loginError.message?.includes("cancel")
            ? "Login was cancelled. Please try again."
            : "Login failed. Please try again.",
      );
    } else {
      setErrorMsg(null);
    }
  }, [isLoginError, loginError]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-start justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ── Left: Introduction ───────────────────────────────── */}
          <div className="space-y-6" data-ocid="login.intro.section">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-display font-bold text-lg leading-none">
                    C
                  </span>
                </div>
                <h1 className="font-display font-bold text-3xl text-foreground tracking-tight">
                  CONNECT
                </h1>
              </div>
              <p className="font-display font-semibold text-primary text-xl leading-snug">
                Your gateway to real opportunities
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed">
              CONNECT helps degree-completed students, fresh graduates, and job
              seekers find their next opportunity — exclusively through walk-in
              interviews, so you meet employers face to face. No online
              screening, no ghosting, no delays.
            </p>

            {/* Feature highlight strip */}
            <div className="bg-primary/8 border border-primary/20 rounded-lg px-4 py-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm font-display font-semibold text-primary">
                Walk-in Only — No Online Interviews, Ever
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {title}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Divider line — visible only on mobile between intro and form */}
            <div className="lg:hidden border-t border-border pt-2" />
          </div>

          {/* ── Right: Login Form ─────────────────────────────────── */}
          <div className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to your CONNECT account
              </p>
            </div>

            {/* Card */}
            <div
              className="bg-card border border-border rounded-lg p-8 shadow-elevated card-hover"
              data-ocid="login.dialog"
            >
              {errorMsg && (
                <div
                  className="mb-5 px-4 py-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  data-ocid="login.error_state"
                >
                  {errorMsg}
                </div>
              )}

              <div className="space-y-5">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Secure login powered by Internet Identity
                  </p>
                </div>

                <Button
                  type="button"
                  disabled={isLoggingIn}
                  onClick={() => login()}
                  className="w-full btn-primary rounded-md h-11"
                  data-ocid="login.submit_button"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Connecting…
                    </span>
                  ) : (
                    "Sign In with Internet Identity"
                  )}
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline transition-colors duration-200"
                data-ocid="login.signup_link"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
