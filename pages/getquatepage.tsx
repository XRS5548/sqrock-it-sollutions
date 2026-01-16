"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Send, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  DollarSign, 
  MessageSquare,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const GetQuotePage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const services = [
    "Website Development",
    "Web Application",
    "Mobile App Development",
    "UI/UX Design",
    "SEO & Digital Marketing",
    "Custom Software Solution",
    "E-commerce Development",
    "Maintenance & Support",
  ];

  const budgetOptions = [
    "Below ₹5,000",
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "Above ₹1,00,000",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: "",
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Please select a service";
      isValid = false;
    }

    // Budget validation
    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Project details are required";
      isValid = false;
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please provide more details (minimum 20 characters)";
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
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user selects an option
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please fill all required fields correctly",
      });
      return;
    }

    setIsLoading(true);

    // Show loading toast
    const toastId = toast.loading("Submitting your quote request...");

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        
        // Dismiss loading toast and show success
        toast.dismiss(toastId);
        toast.success("Quote Request Sent!", {
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
        
        // Redirect to thank you page after 3 seconds
        setTimeout(() => {
          router.push('/thank-you');
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Dismiss loading toast and show error
      toast.dismiss(toastId);
      toast.error("Submission Failed", {
        description: error instanceof Error ? error.message : "Please try again later",
      });
    } finally {
      setIsLoading(false);
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

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Get a Free Quote
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Tell us about your project and we&apos;ll get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Card */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants as Variants}
              initial="hidden"
              animate="visible"
            >
              <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'}`}>
                <CardHeader className="pb-6">
                  <CardTitle className={`text-2xl flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Briefcase className="h-6 w-6 text-primary" />
                    Project Details
                  </CardTitle>
                  <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Fill in the form below and we&apos;ll prepare a custom quote for you
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-4">Quote Request Submitted!</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Thank you for your interest. Our team will review your requirements 
                        and get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Submit Another Request
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information Section */}
                      <motion.div variants={itemVariants as Variants} className="space-y-4">
                        <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          <User className="h-5 w-5 text-primary" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Full Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className={errors.name ? "border-red-500" : ""}
                              disabled={isLoading}
                            />
                            {errors.name && (
                              <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              className={errors.email ? "border-red-500" : ""}
                              disabled={isLoading}
                            />
                            {errors.email && (
                              <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="9876543210"
                            className={errors.phone ? "border-red-500" : ""}
                            disabled={isLoading}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone}</p>
                          )}
                        </div>
                      </motion.div>

                      <Separator className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

                      {/* Project Details Section */}
                      <motion.div variants={itemVariants as Variants} className="space-y-4">
                        <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                          <Briefcase className="h-5 w-5 text-primary" />
                          Project Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="service" className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              Service Required *
                            </Label>
                            <Select
                              value={formData.service}
                              onValueChange={(value) => handleSelectChange("service", value)}
                              disabled={isLoading}
                            >
                              <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.service && (
                              <p className="text-sm text-red-500">{errors.service}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="budget" className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Budget Range *
                            </Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleSelectChange("budget", value)}
                              disabled={isLoading}
                            >
                              <SelectTrigger className={errors.budget ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                {budgetOptions.map((budget) => (
                                  <SelectItem key={budget} value={budget}>
                                    {budget}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.budget && (
                              <p className="text-sm text-red-500">{errors.budget}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Project Details *
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Describe your project requirements, goals, timeline, and any specific features you need..."
                            className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                            disabled={isLoading}
                          />
                          {errors.message && (
                            <p className="text-sm text-red-500">{errors.message}</p>
                          )}
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Minimum 20 characters. Please be as detailed as possible.
                          </p>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants as Variants}>
                        <Button
                          type="submit"
                          className="w-full py-6 text-base font-semibold group"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Request Quote
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>

                        <div className={`mt-4 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center justify-center gap-2`}>
                          <Shield className="h-4 w-4" />
                          No spam. Your information is 100% secure.
                        </div>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Side Info Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className={`sticky top-6 border-0 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-b from-blue-900/20 to-purple-900/20 backdrop-blur-sm' : 'bg-gradient-to-b from-blue-50 to-purple-50'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Send className="h-6 w-6 text-primary" />
                    Why Choose Us?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">24-Hour Response</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          We guarantee a response within 24 hours of your submission.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Transparent Pricing</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          No hidden costs. Detailed breakdown included in every quote.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                        <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Expert Consultation</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Free consultation session to understand your requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

                  <div className="space-y-4">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a 
                            href="mailto:contact@sqrock.com" 
                            className={`text-sm hover:text-primary transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                          >
                            contact@sqrock.com
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a 
                            href="tel:+911234567890" 
                            className={`text-sm hover:text-primary transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                          >
                            +91 12345 67890
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                    <h4 className="font-semibold mb-2">What Happens Next?</h4>
                    <ol className={`space-y-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs">
                          1
                        </span>
                        <span>Submit your requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs">
                          2
                        </span>
                        <span>We review and prepare a custom quote</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs">
                          3
                        </span>
                        <span>Schedule a free consultation call</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs">
                          4
                        </span>
                        <span>Project kickoff after approval</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuotePage;