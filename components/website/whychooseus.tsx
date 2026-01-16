"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Layers, Clock, IndianRupee, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Expert Team",
    description: "Skilled developers and designers with real-world experience",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Scalable Solutions",
    description: "Future-ready solutions that grow with your business",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "On-Time Delivery",
    description: "We respect deadlines and deliver on schedule",
    icon: Clock,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs, clear and honest pricing",
    icon: IndianRupee,
    color: "from-orange-500 to-yellow-500",
  },
];

const WhyChooseUsSection = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  SQROCK
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We deliver quality, innovation, and reliability in every project
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants as Variants}>
                  <Card className="group p-6 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Card / Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 backdrop-blur-sm p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-32 -translate-x-32" />

              <motion.div
                variants={cardVariants as Variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10"
              >
                <div className="text-center lg:text-left mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    Trusted by{" "}
                    <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                      100+ Companies
                    </span>
                  </h3>
                  <p className="text-muted-foreground">
                    Join businesses that have transformed their digital presence with our solutions
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Client Satisfaction", value: "98%" },
                    { label: "Projects Delivered", value: "250+" },
                    { label: "Support Hours", value: "24/7" },
                    { label: "Team Members", value: "50+" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="bg-background/50 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="mt-8 pt-8 border-t border-border/50"
                >
                  <p className="text-center text-sm text-muted-foreground italic">
                    "Exceptional service, outstanding results. SQROCK transformed our digital infrastructure completely."
                  </p>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;