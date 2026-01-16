"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Smartphone,
  Palette,
  Settings,
  Cloud,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built for performance.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile applications.",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "UI/UX Design",
    description: "User-centered designs that drive engagement.",
    icon: Palette,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Custom Software",
    description: "Tailored solutions for unique business needs.",
    icon: Settings,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cloud & DevOps",
    description: "Scalable infrastructure and automation services.",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Digital Marketing",
    description: "Data-driven strategies to grow your online presence.",
    icon: TrendingUp,
    color: "from-rose-500 to-orange-500",
  },
];

const ServicesSection = () => {
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide end-to-end digital solutions for modern businesses
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={ {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }}>
              <Card className="group relative h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative mb-6"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
                      />
                      <div className="relative">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color}`}>
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <motion.div
                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;