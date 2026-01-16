"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle, Smile, Briefcase, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    id: 1,
    value: 120,
    suffix: "+",
    label: "Projects Completed",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    value: 60,
    suffix: "+",
    label: "Happy Clients",
    icon: Smile,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    value: 24,
    suffix: "/7",
    label: "Support",
    icon: Headphones,
    color: "from-orange-500 to-yellow-500",
  },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      current = Math.min(target, (progress / duration) * target);
      setCount(Math.floor(current));

      if (current < target) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Results that speak for themselves
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={{
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }} whileHover={{ scale: 1.05 }}>
              <Card className="relative h-full bg-card/30 backdrop-blur-sm border border-border/50 overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl lg:text-5xl font-bold text-foreground">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-muted-foreground">
                    {stat.label}
                  </h3>
                </div>

                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground italic">
            Delivering excellence across every metric, every time
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;