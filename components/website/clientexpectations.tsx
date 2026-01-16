"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, ShieldCheck, LifeBuoy, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const commitments = [
  {
    id: 1,
    title: "Clear Communication",
    description: "Regular updates and transparent communication throughout the project",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Quality First Approach",
    description: "High-quality code, clean UI, and thorough testing",
    icon: ShieldCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Long-Term Support",
    description: "Ongoing maintenance and support after project delivery",
    icon: LifeBuoy,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Client-Centric Process",
    description: "We treat your business like our own",
    icon: HeartHandshake,
    color: "from-orange-500 to-yellow-500",
  },
];

const ClientExpectationsSection = () => {
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
        ease: "easeOut", // This is actually valid as a string, but let's be more specific
      },
    },
  };

  return (
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              Trusted Process
            </Badge>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            What Clients Can Expect From Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality, transparency, and results
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {commitments.map((commitment) => (
            <motion.div
              key={commitment.id}
              variants={{
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // This is actually valid as a string, but let's be more specific
      },
    },
  }}
              whileHover={{ y: -8 }}
            >
              <Card className="group relative h-full bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${commitment.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-8">
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div
                          className={`relative p-4 rounded-2xl bg-gradient-to-br ${commitment.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <commitment.icon className="h-7 w-7 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                        {commitment.title}
                      </h3>
                      
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {commitment.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/50 group-hover:border-primary/20 transition-colors duration-300">
                      <div className="flex items-center justify-center">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors duration-300"
                            />
                          ))}
                        </div>
                        <span className="ml-3 text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          Always included
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Every project includes these guarantees
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientExpectationsSection;