import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "saran120607@gmail.com",
    href: "mailto:saran120607@gmail.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 8248252180",
    href: "tel:+918248252180",
    description: "Mon–Sat, 9 AM – 6 PM IST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Opportunity Street, Bangalore, Karnataka 560001",
    href: "https://maps.google.com/?q=123+Opportunity+Street+Bangalore+Karnataka+560001",
    description: "Walk-in interviews by schedule",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com",
    hoverClass: "hover:text-primary hover:border-primary/30",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com",
    hoverClass: "hover:text-primary hover:border-primary/30",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    hoverClass: "hover:text-primary hover:border-primary/30",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com",
    hoverClass: "hover:text-foreground hover:border-border",
  },
];

const OFFICE_HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM", open: true },
  { day: "Saturday", time: "10:00 AM – 2:00 PM", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    reset();
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="bg-primary text-primary-foreground py-16 md:py-24"
        data-ocid="contact-hero"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-display font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Have questions about internships, job listings, or walk-in drives?
              Our team is here to help you take the next step in your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-background py-14" data-ocid="contact-info-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="h-full border-border card-hover shadow-subtle">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground hover:text-primary transition-colors duration-200 break-words"
                        data-ocid={`contact-info-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {item.value}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Side Panel */}
      <section className="bg-muted/30 py-14" data-ocid="contact-form-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-elevated border-border">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground text-sm mb-7">
                    Fill in the form and we'll get back to you as soon as
                    possible.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                      data-ocid="contact-success-state"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                          Thank you for reaching out. Our team will respond
                          within 24 hours.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        data-ocid="contact-send-another-btn"
                        className="mt-2"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-5"
                      data-ocid="contact-form"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">
                            Full Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Rahul Sharma"
                            data-ocid="contact-name-input"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email">
                            Email Address{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="rahul@email.com"
                            data-ocid="contact-email-input"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                            })}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="subject">
                          Subject <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Inquiry about internship opportunities"
                          data-ocid="contact-subject-input"
                          {...register("subject", {
                            required: "Subject is required",
                          })}
                          className={errors.subject ? "border-destructive" : ""}
                        />
                        {errors.subject && (
                          <p className="text-xs text-destructive">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="Write your message here..."
                          data-ocid="contact-message-input"
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 20,
                              message: "Message must be at least 20 characters",
                            },
                          })}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-xs text-destructive">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 font-semibold"
                        data-ocid="contact-submit-btn"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Side: Hours + Social + Note */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Office Hours */}
              <Card className="shadow-subtle border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground">
                      Office Hours
                    </h3>
                  </div>
                  <ul className="space-y-0">
                    {OFFICE_HOURS.map((row) => (
                      <li
                        key={row.day}
                        className="flex justify-between items-center text-sm border-b border-border py-3 last:border-0"
                      >
                        <span className="text-foreground font-medium">
                          {row.day}
                        </span>
                        <span
                          className={
                            row.open
                              ? "text-primary font-semibold"
                              : "text-destructive font-semibold"
                          }
                        >
                          {row.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/15">
                    <p className="text-xs text-primary font-medium leading-relaxed">
                      Walk-in candidates are welcome anytime during office hours
                      — no appointment needed.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-subtle border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    Follow Us
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Stay updated with the latest opportunities and news.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid={`social-link-${social.label.toLowerCase().split(/[\s/]/)[0]}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-background hover:bg-muted/40 transition-smooth text-foreground ${social.hoverClass}`}
                      >
                        <social.icon className="w-5 h-5 shrink-0" />
                        <span className="text-sm font-medium truncate">
                          {social.label.split(" /")[0]}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Walk-in note */}
              <div className="border-l-2 border-primary pl-4 py-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">
                    Walk-in only:
                  </span>{" "}
                  All interviews at CONNECT are conducted as in-person walk-ins.
                  We do not conduct online interviews.{" "}
                  <Link
                    to="/interviews"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    View upcoming drives →
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Banner */}
      <section
        className="bg-background py-10"
        data-ocid="contact-location-banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl bg-primary/5 border border-primary/15 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg mb-1">
                  Our Office Location
                </h3>
                <p className="text-muted-foreground text-sm">
                  123 Opportunity Street, Bangalore, Karnataka 560001, India
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://maps.google.com/?q=123+Opportunity+Street+Bangalore+Karnataka+560001"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact-directions-btn"
              >
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </a>
              <Link to="/apply" data-ocid="contact-apply-cta">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
