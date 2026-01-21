"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Zap,
  Headphones,
  Target,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const contactInfo = [
  {
    id: 1,
    title: "Email",
    content: "sqrock.business@outlook.com",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
    href: "mailto:sqrock.business@outlook.com",
  },
  {
    id: 2,
    title: "Phone",
    content: "+91 63786 95548",
    icon: Phone,
    color: "from-green-500 to-emerald-500",
    href: "tel:+916378695548",
  },
  {
    id: 3,
    title: "Location",
    content: "India",
    icon: MapPin,
    color: "from-purple-500 to-pink-500",
    href: "#location",
  },
  {
    id: 4,
    title: "Working Hours",
    content: "Mon – Sat | 10 AM – 7 PM",
    icon: Clock,
    color: "from-orange-500 to-yellow-500",
  },
];

const bulletPoints = [
  {
    icon: Zap,
    text: "Fast response within 24 hours",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Headphones,
    text: "Free 30-minute consultation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    text: "Custom solutions for your needs",
    color: "from-purple-500 to-pink-500",
  },
];

const ContactPage = () => {
  const refs = {
    hero: useRef(null),
    info: useRef(null),
    form: useRef(null),
    map: useRef(null),
    cta: useRef(null),
  };

  const inViews = {
    hero: useInView(refs.hero, { once: true }),
    info: useInView(refs.info, { once: true, amount: 0.2 }),
    form: useInView(refs.form, { once: true, amount: 0.2 }),
    map: useInView(refs.map, { once: true, amount: 0.2 }),
    cta: useInView(refs.cta, { once: true, amount: 0.2 }),
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In the ContactPage component, update the handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Get form data from form elements or state
  const form = e.currentTarget as HTMLFormElement;
const formData = {
  name: (form.querySelector('input[type="text"]') as HTMLInputElement)?.value || "",
  email: (form.querySelector('input[type="email"]') as HTMLInputElement)?.value || "",
  phone: (form.querySelector('input[type="tel"]') as HTMLInputElement)?.value || "",
  service:
    (form.querySelector('[data-select="service"]') as HTMLInputElement)?.value ||
    "Other",
  message:
    (form.querySelector("textarea") as HTMLTextAreaElement)?.value || "",
};

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setIsSubmitted(true);
      // Reset form
      form.currentTarget.reset();
    } else {
      throw new Error(data.message || 'Failed to submit contact form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Show error toast/message
  } finally {
    setIsSubmitting(false);
  }
};
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Contact Hero Section */}
      <section
        ref={refs.hero}
        className="relative py-24 bg-gradient-to-br from-background via-background to-primary/10"
      >
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              Contact SQROCK
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's discuss your project and bring your ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Information Section */}
      <section ref={refs.info} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inViews.info ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info) => (
              <motion.div key={info.id} variants={itemVariants as Variants}>
                <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}>
                        <info.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Contact Form Section */}
      <section ref={refs.form} className="py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inViews.form ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Tell us about your{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  project
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Share your requirements and we'll get back to you with a customized solution
              </p>

              <div className="space-y-6">
                {bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inViews.form ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${point.color} flex-shrink-0`}>
                      <point.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-muted-foreground">{point.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inViews.form ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-border/50"
              >
                <p className="text-sm text-muted-foreground">
                  We respect your privacy. Your information is secure and will never be shared.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inViews.form ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="relative bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
                
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />

                <CardContent className="relative z-10 p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="w-full"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-2">Contact Form</h3>
                      <p className="text-muted-foreground mb-8">Fill out the form below</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Input
                              type="text"
                              placeholder="Full Name"
                              required
                              className="bg-background/50 border-border/50"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <Input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="bg-background/50 border-border/50"
                              />
                            </div>
                            <div>
                              <Input
                                type="tel"
                                placeholder="Phone Number"
                                className="bg-background/50 border-border/50"
                              />
                            </div>
                          </div>

                          <div>
                            <Select>
                              <SelectTrigger className="bg-background/50 border-border/50">
                                <SelectValue placeholder="Service Interested In" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web">Web Development</SelectItem>
                                <SelectItem value="mobile">Mobile App Development</SelectItem>
                                <SelectItem value="design">UI/UX Design</SelectItem>
                                <SelectItem value="software">Custom Software</SelectItem>
                                <SelectItem value="cloud">Cloud & DevOps</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Textarea
                              placeholder="Tell us about your project..."
                              required
                              className="min-h-[140px] bg-background/50 border-border/50"
                            />
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 text-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-5 w-5" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>

                      <div className="mt-6 pt-6 border-t border-border/50 text-center">
                        <p className="text-xs text-muted-foreground">
                          We'll respond within 24 hours. No spam, ever.
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Map / Location Section */}
    {/* 4. Map / Location Section - Simple Version */}
<section ref={refs.map} className="py-24 bg-background">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inViews.map ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        Find Us Here
      </h2>
      <p className="text-lg text-muted-foreground">
        Visit us or connect online for your IT solutions
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={inViews.map ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      <Card className="bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d274.9448347669966!2d75.94065536052311!3d26.353825813410754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1769016493068!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SQROCK IT Solutions Location"
            />
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80">
              <Card className="bg-background/95 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    SQROCK IT Solutions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jaipur, Rajasthan, India
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <a 
                      href="https://maps.google.com/?q=26.353825813410754,75.94065536052311"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Google Maps
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
</section>









      

      {/* 5. Final CTA Section */}
      <section ref={refs.cta} className="py-24 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inViews.cta ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Partner with SQROCK IT Solutions today
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="px-10 py-6 text-lg">
                <Link href="#form">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;