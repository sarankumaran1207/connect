import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  Heart,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Heart,
    title: "Youth First",
    description:
      "Every decision we make is rooted in what's best for fresh graduates and job seekers. We advocate tirelessly for the next generation of professionals.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "We provide honest, clear information about every opportunity — no hidden fees, no misleading listings. What you see is what you get.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "CONNECT thrives on the strength of its network. We bring employers and talent together, building a community where growth is mutual.",
  },
  {
    icon: Zap,
    title: "Action Oriented",
    description:
      "We believe in real, tangible results. Our walk-in interview model removes friction and gets you face-to-face with employers faster.",
  },
];

const STATS = [
  { value: "2,400+", label: "Candidates Placed" },
  { value: "320+", label: "Partner Companies" },
  { value: "185+", label: "Walk-in Drives" },
  { value: "94%", label: "Satisfaction Rate" },
];

const MISSION_POINTS = [
  "Provide internships with and without stipend",
  "Create job opportunities for unemployed youth",
  "Host walk-in interview drives every month",
  "Free registration and career guidance for all",
];

const VISION_POINTS = [
  "Reduce youth unemployment by 30% in 5 years",
  "Expand to 50+ cities across India",
  "Partner with 5,000+ verified employers",
  "Build India's largest walk-in drive network",
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden"
        data-ocid="about-hero"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 75% 40%, oklch(0.75 0.18 260 / 0.6), transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl space-y-5"
          >
            <div className="flex items-center gap-2 text-sm font-display font-semibold tracking-widest uppercase opacity-70">
              <span className="w-6 h-0.5 bg-primary-foreground inline-block" />
              Our Story
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight">
              About CONNECT
            </h1>
            <p className="text-lg sm:text-xl opacity-85 leading-relaxed">
              We bridge the gap between ambitious young talent and the companies
              that need them most — one walk-in drive at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="py-8 px-6 text-center"
              >
                <div className="text-3xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="bg-background py-16 lg:py-20"
        data-ocid="mission-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-border overflow-hidden">
                <div className="h-1.5 bg-primary w-full" />
                <CardContent className="p-8 space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-primary uppercase tracking-wider mb-2">
                      Our Mission
                    </p>
                    <h2 className="font-display font-bold text-2xl text-foreground leading-snug">
                      Helping youth get real-world opportunities
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    At CONNECT, our mission is simple: give every degree-holding
                    individual a genuine shot at a meaningful career. We believe
                    that talent is abundant, but access to opportunity is not
                    equally distributed. We partner with companies across
                    industries to source internships and entry-level roles,
                    making them radically accessible through our walk-in
                    interview model — no lengthy online processes, no ghosting,
                    just real conversations.
                  </p>
                  <ul className="space-y-2.5 pt-1">
                    {MISSION_POINTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-border overflow-hidden">
                <div className="h-1.5 bg-secondary w-full" />
                <CardContent className="p-8 space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-semibold text-primary uppercase tracking-wider mb-2">
                      Our Vision
                    </p>
                    <h2 className="font-display font-bold text-2xl text-foreground leading-snug">
                      Reduce unemployment by connecting people to jobs
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We envision a future where the unemployment rate among
                    educated youth is near zero — not because there aren't
                    enough jobs, but because the right tools exist to connect
                    talent with employers efficiently. CONNECT is building that
                    future by scaling walk-in drives across cities, deepening
                    employer partnerships, and ensuring that every registered
                    candidate is visible to companies actively hiring.
                  </p>
                  <ul className="space-y-2.5 pt-1">
                    {VISION_POINTS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section
        className="bg-muted/30 border-y border-border py-16 lg:py-20"
        data-ocid="story-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-xs font-display font-semibold text-primary uppercase tracking-wider">
                Our Story
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
                Why we started CONNECT
              </h2>
              <div className="border-l-2 border-primary pl-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CONNECT was born from a frustration that many of us
                  experienced firsthand. Despite having degrees, skills, and the
                  drive to succeed, countless graduates found themselves stuck —
                  sending hundreds of applications into the void, waiting weeks
                  for responses that never came.
                </p>
                <p>
                  The gap between talent and opportunity wasn't a skills problem
                  — it was a connection problem. Employers struggled to find
                  motivated, qualified candidates, while those same candidates
                  struggled to get a foot in the door. The system was broken for
                  both sides.
                </p>
                <p>
                  So we built CONNECT to fix it. We created a platform where
                  face-to-face interactions — real conversations between real
                  people — replace the impersonal digital filtering that leaves
                  great candidates invisible. Walk-in interviews are our
                  cornerstone because they level the playing field. Your
                  personality, your enthusiasm, and your drive can speak for
                  themselves.
                </p>
                <p>
                  Today, CONNECT has helped thousands of young professionals
                  take their first steps into meaningful careers. Every
                  placement fuels our conviction that when you genuinely connect
                  talent with opportunity, everyone wins.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-2xl bg-card border border-border p-8 space-y-6 shadow-subtle">
                <blockquote className="text-foreground font-display font-semibold text-lg leading-snug">
                  "A world where no qualified candidate goes unemployed simply
                  because they lacked the right connection."
                </blockquote>
                <p className="text-sm text-muted-foreground border-t border-border pt-4">
                  — The CONNECT founding team
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {[
                    { label: "Cities Active", value: "12" },
                    { label: "Industries", value: "18+" },
                    { label: "Monthly Drives", value: "40+" },
                    { label: "Avg. Time to Hire", value: "7 days" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="bg-background rounded-lg p-3 text-center border border-border"
                    >
                      <div className="text-xl font-display font-bold text-primary">
                        {m.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="bg-background py-16 lg:py-20"
        data-ocid="values-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 mb-12"
          >
            <p className="text-xs font-display font-semibold text-primary uppercase tracking-wider">
              What Drives Us
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These aren't just words — they're the principles that guide every
              product decision, every employer partnership, and every
              interaction we have with candidates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full border-border card-hover">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-base text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-20" data-ocid="about-cta">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-5">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground">
            Ready to take your next step?
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Join thousands of candidates who found their career path through
            CONNECT. Register today and get matched with opportunities that fit
            your profile.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link to="/apply">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-display font-semibold gap-2 transition-smooth"
                data-ocid="about-cta-apply"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-display font-semibold transition-smooth"
                data-ocid="about-cta-services"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
