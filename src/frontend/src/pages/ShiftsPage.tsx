import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  AlertCircle,
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useShiftJobs } from "../hooks/useShiftJobs";
import type { ShiftJob, ShiftType } from "../types/shifts";

// ── Shift type config ─────────────────────────────────────────────────────────
const SHIFT_CONFIG: Record<
  ShiftType,
  { label: string; badgeClass: string; icon: typeof Sunrise }
> = {
  Morning: {
    label: "Morning",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Sunrise,
  },
  Afternoon: {
    label: "Afternoon",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Sunset,
  },
  Night: {
    label: "Night",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Moon,
  },
};

type FilterOption = "All" | ShiftType;
const FILTER_OPTIONS: FilterOption[] = ["All", "Morning", "Afternoon", "Night"];

// ── Skeleton: mobile card ─────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-40 rounded" />
          <Skeleton className="h-5 w-20 rounded-full" />
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
        <Skeleton className="h-4 w-20 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20 rounded" />
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

// ── Shift badge ───────────────────────────────────────────────────────────────
function ShiftBadge({ shiftType }: { shiftType: ShiftType }) {
  const cfg = SHIFT_CONFIG[shiftType];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.badgeClass}`}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ── Shift job card (mobile / sm) ──────────────────────────────────────────────
function ShiftJobCard({ job, index }: { job: ShiftJob; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Card
        className="border-border card-hover border-l-4 border-l-primary h-full"
        data-ocid={`shift-card-${job.id}`}
      >
        <CardContent className="p-5 space-y-3 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground leading-snug min-w-0 truncate pt-1">
                {job.jobRole}
              </h3>
            </div>
            <div className="shrink-0">
              <ShiftBadge shiftType={job.shiftType} />
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span className="truncate font-medium">{job.company}</span>
          </div>

          {/* Shift times */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>
              {job.shiftStart} – {job.shiftEnd}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground flex-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary mt-0.5" />
            <span className="leading-relaxed">{job.location}</span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {job.description}
          </p>

          {/* Apply CTA */}
          <Link to="/apply">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 transition-smooth w-full sm:w-auto"
              data-ocid={`shift-apply-${job.id}`}
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
export function ShiftsPage() {
  const { data: jobs, isLoading } = useShiftJobs();
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const filtered = useMemo(() => {
    const source = (jobs ?? []).filter((j) => j.isActive);
    if (activeFilter === "All") return source;
    return source.filter((j) => j.shiftType === activeFilter);
  }, [jobs, activeFilter]);

  const hasResults = filtered.length > 0;

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        data-ocid="shifts-hero"
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
                <Clock className="w-3.5 h-3.5" />
                Shift-Based Hiring
              </Badge>
              <Badge
                variant="outline"
                className="border-amber-300 text-amber-700 text-xs"
              >
                Morning · Afternoon · Night
              </Badge>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              Shift-Based <span className="text-primary">Opportunities</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Roles designed for candidates who prefer to work{" "}
              <span className="text-foreground font-medium">
                specific shifts only
              </span>{" "}
              — morning, afternoon, or night. Find flexible work that fits your
              schedule.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-sm text-muted-foreground">
              {[
                "Choose your preferred shift",
                "Partial-day coverage roles",
                "Replacement & relief hiring",
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

      {/* ── Notice Bar ── */}
      <section className="bg-primary" data-ocid="shifts-notice-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-center">
            <div className="flex items-center gap-2 text-primary-foreground font-semibold text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Partial Shift Coverage
            </div>
            <span className="hidden sm:block w-px h-4 bg-primary-foreground/30" />
            <p className="text-primary-foreground/85 text-sm">
              These roles are specifically for{" "}
              <span className="font-semibold text-primary-foreground">
                partial shift coverage or replacement-based hiring
              </span>
              . Full-day availability is not required.
            </p>
          </div>
        </div>
      </section>

      {/* ── Listings ── */}
      <section
        className="bg-background py-10 lg:py-16"
        data-ocid="shifts-listings"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Filter row */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Shift type filters */}
            <div
              className="flex flex-wrap gap-2"
              data-ocid="shifts-filter-group"
            >
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setActiveFilter(opt)}
                  data-ocid={`shifts-filter-${opt.toLowerCase()}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    activeFilter === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {opt === "All" ? "All Shifts" : opt}
                </button>
              ))}
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
                    {filtered.length === 1 ? "opening" : "openings"}
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
              : filtered.map((job, i) => (
                  <ShiftJobCard key={job.id.toString()} job={job} index={i} />
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
                  <TableHead className="font-display font-semibold text-foreground w-32">
                    Shift Type
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-28">
                    Start Time
                  </TableHead>
                  <TableHead className="font-display font-semibold text-foreground w-28">
                    End Time
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
                  : filtered.map((job, i) => (
                      <motion.tr
                        key={job.id.toString()}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-150"
                        data-ocid={`shift-row-${job.id}`}
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-sm text-foreground border-l-2 border-primary pl-2 leading-snug">
                              {job.jobRole}
                            </p>
                            <Badge className="bg-primary/8 text-primary border-0 text-xs">
                              Shift Role
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate max-w-[130px] font-medium">
                              {job.company}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ShiftBadge shiftType={job.shiftType} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{job.shiftStart}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{job.shiftEnd}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-1.5 text-sm text-muted-foreground max-w-xs">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug">{job.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to="/apply">
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1 transition-smooth text-xs"
                              data-ocid={`shift-table-apply-${job.id}`}
                            >
                              Apply Now
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </Link>
                        </TableCell>
                      </motion.tr>
                    ))}
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
              data-ocid="shifts-empty-state"
            >
              <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                {activeFilter !== "All"
                  ? `No ${activeFilter} shift openings right now`
                  : "No shift openings available right now"}
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                {activeFilter !== "All"
                  ? `There are no active ${activeFilter.toLowerCase()} shift roles at the moment. Try a different shift filter.`
                  : "New shift-based roles are added frequently. Register to get notified when new shifts open up."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-1">
                {activeFilter !== "All" && (
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/8"
                    onClick={() => setActiveFilter("All")}
                    data-ocid="shifts-clear-filter"
                  >
                    Show All Shifts
                  </Button>
                )}
                <Link to="/apply">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-smooth"
                    data-ocid="shifts-empty-apply"
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

      {/* ── Shift Types Info ── */}
      <section
        className="bg-muted/30 py-12 lg:py-16"
        data-ocid="shifts-info-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Available Shift Types
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Select a role that fits your daily availability — no full-day
              commitment required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {(
              [
                {
                  type: "Morning" as ShiftType,
                  icon: Sunrise,
                  time: "6:00 AM – 12:00 PM",
                  desc: "Ideal for candidates free in the morning. Common in retail, logistics, and support roles.",
                  color: "bg-amber-50 border-amber-200",
                  iconColor: "text-amber-600",
                  iconBg: "bg-amber-100",
                },
                {
                  type: "Afternoon" as ShiftType,
                  icon: Sunset,
                  time: "12:00 PM – 8:00 PM",
                  desc: "Perfect for students with morning classes or those with evening availability constraints.",
                  color: "bg-blue-50 border-blue-200",
                  iconColor: "text-blue-600",
                  iconBg: "bg-blue-100",
                },
                {
                  type: "Night" as ShiftType,
                  icon: Moon,
                  time: "8:00 PM – 6:00 AM",
                  desc: "Higher pay rates. Suits candidates who prefer working overnight in manufacturing, security, or BPO.",
                  color: "bg-indigo-50 border-indigo-200",
                  iconColor: "text-indigo-600",
                  iconBg: "bg-indigo-100",
                },
              ] as const
            ).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Card className={`border h-full card-hover ${item.color}`}>
                    <CardContent className="p-5 space-y-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg}`}
                      >
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm text-foreground">
                          {item.type} Shift
                        </h3>
                        <p
                          className={`text-xs font-medium mt-0.5 ${item.iconColor}`}
                        >
                          {item.time}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
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
      <section className="bg-primary py-12" data-ocid="shifts-cta-banner">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground">
            Ready to Work Your Preferred Shift?
          </h2>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Register your profile and we'll match you with shift openings that
            fit your schedule — morning, afternoon, or night.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-1">
            <Link to="/apply">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold gap-2 transition-smooth"
                data-ocid="shifts-cta-apply"
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
