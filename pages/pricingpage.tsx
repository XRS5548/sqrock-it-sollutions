"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Check, Star, Zap, Clock, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "next-themes";

const PricingPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const pricingPlans = [
    {
      id: 1,
      title: "Basic Website",
      price: "Starting from ₹4,999",
      description: "Perfect for small businesses and startups",
      features: [
        "1–3 Pages Website",
        "Mobile Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "Social Media Links",
        "1 Month Free Hosting",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Star className="h-5 w-5" />,
      color: "blue" as const,
    },
    {
      id: 2,
      title: "Business Website",
      price: "Starting from ₹9,999",
      description: "Ideal for growing businesses",
      features: [
        "5–7 Pages Website",
        "Custom Admin Panel",
        "Advanced SEO Setup",
        "Content Management System",
        "Free 1 Month Support",
        "3 Months Free Hosting",
        "Google Analytics Integration",
        "Speed Optimization",
      ],
      buttonText: "Choose Plan",
      buttonVariant: "default" as const,
      popular: true,
      icon: <Zap className="h-5 w-5" />,
      color: "purple" as const,
    },
    {
      id: 3,
      title: "Web App / Software",
      price: "Starting from ₹19,999",
      description: "Custom solutions for complex needs",
      features: [
        "Custom Dashboard Design",
        "Authentication System",
        "Database Integration",
        "API Development",
        "Scalable Architecture",
        "6 Months Free Support",
        "Priority Maintenance",
        "Performance Monitoring",
        "Security Hardening",
        "Technical Documentation",
      ],
      buttonText: "Get Quote",
      buttonVariant: "outline" as const,
      popular: false,
      icon: <Star className="h-5 w-5" />,
      color: "green" as const,
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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

  const getColorClasses = (color: string) => {
    if (!mounted) return "";
    
    const isDark = theme === "dark";
    
    const darkColors: Record<string, string> = {
      blue: "from-blue-500/10 to-blue-600/10 border-blue-500/20",
      purple: "from-purple-500/10 to-purple-600/10 border-purple-500/20",
      green: "from-green-500/10 to-emerald-600/10 border-green-500/20",
    };
    
    const lightColors: Record<string, string> = {
      blue: "from-blue-100 to-blue-50 border-blue-200",
      purple: "from-purple-100 to-purple-50 border-purple-200",
      green: "from-green-100 to-emerald-50 border-green-200",
    };
    
    const colors = isDark ? darkColors : lightColors;
    return colors[color] || colors.blue;
  };

  const getPopularColorClasses = (color: string) => {
    if (!mounted) return "";
    
    const isDark = theme === "dark";
    
    const darkColors: Record<string, string> = {
      blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      green: "bg-green-500/20 text-green-300 border-green-500/30",
    };
    
    const lightColors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      green: "bg-green-100 text-green-700 border-green-200",
    };
    
    const colors = isDark ? darkColors : lightColors;
    return colors[color] || colors.purple;
  };

  const getTextColor = () => {
    if (!mounted) return "text-gray-900";
    return theme === "dark" ? "text-white" : "text-gray-900";
  };

  const getMutedTextColor = () => {
    if (!mounted) return "text-gray-600";
    return theme === "dark" ? "text-gray-300" : "text-gray-600";
  };

  const getSubTextColor = () => {
    if (!mounted) return "text-gray-500";
    return theme === "dark" ? "text-gray-400" : "text-gray-500";
  };

  const getBackgroundGradient = () => {
    if (!mounted) return "from-gray-50 to-white";
    return theme === "dark" 
      ? "from-gray-900 to-black" 
      : "from-gray-50 to-white";
  };

  const getCardBackgroundGradient = () => {
    if (!mounted) return "from-gray-100/50 to-gray-50/50";
    return theme === "dark"
      ? "from-gray-800/50 to-gray-900/50"
      : "from-gray-100/50 to-gray-50/50";
  };

  const getSeparatorColor = () => {
    if (!mounted) return "bg-gray-200";
    return theme === "dark" ? "bg-gray-700/50" : "bg-gray-200";
  };

  const getIconBgColor = (color: string) => {
    if (!mounted) return "bg-blue-100";
    
    const isDark = theme === "dark";
    
    const colors: Record<string, string> = {
      blue: isDark ? "bg-blue-500/20" : "bg-blue-100",
      purple: isDark ? "bg-purple-500/20" : "bg-purple-100",
      green: isDark ? "bg-green-500/20" : "bg-green-100",
    };
    
    return colors[color] || colors.blue;
  };

  const getIconColor = (color: string) => {
    if (!mounted) return "text-blue-600";
    
    const isDark = theme === "dark";
    
    const colors: Record<string, string> = {
      blue: isDark ? "text-blue-400" : "text-blue-600",
      purple: isDark ? "text-purple-400" : "text-purple-600",
      green: isDark ? "text-green-400" : "text-green-600",
    };
    
    return colors[color] || colors.blue;
  };

  const getHeroTextGradient = () => {
    if (!mounted) return "from-gray-900 to-gray-700";
    return theme === "dark"
      ? "from-gray-100 to-gray-300"
      : "from-gray-900 to-gray-700";
  };

  const getHeroBadgeClasses = () => {
    if (!mounted) return "bg-amber-100 text-amber-800 border-amber-200";
    return theme === "dark"
      ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
      : "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200 text-amber-800";
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getBackgroundGradient()} p-4 md:p-8 ${getTextColor()}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge 
            variant="outline" 
            className={`mb-4 px-4 py-1.5 ${getHeroBadgeClasses()}`}
          >
            <Clock className="h-3 w-3 mr-2" />
            Limited Time Offers
          </Badge>
          
          <h1 className={`text-3xl md:text-5xl font-bold bg-gradient-to-r ${getHeroTextGradient()} bg-clip-text text-transparent mb-4`}>
            Latest Offers – Affordable IT Solutions
          </h1>
          
          <p className={`text-lg md:text-xl ${getMutedTextColor()} max-w-2xl mx-auto mb-8`}>
            Premium quality services at startup-friendly prices. Transform your digital presence without breaking the bank.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants as Variants}
              whileHover="hover"
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${getPopularColorClasses(plan.color)} px-4 py-1.5 font-semibold`}>
                    ⭐ Most Popular
                  </Badge>
                </div>
              )}

              <Card className={`h-full bg-gradient-to-b ${getColorClasses(plan.color)} backdrop-blur-sm border relative overflow-hidden group`}>
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    background: hoveredCard === plan.id 
                      ? `radial-gradient(circle at center, var(--tw-gradient-stops))`
                      : "none",
                  }}
                  style={{
                    '--tw-gradient-stops': plan.color === 'blue' 
                      ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)')
                      : plan.color === 'purple'
                      ? (theme === 'dark' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.1)')
                      : (theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.1)'),
                  } as React.CSSProperties}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getIconBgColor(plan.color)}`}>
                        {plan.icon}
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold">
                        {plan.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className={getMutedTextColor()}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <Separator className={getSeparatorColor()} />

                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {plan.price}
                    </div>
                    <div className={`text-sm ${getSubTextColor()}`}>
                      One-time payment • No hidden fees
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-sm md:text-base"
                      >
                        <Check className={`h-4 w-4 mr-3 flex-shrink-0 ${getIconColor(plan.color)}`} />
                        <span className={getTextColor()}>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    variant={plan.buttonVariant}
                    className={`w-full py-6 text-base font-semibold ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`bg-gradient-to-r ${getCardBackgroundGradient()} backdrop-blur-sm rounded-2xl p-6 md:p-8 border ${
            theme === "dark" ? "border-gray-700/50" : "border-gray-200"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className={`text-xl md:text-2xl font-bold mb-3 ${getTextColor()}`}>
                  Need a custom solution?
                </h3>
                <p className={`${getMutedTextColor()} mb-4`}>
                  Final pricing may vary based on specific requirements, features, and complexity. 
                  Contact us for a personalized quote tailored to your business needs.
                </p>
                <div className={`flex items-center text-sm ${getSubTextColor()}`}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span>All prices include GST • 100% transparent pricing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="px-8 py-6">
                      Contact for Custom Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white"}>
                    <DialogHeader>
                      <DialogTitle className={`text-2xl ${getTextColor()}`}>Get Custom Quote</DialogTitle>
                      <DialogDescription className={getMutedTextColor()}>
                        Tell us about your project requirements for a personalized quote.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <p className={`text-sm ${getSubTextColor()}`}>
                        Our team will contact you within 24 hours to discuss:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className={getTextColor()}>Project scope & requirements</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className={getTextColor()}>Timeline & deliverables</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className={getTextColor()}>Custom pricing breakdown</span>
                        </li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                  Schedule Consultation
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Separator className={`my-6 ${getSeparatorColor()}`} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className={`text-sm ${getSubTextColor()}`}>Support Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">30 Days</div>
                <div className={`text-sm ${getSubTextColor()}`}>Delivery Guarantee</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className={`text-sm ${getSubTextColor()}`}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            All plans include a 15-day post-delivery support. Additional maintenance packages available.
            Prices are valid until December 31, 2026.
          </p>
          <p className="mt-2">
            Need help choosing?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
              Compare all features
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;