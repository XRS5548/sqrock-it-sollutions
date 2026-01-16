"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Globe, Monitor, Smartphone, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    title: "Business Websites",
    description: "High-conversion websites for brands and startups",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Web Applications",
    description: "Scalable dashboards, SaaS platforms, admin panels",
    icon: Monitor,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Mobile Applications",
    description: "Android & iOS apps with smooth performance",
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Custom Software",
    description: "Automation tools and enterprise-grade software",
    icon: Cpu,
    color: "from-orange-500 to-yellow-500",
  },
];

const WhatWeBuildSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            What We Can Build For You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions tailored for startups and growing businesses
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants as Variants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card className="group relative h-full bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-8">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div
                        className={`relative p-5 rounded-2xl bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-500`}
                      >
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {project.description}
                    </p>

                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="inline-flex items-center text-sm font-medium text-primary">
                        <span>Learn more</span>
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">
              Have a custom project in mind? Let's discuss
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeBuildSection;