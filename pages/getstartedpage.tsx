"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Rocket, 
  Layers, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Headphones,
  Sparkles,
  Zap,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const GetStartedPage = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define your routes - make sure these pages exist!
  const routes = {
    services: "/services",
    offers: "/pricing", // Changed from /offers to /pricing
    getquote: "/getquote",
    contact: "/contact",
  };

  const steps = [
    {
      id: 1,
      title: "Choose a Service",
      description: "Select the service you're looking for from our comprehensive range of IT solutions.",
      icon: <Layers className="h-8 w-8" />,
      buttonText: "View Services",
      href: routes.services,
      color: "blue" as const,
      features: ["Website Development", "Web Apps", "Mobile Apps", "UI/UX Design"],
    },
    {
      id: 2,
      title: "Check Latest Offers",
      description: "Explore our startup-friendly pricing with transparent, affordable packages.",
      icon: <DollarSign className="h-8 w-8" />,
      buttonText: "View Offers",
      href: routes.offers,
      color: "purple" as const,
      features: ["No Hidden Costs", "Flexible Plans", "Quality Guarantee"],
    },
    {
      id: 3,
      title: "Get a Free Quote",
      description: "Tell us about your project and get a customized quote within 24 hours.",
      icon: <FileText className="h-8 w-8" />,
      buttonText: "Get Quote",
      href: routes.getquote,
      color: "green" as const,
      features: ["24-hour Response", "Free Consultation", "Detailed Breakdown"],
      highlight: true,
    },
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "We deliver projects on time, every time with agile development.",
      stat: "30 Days",
      statLabel: "Average Delivery",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Transparent Pricing",
      description: "No hidden fees. Clear breakdown of costs from day one.",
      stat: "100%",
      statLabel: "Cost Clarity",
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Dedicated Support",
      description: "24/7 support during and after project completion.",
      stat: "24/7",
      statLabel: "Support Available",
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
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

  const getColorClasses = (color: string, highlight?: boolean) => {
    if (highlight) {
      return theme === 'dark' 
        ? "from-emerald-500/20 via-emerald-600/10 to-emerald-700/10 border-emerald-500/30"
        : "from-emerald-100 via-emerald-50 to-emerald-200/50 border-emerald-300";
    }
    
    const darkColors: Record<string, string> = {
      blue: "from-blue-500/10 via-blue-600/10 to-blue-700/10 border-blue-500/20",
      purple: "from-purple-500/10 via-purple-600/10 to-purple-700/10 border-purple-500/20",
      green: "from-green-500/10 via-green-600/10 to-green-700/10 border-green-500/20",
    };
    
    const lightColors: Record<string, string> = {
      blue: "from-blue-100 via-blue-50 to-blue-200/50 border-blue-200",
      purple: "from-purple-100 via-purple-50 to-purple-200/50 border-purple-200",
      green: "from-green-100 via-green-50 to-green-200/50 border-green-200",
    };
    
    const colors = theme === 'dark' ? darkColors : lightColors;
    return colors[color] || colors.blue;
  };

  const getIconBgColor = (color: string, highlight?: boolean) => {
    if (highlight) {
      return theme === 'dark' 
        ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
        : "bg-gradient-to-br from-emerald-500 to-emerald-600";
    }
    
    const darkColors: Record<string, string> = {
      blue: "bg-gradient-to-br from-blue-500 to-blue-600",
      purple: "bg-gradient-to-br from-purple-500 to-purple-600",
      green: "bg-gradient-to-br from-green-500 to-green-600",
    };
    
    const lightColors: Record<string, string> = {
      blue: "bg-gradient-to-br from-blue-500 to-blue-600",
      purple: "bg-gradient-to-br from-purple-500 to-purple-600",
      green: "bg-gradient-to-br from-green-500 to-green-600",
    };
    
    const colors = theme === 'dark' ? lightColors : darkColors;
    return colors[color] || colors.blue;
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/20 text-foreground"
          >
            <Sparkles className="h-3 w-3 mr-2" />
            Fast • Affordable • Reliable
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-4">
            Let&apos;s Get Started
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose how you want to begin. It only takes a minute to start your journey with us.
          </p>

          {/* Animated Indicator */}
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="flex flex-col items-center mt-8"
          >
            <ChevronRight className="h-6 w-6 text-muted-foreground rotate-90" />
            <span className="text-sm text-muted-foreground mt-1">Choose your path below</span>
          </motion.div>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={cardVariants as Variants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(step.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative cursor-pointer"
              onClick={() => handleNavigation(step.href)}
            >
              {step.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1.5 font-semibold border-0 shadow-lg">
                    <Zap className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              )}

              <Card className={`h-full bg-gradient-to-b ${getColorClasses(step.color, step.highlight)} backdrop-blur-sm border relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300`}>
                {/* Animated glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    background: hoveredCard === step.id 
                      ? `radial-gradient(circle at center, var(--tw-gradient-stops))`
                      : "none",
                  }}
                  style={{
                    '--tw-gradient-stops': step.color === 'blue' 
                      ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)')
                      : step.color === 'purple'
                      ? (theme === 'dark' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.1)')
                      : (theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.1)'),
                  } as React.CSSProperties}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${getIconBgColor(step.color, step.highlight)} text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/5">
                      <span className="text-sm font-bold text-foreground">{step.id}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-2 mb-6">
                    {step.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className={`h-4 w-4 mr-3 flex-shrink-0 ${
                          step.highlight ? 'text-emerald-500' :
                          step.color === 'blue' ? 'text-blue-500' :
                          step.color === 'purple' ? 'text-purple-500' :
                          'text-green-500'
                        }`} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className={`text-xs px-3 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-background/30' : 'bg-background/50'
                  }`}>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Takes {step.id === 1 ? '2 mins' : step.id === 2 ? '3 mins' : '5 mins'}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <Button
                    asChild
                    className={`w-full group/btn ${step.highlight 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700' 
                      : ''
                    }`}
                    size="lg"
                  >
                    <Link href={step.href} className="flex items-center justify-center">
                      {step.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Sqrock Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Choose <span className="text-primary">Sqrock</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine expertise with innovation to deliver exceptional results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants as Variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="group"
              >
                <Card className="h-full border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
                      }`}>
                        <div className="text-primary">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {benefit.stat}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {benefit.statLabel}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`rounded-2xl p-8 md:p-12 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-gradient-to-r from-gray-100 via-white to-gray-100 backdrop-blur-sm border border-gray-200'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Ready to build something amazing?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trusted Sqrock with their digital transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleNavigation(routes.getquote)}
                size="lg" 
                className="px-8 py-6 text-base font-semibold group"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                onClick={() => handleNavigation(routes.contact)}
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-base font-semibold group"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                No commitment required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Free initial consultation
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                24-hour response guaranteed
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Need help choosing? Our team is here to guide you.
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => handleNavigation(routes.services)}>
                Services
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleNavigation(routes.offers)}>
                Pricing
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleNavigation(routes.contact)}>
                Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStartedPage;