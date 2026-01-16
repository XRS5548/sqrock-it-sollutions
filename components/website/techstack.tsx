"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techCategories = [
  {
    id: 1,
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    color: "from-blue-500 to-cyan-500",
    icon: "⚛️",
  },
  {
    id: 2,
    title: "Backend",
    items: ["Node.js", "Express", "PHP", "Django"],
    color: "from-green-500 to-emerald-500",
    icon: "⚙️",
  },
  {
    id: 3,
    title: "Mobile",
    items: ["Flutter", "Android", "React Native"],
    color: "from-purple-500 to-pink-500",
    icon: "📱",
  },
  {
    id: 4,
    title: "Database & Cloud",
    items: ["MongoDB", "MySQL", "Firebase", "AWS"],
    color: "from-orange-500 to-yellow-500",
    icon: "☁️",
  },
];

const TechStackSection = () => {
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

  const cardVariants = {
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

  const badgeVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
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
            Our Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modern, scalable, and industry-proven technologies we work with
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techCategories.map((category) => (
            <motion.div key={category.id} variants={cardVariants as Variants}>
              <Card className="group relative h-full bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="p-8">
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-center mb-8 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-3">
                      {category.items.map((tech, index) => (
                        <motion.div
                          key={index}
                          variants={badgeVariants}
                          whileHover="hover"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <Badge
                            variant="secondary"
                            className="px-4 py-2 text-sm font-medium bg-secondary/50 hover:bg-secondary border-border/50 group-hover:border-primary/30 transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/50 group-hover:border-primary/20 transition-colors duration-300">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          Expert level
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
                Constantly updating our stack with latest technologies
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;