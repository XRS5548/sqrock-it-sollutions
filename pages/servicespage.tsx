"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Smartphone,
  Palette,
  Settings,
  Cloud,
  Shield,
  Search,
  Layout,
  Code,
  Headphones,
  Users,
  Zap,
  MessageSquare,
  LifeBuoy,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites, dashboards, and SaaS applications",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    points: [
      "Responsive & mobile-first design",
      "SEO-optimized architecture",
      "High-performance frameworks",
    ],
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Android, iOS, and cross-platform applications",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    points: [
      "Native & cross-platform apps",
      "App Store deployment",
      "Push notifications",
    ],
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Wireframes, prototypes, and design systems",
    icon: Palette,
    color: "from-green-500 to-emerald-500",
    points: [
      "User-centered design",
      "Interactive prototypes",
      "Design systems & style guides",
    ],
  },
  {
    id: 4,
    title: "Custom Software Development",
    description: "Business automation and internal tools",
    icon: Settings,
    color: "from-orange-500 to-yellow-500",
    points: [
      "Custom business logic",
      "API integrations",
      "Database design",
    ],
  },
  {
    id: 5,
    title: "Cloud & DevOps",
    description: "Deployment, hosting, and scaling solutions",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
    points: [
      "Cloud infrastructure",
      "CI/CD pipelines",
      "Server management",
    ],
  },
  {
    id: 6,
    title: "Maintenance & Support",
    description: "Ongoing support and upgrades",
    icon: Shield,
    color: "from-red-500 to-pink-500",
    points: [
      "24/7 monitoring",
      "Regular updates",
      "Security patches",
    ],
  },
];

const processSteps = [
  {
    step: 1,
    title: "Discovery",
    description: "Understanding your requirements and goals",
    icon: Search,
  },
  {
    step: 2,
    title: "Planning",
    description: "Creating roadmap and technical specifications",
    icon: Layout,
  },
  {
    step: 3,
    title: "Development",
    description: "Building, testing, and iterating",
    icon: Code,
  },
  {
    step: 4,
    title: "Delivery & Support",
    description: "Deployment and ongoing maintenance",
    icon: Headphones,
  },
];

const highlights = [
  {
    title: "Experienced Team",
    description: "10+ years average experience per developer",
    icon: Users,
  },
  {
    title: "Scalable Architecture",
    description: "Future-proof solutions that grow with you",
    icon: Zap,
  },
  {
    title: "Transparent Communication",
    description: "Regular updates and clear progress tracking",
    icon: MessageSquare,
  },
  {
    title: "Reliable Support",
    description: "Dedicated support team for all projects",
    icon: LifeBuoy,
  },
];

const techCategories = [
  { name: "Frontend", techs: ["React", "Next.js", "Vue", "Angular"] },
  { name: "Backend", techs: ["Node.js", "Python", "PHP", "Java"] },
  { name: "Mobile", techs: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { name: "Cloud", techs: ["AWS", "Google Cloud", "Azure", "Firebase"] },
];

const ServicesPage = () => {
  const refs = {
    hero: useRef(null),
    services: useRef(null),
    process: useRef(null),
    highlights: useRef(null),
    tech: useRef(null),
    cta: useRef(null),
  };

  const inViews = {
    hero: useInView(refs.hero, { once: true }),
    services: useInView(refs.services, { once: true, amount: 0.1 }),
    process: useInView(refs.process, { once: true, amount: 0.2 }),
    highlights: useInView(refs.highlights, { once: true, amount: 0.2 }),
    tech: useInView(refs.tech, { once: true, amount: 0.2 }),
    cta: useInView(refs.cta, { once: true, amount: 0.2 }),
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
      {/* 1. Services Hero Section */}
      <section
        ref={refs.hero}
        className="relative py-24 bg-gradient-to-br from-background via-background to-primary/5"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              End-to-end IT solutions tailored for your business growth
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Free Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Detailed Services Section */}
      <section ref={refs.services} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.services ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions for modern businesses
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inViews.services ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={itemVariants as Variants}>
                <Card className="group relative h-full bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <CardContent className="p-8">
                    <div className="relative z-10">
                      <div className="flex justify-center mb-6">
                        <div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-3">{service.title}</h3>
                      <p className="text-muted-foreground text-center mb-6">{service.description}</p>
                      <ul className="space-y-2">
                        {service.points.map((point, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-3`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Our Process Section */}
      <section ref={refs.process} className="py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.process ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to ensure project success
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:flex justify-between items-center">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inViews.process ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex-1 text-center"
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-8 left-3/4 w-full h-0.5 bg-primary/30" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inViews.process ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{step.step}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why SQROCK for Services */}
      <section ref={refs.highlights} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.highlights ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why Choose SQROCK
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver excellence at every step
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inViews.highlights ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {highlights.map((highlight, index) => (
              <motion.div key={index} variants={itemVariants as Variants}>
                <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                      <highlight.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Tech Stack (Compact) */}
      <section ref={refs.tech} className="py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.tech ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern tools and frameworks we use to build your solutions
            </p>
          </motion.div>

          <div className="space-y-12">
            {techCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inViews.tech ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold">{category.name}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.techs.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="px-4 py-2 text-base bg-secondary/50 hover:bg-secondary border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section ref={refs.cta} className="py-24 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inViews.cta ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Let’s turn your idea into a powerful digital product
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="px-10 py-6 text-lg">
                <Link href="/contact">
                  <Send className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;