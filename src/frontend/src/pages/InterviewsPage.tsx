import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useInterviews } from "../hooks/useInterviews";
import type { Interview } from "../types";

// ── Walk-in prep tips ─────────────────────────────────────────────────────────
const WALKIN_TIPS = [
  {
    icon: FileText,
    title: "Bring Multiple Copies",
    body: "Carry at least 3 printed copies of your resume. Interviewers often keep one on file.",
  },
  {
    icon: GraduationCap,
    title: "Education Documents",
    body: "Bring originals and photocopies of degree certificates, marksheets, and ID proof.",
  },
  {
    icon: Clock,
    title: "Arrive Early",
    body: "Reach the venue 15–20 minutes before the listed time to complete registration formalities.",
  },
  {
    icon: Users,
    title: "Dress Professionally",
    body: "Smart-casual or business attire makes a strong first impression at walk-in drives.",
  },
];

// ── Skeleton: mobile card ─────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-40 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-32 rounded" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
          <Skeleton className="h-3.5 w-3/4 rounded" />
        </div>
        <Skeleton className="h-9 w-28 rounded-md mt-1" />
      </CardContent>
    </Card>
  );
}

// ── Skeleton: desktop table row ───────────────────────────────────────────────
function RowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-36 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-44 rounded" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-8 w-24 rounded-md ml-auto" />
      </TableCell>
    </TableRow>
  );
}

// ── Interview card (mobile / sm) ──────────────────────────────────────────────
function InterviewCard({
  interview,
  index,
}: {
  interview: Interview;
  index: number;
}) {
  const formattedDate = new Date(interview.date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Card
        className="border-border card-hover border-l-4 border-l-primary h-full"
        data-ocid={`interview-card-${interview.id}`}
      >
        <CardContent className="p-5 space-y-3 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground leading-snug min-w-0 truncate pt-1">
                {interview.jobRole}
              </h3>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs shrink-0">
              Walk-in
            </Badge>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span className="truncate font-medium">{interview.company}</span>
          </div>

          {/* Meta */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
              <span>{interview.time}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-primary mt-0.5" />
              <span className="leading-relaxed">{interview.location}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {interview.description}
          </p>

          {/* Apply CTA */}
          <Link
            to="/job-apply"
            search={{ interviewId: interview.id.toString() }}
          >
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 transition-smooth w-full sm:w-auto"
              data-ocid={`interview-apply-${interview.id}`}
            >
              Apply Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function InterviewsPage() {
  const { data: interviews, isLoading } = useInterviews();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const source = (interviews ?? []).filter((i) => i.isActive);
    const q = searchQuery.toLowerCase().trim();
    if (!q) return source;
    return source.filter(
      (i) =>
        i.jobRole.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q),
    );
  }, [interviews, searchQuery]);

  const hasResults = filtered.length > 0;

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        data-ocid="interviews-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/8 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-2xl space-y-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1 text-sm gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Walk-in Only Drives
              </Badge>
              <Badge
                variant="outline"
                className="border-primary/20 text-primary text-xs"
              >
                No Online Interviews
              </Badge>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              Walk-in <span className="text-primary">Interviews</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every opportunity here is a{" "}
              <span className="text-foreground font-medium">
                walk-in interview
              </span>{" "}
              — no online rounds, no video calls, no technical screens. Show up,
              introduce yourself, and land the role.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-sm text-muted-foreground">
              {[
                "Show up in person",
                "Carry your resume & certificates",
                "Arrive 15 mins early",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Walk-in Notice Bar ── */}
      <section className="bg-primary" data-ocid="walkin-notice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-center">
            <div className="flex items-center gap-2 text-primary-foreground font-semibold text-sm">
              <Users className="w-4 h-4 shrink-0" />
              100% Walk-in Format
            </div>
            <span className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
            <p className="text-primary-foreground/85 text-sm">
              All interviews are conducted in-person at the listed venue. Online
              or remote interviews are not available on this platform.
            </p>
          </div>
        </div>
      </section>

      {/* ── Listings ── */}
      <section
        className="bg-background py-10 lg:py-16"
        data-ocid="interviews-listings"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Filter row */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div
              className="relative w-full sm:max-w-sm"
              data-ocid="interviews-search"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by job role or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-input focus-visible:ring-primary/40"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="secondary" className="text-xs">
                Updated daily
              </Badge>
              <span className="text-sm text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="h-4 w-20 rounded inline-block" />
                ) : (
                  <>
                    <span className="font-semibold text-foreground">
                      {filtered.length}
                    </span>{" "}
                    {filtered.length === 1 ? "drive" : "drives"}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Mobile: card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {isLoading
              ? Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((k) => (
                  <CardSkeleton key={k} />
                ))
              : filtered.map((iv, i) => (
                  <InterviewCard
                    key={iv.id.toString()}
                    interview={iv}
                    index={i}
                  />
                ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden lg:block rounded-xl border border-border overflow-hidden shadow-subtle">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-display font-semibold text-foreground w-52">
                    Job Role
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-44">
                    Company
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-36">
                    Date
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-40">
                    Time
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground">
                    Location
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-32 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }, (_, i) => `skr-${i}`).map((k) => (
                      <RowSkeleton key={k} />
                    ))
                  : filtered.map((iv, i) => {
                      const formattedDate = new Date(
                        iv.date,
                      ).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      });
                      return (
                        <motion.tr
                          key={iv.id.toString()}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.04, duration: 0.35 }}
                          className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                          data-ocid={`interview-row-${iv.id}`}
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-semibold text-sm text-foreground border-l-2 border-primary pl-2 leading-snug">
                                {iv.jobRole}
                              </p>
                              <Badge className="bg-primary/8 text-primary border-0 text-xs">
                                Walk-in
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="truncate max-w-[130px] font-medium">
                                {iv.company}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span>{formattedDate}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span>{iv.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-start gap-1.5 text-sm text-muted-foreground max-w-xs">
                              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span className="leading-snug">
                                {iv.location}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link
                              to="/job-apply"
                              search={{ interviewId: iv.id.toString() }}
                            >
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1 transition-smooth text-xs"
                                data-ocid={`interview-table-apply-${iv.id}`}
                              >
                                Apply Now
                                <ArrowRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
              </TableBody>
            </Table>
          </div>

          {/* Empty state */}
          {!isLoading && !hasResults && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 space-y-4"
              data-ocid="interviews-empty-state"
            >
              <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                {searchQuery
                  ? "No matching interviews found"
                  : "No interviews available right now"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {searchQuery
                  ? `We couldn't find any drives matching "${searchQuery}". Try a different search term.`
                  : "New walk-in drives are added frequently. Register to get notified."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-1">
                {searchQuery && (
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/8"
                    onClick={() => setSearchQuery("")}
                    data-ocid="interviews-clear-search"
                  >
                    Clear Search
                  </Button>
                )}
                <Link to="/apply">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-smooth"
                    data-ocid="interviews-empty-apply"
                  >
                    Register &amp; Get Notified
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Preparation Tips ── */}
      <section className="bg-muted/30 py-12 lg:py-16" data-ocid="walkin-tips">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Before You Walk In
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Prepare well and make the most of your walk-in opportunity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WALKIN_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Card className="border-border h-full card-hover">
                    <CardContent className="p-5 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-sm text-foreground">
                        {tip.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tip.body}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary py-12" data-ocid="interviews-cta-banner">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground">
            Don't See the Right Role?
          </h2>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Register your profile and we'll match you with upcoming walk-in
            drives that fit your skills and qualifications.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-1">
            <Link to="/apply">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold gap-2 transition-smooth"
                data-ocid="interviews-cta-apply"
              >
                Register Now — It's Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
