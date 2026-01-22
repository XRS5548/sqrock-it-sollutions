'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Code, Smartphone, Zap, Shield, HeadphonesIcon, Layers, Palette, Cloud, Upload, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Metadata } from 'next';


export default function FlutterAppDevelopmentPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
     
<section className="relative overflow-hidden">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0 z-0">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/og-flutter-development.jpg)',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40 dark:from-gray-900/90 dark:via-gray-900/70 dark:to-gray-900/50" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
  </div>

  <div className="container relative z-10 mx-auto px-4 py-12 md:py-24">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl mx-auto"
    >
      <Badge className="mb-4 py-2 px-4 text-sm bg-primary/20 text-white hover:bg-primary/30 backdrop-blur-sm">
        Limited Time Offer
      </Badge>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-white to-primary/90 bg-clip-text text-transparent">
        Flutter App Development for Android & iOS @ <span className="text-white">₹19,999</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
        Build high-performance, cross-platform mobile apps using Flutter with Sqrock IT Solutions.
        One codebase, two perfect apps.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 rounded-full bg-white text-gray-900 hover:bg-gray-100"
          onClick={() => window.location.href = "https://www.sqrock.cloud/getquote"}
        >
          <Zap className="mr-2 h-5 w-5 text-primary" />
          Get Your Free Quote Now
        </Button>
      </motion.div>
      
      <p className="mt-4 text-gray-300">
        No hidden charges • 30-day support • Money-back guarantee
      </p>
    </motion.div>
  </div>
</section>

      {/* Why Choose Flutter */}
      <section className="container mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Flutter for Your Mobile App?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Google's Flutter framework revolutionizes mobile app development with unmatched advantages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flutterBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {benefit.icon}
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Why Choose Sqrock */}
      <section className="container mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Sqrock IT Solutions?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We deliver exceptional Flutter app development services with a proven track record
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sqrockBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Included */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl my-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Comprehensive Flutter Services</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            End-to-end Flutter app development solutions for startups and enterprises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get a fully functional Flutter app at an unbeatable price
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-lg">
              Most Popular
            </div>
            <CardHeader className="text-center pt-12">
              <CardTitle className="text-4xl mb-2">
                <span className="text-5xl font-bold text-primary">₹19,999</span>
                <span className="text-gray-500 text-lg"> / starting</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Basic Flutter App Package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Android & iOS App Development</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Custom UI/UX Design</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>Basic Backend Integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>App Store & Play Store Deployment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  <span>30 Days Free Support</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Custom pricing available</strong> for advanced features like push notifications, 
                  payment gateways, real-time chat, and admin panels
                </p>
                <Button 
                  size="lg" 
                  className="w-full py-6 text-lg rounded-full"
                  onClick={() => window.location.href = "https://www.sqrock.cloud/getquote"}
                >
                  Get Custom Quote
                </Button>
                <p className="text-sm text-gray-500 mt-2">One-time payment • No recurring fees</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Development Process */}
      <section className="container mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Flutter Development Process</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A streamlined 6-step process to deliver your app on time and within budget
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                        {index + 1}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about Flutter app development
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-purple-500/10 border-none">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Ready to Build Your Dream App?
              </CardTitle>
              <CardDescription className="text-xl">
                Join 100+ satisfied clients who chose Sqrock IT Solutions for Flutter app development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">₹19,999</div>
                    <div className="text-sm text-gray-500">Starting Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">6-8 Weeks</div>
                    <div className="text-sm text-gray-500">Average Delivery Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">100%</div>
                    <div className="text-sm text-gray-500">Client Satisfaction</div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-7 rounded-full"
                    onClick={() => window.location.href = "https://www.sqrock.cloud/getquote"}
                  >
                    <Smartphone className="mr-2 h-6 w-6" />
                    Start Your Flutter Project Today
                  </Button>
                </motion.div>
                
                <p className="text-gray-500 text-sm">
                  Free consultation • Project estimation within 24 hours • No commitment required
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

// Data arrays
const flutterBenefits = [
  {
    title: "Single Codebase",
    description: "Write once, deploy everywhere. Maintain one codebase for both Android and iOS platforms.",
    icon: <Code className="h-6 w-6 text-primary" />
  },
  {
    title: "Faster Development",
    description: "Hot reload feature reduces development time by up to 50% compared to native development.",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Native Performance",
    description: "Flutter compiles to native ARM code, delivering 60fps smooth animations and native-like performance.",
    icon: <Smartphone className="h-6 w-6 text-primary" />
  },
  {
    title: "Cost-Effective",
    description: "Reduce development costs by 40-60% compared to maintaining separate iOS and Android teams.",
    icon: <Shield className="h-6 w-6 text-primary" />
  },
  {
    title: "Google Backed",
    description: "Supported by Google with regular updates, ensuring long-term viability and support.",
    icon: <Layers className="h-6 w-6 text-primary" />
  },
  {
    title: "Beautiful UI",
    description: "Create stunning, customizable UIs that look perfect on any device or screen size.",
    icon: <Palette className="h-6 w-6 text-primary" />
  }
];

const sqrockBenefits = [
  {
    title: "Expert Flutter Developers",
    description: "Our team consists of certified Flutter developers with 5+ years of cross-platform development experience."
  },
  {
    title: "Clean UI/UX Design",
    description: "We create intuitive, user-friendly interfaces that follow Material Design and Cupertino guidelines."
  },
  {
    title: "SEO-Friendly Apps",
    description: "Implement deep linking, app indexing, and SEO best practices to improve your app's visibility."
  },
  {
    title: "Fast Delivery",
    description: "Agile development methodology ensures your app is delivered 30% faster than industry standards."
  },
  {
    title: "Affordable Pricing",
    description: "Starting at just ₹19,999, we offer the most competitive Flutter app development rates in India."
  },
  {
    title: "Post-Launch Support",
    description: "Get 30 days of free support and maintenance after your app goes live."
  }
];

const services = [
  {
    title: "Android App Development",
    description: "Build high-performance Android apps using Flutter with Material Design principles.",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    title: "iOS App Development",
    description: "Create beautiful iOS apps with Flutter following Apple's Human Interface Guidelines.",
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    title: "UI/UX Design",
    description: "Custom mobile app design that focuses on user experience and conversion optimization.",
    icon: <Palette className="h-6 w-6" />
  },
  {
    title: "Backend Integration",
    description: "Seamless integration with Firebase, REST APIs, and third-party services.",
    icon: <Cloud className="h-6 w-6" />
  },
  {
    title: "App Store Deployment",
    description: "Complete assistance with Google Play Store and Apple App Store submission.",
    icon: <Upload className="h-6 w-6" />
  },
  {
    title: "Maintenance & Support",
    description: "Ongoing app maintenance, updates, and technical support packages.",
    icon: <Wrench className="h-6 w-6" />
  }
];

const processSteps = [
  {
    title: "Requirement Analysis",
    description: "We conduct in-depth discussions to understand your business goals and app requirements."
  },
  {
    title: "UI/UX Design",
    description: "Our designers create wireframes and prototypes for your approval before development."
  },
  {
    title: "Flutter Development",
    description: "Agile development with regular demos and feedback sessions every 2 weeks."
  },
  {
    title: "Quality Testing",
    description: "Rigorous testing across multiple devices and platforms to ensure bug-free performance."
  },
  {
    title: "Deployment",
    description: "We handle complete app store submission and deployment process for you."
  },
  {
    title: "Support & Maintenance",
    description: "Post-launch support, updates, and maintenance to keep your app running smoothly."
  }
];

const faqs = [
  {
    question: "What is Flutter app development?",
    answer: "Flutter is Google's open-source UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart programming language and allows developers to create beautiful, fast applications that work seamlessly on both Android and iOS platforms."
  },
  {
    question: "Can one Flutter app run on both Android & iOS?",
    answer: "Yes! That's the primary advantage of Flutter. With a single codebase, your app will run perfectly on both Android and iOS devices. We ensure platform-specific adaptations where needed, but 90% of the code is shared between both platforms."
  },
  {
    question: "Is Flutter good for startups?",
    answer: "Absolutely! Flutter is ideal for startups because it significantly reduces development time and costs. Instead of building separate Android and iOS apps, you build once and deploy everywhere. This allows startups to launch their MVP faster and validate their idea with real users."
  },
  {
    question: "How long does Flutter app development take?",
    answer: "A basic Flutter app with core features typically takes 6-8 weeks. Complex applications with advanced features may take 12-16 weeks. The exact timeline depends on your specific requirements, which we'll discuss during our free consultation."
  },
  {
    question: "Why should I choose Sqrock IT Solutions for Flutter development?",
    answer: "We combine technical expertise with affordable pricing. Starting at just ₹19,999, you get professional Flutter app development, clean UI/UX design, app store deployment, and 30 days of free support. Our experienced team has delivered 50+ Flutter apps with 100% client satisfaction."
  },
  {
    question: "What's included in the ₹19,999 starting package?",
    answer: "Our starting package includes: Android & iOS app development, custom UI/UX design, basic backend integration, app store deployment assistance, and 30 days of post-launch support. Additional features can be added based on your requirements with transparent pricing."
  }
];