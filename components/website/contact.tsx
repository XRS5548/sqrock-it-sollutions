"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, PhoneCall, Puzzle, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactCTASection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const features = [
    {
      icon: Zap,
      text: "Fast Response",
      description: "Get initial response within 24 hours",
      color: "from-yellow-500 to-orange-500",
      gradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: PhoneCall,
      text: "Free Consultation",
      description: "30-minute discovery call at no cost",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Puzzle,
      text: "Custom Solutions",
      description: "Tailored specifically for your needs",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
  ];

  const validateForm = () => {
    const newErrors = { name: "", email: "", service: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (minimum 10 characters)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending your quote request...");

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: "", // Optional field
          budget: "Not specified", // Default value
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.dismiss(toastId);
        toast.success("Quote Request Sent!", {
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          service: "",
          message: "",
        });
        setErrors({ name: "", email: "", service: "", message: "" });
      } else {
        throw new Error(data.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.dismiss(toastId);
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tell us about your project and we&apos;ll get back to you quickly
              </p>
            </motion.div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className="flex items-start gap-4 group"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                    />
                    <div
                      className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{feature.text}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                Ready to start your digital transformation? Fill out the form and let&apos;s discuss your vision.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm">No commitment required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-sm">100% confidential</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form Card */}
          <motion.div variants={cardVariants}>
            <Card className="relative bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden group">
              {/* Animated border effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary animate-gradient-x" />
              
              {/* Background gradient effects */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/5 group-hover:to-primary/10 transition-all duration-500" />

              <CardContent className="relative z-10 p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Get Your Free Quote</h3>
                  <p className="text-muted-foreground">Fill out the form below and we&apos;ll get in touch</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        className={`bg-background/50 border-border/50 ${errors.name ? "border-red-500" : ""}`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        className={`bg-background/50 border-border/50 ${errors.email ? "border-red-500" : ""}`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Select
                        value={formData.service}
                        onValueChange={handleSelectChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className={`bg-background/50 border-border/50 w-full ${errors.service ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Project Type *" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website Development">Website Development</SelectItem>
                          <SelectItem value="Web Application">Web Application</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                          <SelectItem value="Custom Software">Custom Software</SelectItem>
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-sm text-red-500">{errors.service}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project... *"
                        className={`min-h-[120px] bg-background/50 border-border/50 ${errors.message ? "border-red-500" : ""}`}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Minimum 10 characters. Please include project goals, timeline, and requirements.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary py-6 text-lg shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Get Free Quote
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to our privacy policy. We&apos;ll contact you within 24 hours.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Need immediate assistance?{" "}
                    <a href="mailto:contact@sqrock.com" className="text-primary hover:underline">
                      contact@sqrock.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactCTASection;