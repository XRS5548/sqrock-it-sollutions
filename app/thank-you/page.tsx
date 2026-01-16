"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowRight, 
  FileText, 
  Users,
  Home,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const ThankYouPage = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    setMounted(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSteps = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Review Your Request",
      description: "Our team is reviewing your project requirements",
      time: "Within 1 hour",
      status: "pending",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Receive Initial Quote",
      description: "We'll email you a detailed quote and proposal",
      time: "Within 4 hours",
      status: "pending",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Schedule Consultation",
      description: "Book a free 30-minute call with our experts",
      time: "Within 12 hours",
      status: "pending",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Project Kickoff",
      description: "Start your project with our development team",
      time: "Within 24 hours",
      status: "pending",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "contact@sqrock.com",
      link: "mailto:contact@sqrock.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+91 12345 67890",
      link: "tel:+911234567890",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      value: "Within 24 hours",
      link: null,
    },
  ];

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

  const checkmarkVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      }
    },
    hover: { scale: 1.1, rotate: 5 }
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            variants={checkmarkVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="inline-block mb-6"
          >
            <div className={`relative ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'} rounded-full p-6`}>
              <CheckCircle className="h-24 w-24 text-green-500" />
              <div className="absolute inset-0 animate-ping bg-green-500/20 rounded-full"></div>
            </div>
          </motion.div>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Thank You for Your Quote Request!
          </h1>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            We&apos;ve received your request and our team is already working on it.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-lg font-bold">{formatTime(countdown)}</span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>until first response</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Next Steps */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'} mb-8`}>
                <CardHeader className="pb-6">
                  <CardTitle className={`text-2xl flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Calendar className="h-6 w-6 text-primary" />
                    What Happens Next?
                  </CardTitle>
                  <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Follow our process to get your project started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {nextSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4"
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === 'dark' 
                            ? 'bg-gray-700/50' 
                            : 'bg-gray-100'
                        }`}>
                          <div className={`p-2 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {step.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {step.title}
                            </h3>
                            <Badge variant="outline" className="font-normal">
                              {step.time}
                            </Badge>
                          </div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step.description}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                      </motion.div>
                    ))}
                  </div>

                  <Separator className={`my-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      📋 Your Request Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Request ID</span>
                          <span className="font-mono font-semibold text-primary">
                            {Date.now().toString(36).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Submission Time</span>
                          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                            Received
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Priority</span>
                          <span className="font-semibold text-amber-500">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <motion.div variants={itemVariants}>
                <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <Briefcase className="h-6 w-6" />
                      While You Wait...
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button asChild variant="outline" className="h-auto py-4">
                        <Link href="/services" className="flex flex-col items-center gap-2">
                          <Users className="h-5 w-5" />
                          <span>Explore Our Services</span>
                          <span className="text-xs opacity-70">See what else we offer</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-auto py-4">
                        <Link href="/projects" className="flex flex-col items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          <span>View Our Portfolio</span>
                          <span className="text-xs opacity-70">Check our previous work</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Contact & Support */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Info Card */}
              <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Phone className="h-6 w-6 text-primary" />
                    Contact & Support
                  </CardTitle>
                  <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Need immediate assistance?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-blue-500/20' 
                            : 'bg-blue-100'
                        }`}>
                          <div className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                            {info.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{info.title}</h4>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className={`text-sm hover:text-primary transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className={`my-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

                  <div className="space-y-3">
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      📧 Check Your Email
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      We&apos;ve sent a confirmation email with your request details. 
                      Please check your inbox (and spam folder).
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card className={`border-0 shadow-xl ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      How long until I get my quote?
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      We typically send quotes within 4-8 business hours for standard requests.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Can I modify my request?
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Yes, just reply to our confirmation email with your changes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      What if I don&apos;t hear back?
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Call us directly at +91 12345 67890 or email contact@sqrock.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4">
                <Button asChild className="w-full">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Homepage
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/getquote" className="group">
                    Submit Another Request
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className={`h-8 w-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    <Lock className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Your Information is Secure
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      We use industry-standard encryption and never share your data
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing icon components
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default ThankYouPage;