import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    icon: Briefcase,
    title: "Job Opportunities",
    description:
      "Curated full-time openings for fresh graduates and job seekers. Entry-level to mid-level roles across industries — verified and ready to apply.",
    badge: "Hiring Now",
  },
  {
    icon: GraduationCap,
    title: "Paid Internships",
    description:
      "Earn while you learn. Internships with monthly stipends that give you real-world experience and financial support from day one.",
    badge: "With Stipend",
  },
  {
    icon: BookOpen,
    title: "Free Internships",
    description:
      "Build your portfolio and skills at top companies. Mentorship-driven programs perfect for first-time job seekers with no prior experience.",
    badge: "Skill Building",
  },
  {
    icon: Users,
    title: "Walk-in Drives",
    description:
      "No online rounds — ever. Show up, meet employers face-to-face, and get hired on the spot. 185+ drives conducted monthly across cities.",
    badge: "Walk-in Only",
  },
];

const STATS = [
  {
    icon: TrendingUp,
    value: "500+",
    label: "Active Opportunities",
    desc: "Jobs & internships updated weekly",
  },
  {
    icon: Building2,
    value: "100+",
    label: "Partner Companies",
    desc: "From startups to enterprises",
  },
  {
    icon: UserCheck,
    value: "5,000+",
    label: "Candidates Placed",
    desc: "Across industries and roles",
  },
  {
    icon: MapPin,
    value: "Walk-in",
    label: "No Online Interviews",
    desc: "Meet employers face-to-face",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Register Free",
    desc: "Fill your profile in under 2 minutes — no fees, no complications.",
  },
  {
    step: "02",
    title: "Get Matched",
    desc: "We match you to the right jobs, internships, and walk-in drives.",
  },
  {
    step: "03",
    title: "Walk In",
    desc: "Show up at the venue and meet employers in person. No video calls.",
  },
  {
    step: "04",
    title: "Get Hired",
    desc: "Receive your offer letter the same day. Fast, simple, real.",
  },
];

const BENEFITS = [
  "100% walk-in format — no online barriers",
  "Zero application fees for all candidates",
  "Verified companies and genuine openings",
  "Dedicated support for fresh graduates",
  "Regular walk-in drives across cities",
  "Results within 48 hours of attending",
];

export function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary/6 via-background to-primary/10 py-16 lg:py-24"
        data-ocid="hero-section"
      >
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <Badge className="w-fit border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                🎓 India's Walk-in Career Platform
              </Badge>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Connecting{" "}
                <span className="relative inline-block text-primary">
                  Talent
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/30" />
                </span>{" "}
                with{" "}
                <span className="relative inline-block text-primary">
                  Opportunities
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/30" />
                </span>
              </h1>

              <p className="max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                Your launchpad to a successful career. Discover internships,
                jobs, and walk-in drives tailored for fresh graduates and job
                seekers — no online interviews, ever.
              </p>

              <div className="flex flex-wrap gap-3" data-ocid="hero-ctas">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 font-semibold transition-smooth"
                  data-ocid="hero-apply-cta"
                >
                  <Link to="/apply">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 font-semibold text-primary transition-smooth hover:bg-primary/8"
                  data-ocid="hero-interviews-cta"
                >
                  <Link to="/interviews">
                    <MapPin className="h-4 w-4" />
                    View Walk-in Drives
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  "No Online Interviews",
                  "Free Registration",
                  "Verified Companies",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 font-body text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="absolute inset-0 -m-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/4 blur-2xl" />
                <img
                  src="/assets/generated/hero-connect-illustration-transparent.dim_600x500.png"
                  alt="Young professionals connecting with career opportunities at CONNECT"
                  className="relative w-full drop-shadow-xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────── */}
      <section className="bg-primary" data-ocid="stats-section">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center gap-1"
                >
                  <Icon className="mb-1 h-5 w-5 text-primary-foreground/70" />
                  <span className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="font-display text-sm font-semibold text-primary-foreground">
                    {stat.label}
                  </span>
                  <span className="font-body text-xs text-primary-foreground/60">
                    {stat.desc}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About CONNECT ──────────────────────────────────────── */}
      <section
        className="bg-background py-16 lg:py-20"
        data-ocid="about-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 border border-primary/20 bg-primary/10 text-primary">
              About CONNECT
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built for India's Youth
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-muted-foreground">
              CONNECT was founded with one goal: to reduce unemployment by
              making career opportunities truly accessible. We partner with
              companies across industries to bring verified jobs and internships
              directly to you — no digital gatekeeping, no online screenings,
              just real face-to-face connections.
            </p>
            <p className="mt-3 font-body text-base leading-relaxed text-muted-foreground">
              Whether you're a fresh graduate chasing your first break or an
              experienced candidate seeking a better role, CONNECT is your
              launchpad to a successful and fulfilling career.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 gap-2 border-primary/30 text-primary transition-smooth hover:bg-primary/8"
            >
              <Link to="/about">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-16 lg:py-24"
        data-ocid="services-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Badge className="mb-4 border border-primary/20 bg-primary/10 text-primary">
              What We Offer
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Four Pathways to Your Career
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-muted-foreground">
              Designed to meet you wherever you are — whether you need a job, an
              internship, or a walk-in opportunity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card
                    className="h-full card-hover cursor-default border-border/60 bg-card shadow-subtle"
                    data-ocid={`service-card-${i}`}
                  >
                    <CardContent className="flex flex-col gap-4 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="border border-primary/20 bg-primary/8 text-xs text-primary"
                        >
                          {service.badge}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                          {service.title}
                        </h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="mt-auto w-fit gap-1 px-0 text-primary transition-smooth hover:bg-transparent hover:text-primary/80"
                      >
                        <Link to="/services">
                          Learn more <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button
              asChild
              variant="outline"
              className="gap-2 border-primary/30 text-primary transition-smooth hover:bg-primary/8"
            >
              <Link to="/services">
                Explore All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why CONNECT + How It Works ─────────────────────────── */}
      <section className="bg-background py-16 lg:py-24" data-ocid="why-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-5"
            >
              <Badge className="w-fit border border-primary/20 bg-primary/10 text-primary">
                The CONNECT Advantage
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Why Candidates Choose CONNECT
              </h2>
              <p className="font-body leading-relaxed text-muted-foreground">
                We believe every talented graduate deserves a fair shot. Our
                platform removes every digital barrier between you and the
                opportunity you deserve.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-start gap-2.5 font-body text-sm text-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="mt-2 w-fit gap-2 border-primary/30 text-primary transition-smooth hover:bg-primary/8"
              >
                <Link to="/about">
                  Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* How it works card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <Card className="border-border/60 bg-card shadow-elevated">
                <CardContent className="p-8">
                  <div className="mb-6 border-l-4 border-primary pl-4">
                    <p className="font-display text-lg font-semibold text-foreground">
                      How CONNECT Works
                    </p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      From registration to offer letter — here's the journey.
                    </p>
                  </div>
                  <div className="space-y-5">
                    {HOW_IT_WORKS.map((item, i) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.35 }}
                        className="flex items-start gap-4"
                      >
                        <span className="font-display text-2xl font-bold text-primary/25 leading-none">
                          {item.step}
                        </span>
                        <div>
                          <p className="font-display font-semibold text-foreground">
                            {item.title}
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="mt-6 w-full gap-2 font-semibold transition-smooth"
                    data-ocid="how-it-works-cta"
                  >
                    <Link to="/apply">
                      Start Today — It's Free{" "}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="bg-primary py-16" data-ocid="cta-banner">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to Walk Into Your Future?
            </h2>
            <p className="max-w-xl font-body text-lg leading-relaxed text-primary-foreground/80">
              Join thousands of graduates who found their footing through
              CONNECT. Register today — free, fast, and real.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary-foreground font-semibold text-primary transition-smooth hover:bg-primary-foreground/90"
                data-ocid="cta-banner-apply"
              >
                <Link to="/apply">
                  Apply Now — It's Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/40 font-semibold text-primary-foreground transition-smooth hover:bg-primary-foreground/10"
                data-ocid="cta-banner-interviews"
              >
                <Link to="/interviews">
                  <MapPin className="h-4 w-4" />
                  View Upcoming Drives
                </Link>
              </Button>
            </div>
            <p className="font-body text-sm text-primary-foreground/50">
              Free to register · No hidden fees · Walk-in drives every week
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
