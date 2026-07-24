import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Shield, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function SignUpPage() {
  const { register, isLoggingIn, isLoginError, loginError } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isLoginError && loginError) {
      setErrorMsg(
        loginError.message?.includes("popup")
          ? "Login popup was blocked. Please allow popups and try again."
          : loginError.message?.includes("cancel")
            ? "Login was cancelled. Please try again."
            : "Registration failed. Please try again.",
      );
    } else {
      setErrorMsg(null);
    }
  }, [isLoginError, loginError]);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join CONNECT and discover your next opportunity
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-card border border-border rounded-lg p-8 shadow-elevated card-hover"
          data-ocid="signup.dialog"
        >
          {errorMsg && (
            <div
              className="mb-5 px-4 py-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              data-ocid="signup.error_state"
            >
              {errorMsg}
            </div>
          )}

          <div className="space-y-5">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                Secure registration powered by Internet Identity
              </p>
              <p className="text-xs text-muted-foreground">
                After authentication, you will be able to set up your profile
              </p>
            </div>

            <Button
              type="button"
              disabled={isLoggingIn}
              onClick={() => register()}
              className="w-full btn-primary rounded-md h-11"
              data-ocid="signup.submit_button"
            >
              {isLoggingIn ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Connecting…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Sign Up with Internet Identity
                </span>
              )}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline transition-colors duration-200"
            data-ocid="signup.login_link"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
