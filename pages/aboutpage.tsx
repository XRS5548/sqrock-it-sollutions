"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  Handshake,
  Users,
  Code,
  Heart,
  Headphones,
  ArrowRight,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const coreValues = [
  {
    id: 1,
    title: "Innovation",
    description: "Constantly exploring new technologies and approaches",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 2,
    title: "Quality",
    description: "Never compromising on code quality and user experience",
    icon: ShieldCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Transparency",
    description: "Clear communication and honest pricing",
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Commitment",
    description: "Dedicated to client success and long-term partnerships",
    icon: Handshake,
    color: "from-purple-500 to-pink-500",
  },
];

const highlights = [
  {
    title: "Skilled & Passionate Team",
    description: "10+ years average experience with cutting-edge technologies",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Modern Tech Stack",
    description: "Latest frameworks and tools for optimal performance",
    icon: Code,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Client-Focused Approach",
    description: "Your success is our primary metric",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Long-Term Support",
    description: "Reliable maintenance and ongoing improvements",
    icon: Headphones,
    color: "from-orange-500 to-yellow-500",
  },
];

const AboutPage = () => {
  const refs = {
    hero: useRef(null),
    story: useRef(null),
    mission: useRef(null),
    values: useRef(null),
    why: useRef(null),
    cta: useRef(null),
  };

  const inViews = {
    hero: useInView(refs.hero, { once: true }),
    story: useInView(refs.story, { once: true, amount: 0.2 }),
    mission: useInView(refs.mission, { once: true, amount: 0.2 }),
    values: useInView(refs.values, { once: true, amount: 0.2 }),
    why: useInView(refs.why, { once: true, amount: 0.2 }),
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
      {/* 1. About Hero Section */}
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
              Who We Are
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SQROCK IT Solutions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Driven by innovation. Focused on results.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Company Story Section */}
      <section ref={refs.story} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inViews.story ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SQROCK IT Solutions was founded with a singular mission: to help startups
                  and growing businesses build reliable, scalable, and modern digital solutions
                  that drive real growth.
                </p>
                <p>
                  What started as a small team of passionate developers has grown into a full-service
                  digital agency, but our core philosophy remains the same – deliver exceptional
                  quality while building lasting partnerships.
                </p>
                <p>
                  Today, we collaborate with businesses worldwide, transforming their digital
                  presence with cutting-edge technology and user-centered design.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inViews.story ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl border border-border/50 overflow-hidden relative">
  <Image
    src="/story.png"
    alt="SQROCK IT Solutions Story"
    fill
    className="object-cover"
    priority
  />

  {/* Optional overlay (premium look) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

  {/* Optional text on image */}
  <div className="absolute bottom-6 left-6 right-6 text-white">
    <h3 className="text-2xl font-bold">Building Digital Futures</h3>
    <p className="text-sm opacity-90">Since 2025</p>
  </div>
</div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Section */}
      <section ref={refs.mission} className="py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Our Purpose
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The guiding principles that define everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inViews.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-blue-500/30 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Target className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mission</h3>
                  <p className="text-muted-foreground">
                    To deliver high-quality, scalable IT solutions that help businesses grow
                    and achieve their digital transformation goals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inViews.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-purple-500/30 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Vision</h3>
                  <p className="text-muted-foreground">
                    To become a trusted technology partner for businesses worldwide,
                    known for innovation, reliability, and exceptional results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section ref={refs.values} className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.values ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inViews.values ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {coreValues.map((value) => (
              <motion.div key={value.id} variants={itemVariants as Variants}>
                <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`w-14 h-14 mx-auto mb-6 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                      <value.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Why SQROCK Section */}
      <section ref={refs.why} className="py-24 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inViews.why ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why Choose SQROCK
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What sets us apart in delivering exceptional digital solutions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inViews.why ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants as Variants}
                whileHover={{ y: -8 }}
              >
                <Card className="group h-full bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`w-12 h-12 mb-6 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <highlight.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                    <p className="text-muted-foreground text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Final CTA Section */}
      <section ref={refs.cta} className="py-24 bg-gradient-to-br from-background via-background to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inViews.cta ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Let's Build the{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Future Together
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Partner with SQROCK to turn your ideas into powerful digital products
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="px-10 py-6 text-lg">
                <Link href="/contact">
                  <Send className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;