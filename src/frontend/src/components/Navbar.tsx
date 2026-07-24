import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  GraduationCap,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Walk-in Interviews", to: "/interviews" },
  { label: "Shift Jobs", to: "/shifts" },
  { label: "Apply", to: "/apply" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
      data-ocid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              CONNECT
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav-links"
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth + CTA + Hamburger */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <span
                  className="text-sm font-medium text-foreground px-2 truncate max-w-[120px]"
                  title={currentUser?.fullName}
                  data-ocid="nav-username"
                >
                  {currentUser?.fullName?.split(" ")[0]}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5 border-border text-muted-foreground hover:text-foreground rounded-md transition-smooth"
                  data-ocid="nav-logout-button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" data-ocid="nav-login-link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-foreground rounded-md transition-smooth"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" data-ocid="nav-signup-link">
                  <Button
                    size="sm"
                    className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-smooth"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Link to="/apply" data-ocid="nav-cta" className="hidden lg:block">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md transition-smooth">
                <Briefcase className="w-4 h-4" />
                Apply Now
              </Button>
            </Link>

            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav-hamburger"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card"
          data-ocid="nav-mobile-menu"
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary bg-primary/8 font-semibold border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border space-y-1.5">
              {isLoggedIn ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <span
                    className="text-sm font-medium text-foreground"
                    data-ocid="nav-mobile-username"
                  >
                    {currentUser?.fullName}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="gap-1.5 border-border text-muted-foreground rounded-md"
                    data-ocid="nav-mobile-logout-button"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-border text-foreground rounded-md"
                      data-ocid="nav-mobile-login-link"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                    <Button
                      className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md"
                      data-ocid="nav-mobile-signup-link"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/apply" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
