"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, PhoneCall, Puzzle, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    text: "Fast Response",
    description: "Get initial response within 24 hours",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: PhoneCall,
    text: "Free Consultation",
    description: "30-minute discovery call at no cost",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Puzzle,
    text: "Custom Solutions",
    description: "Tailored specifically for your needs",
    color: "from-purple-500 to-pink-500",
  },
];

const ContactCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Let’s Build Something{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tell us about your project and we’ll get back to you quickly
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300`}
                    />
                    <div
                      className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.text}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground">
                Ready to start your digital transformation? Fill out the form and let's discuss your vision.
              </p>
            </motion.div>
          </div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative bg-card/40 backdrop-blur-sm border border-border/50 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
              
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />

              <CardContent className="relative z-10 p-8">
                <h3 className="text-2xl font-bold mb-2">Get Your Free Quote</h3>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get in touch</p>

                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        className="bg-background/50 border-border/50"
                      />
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger className="bg-background/50 border-border/50 w-full">
                          <SelectValue placeholder="Project Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website Development</SelectItem>
                          <SelectItem value="webapp">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="software">Custom Software</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Textarea
                        placeholder="Tell us about your project..."
                        className="min-h-[120px] bg-background/50 border-border/50"
                      />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Get Free Quote
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to our privacy policy. We'll contact you within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTASection;