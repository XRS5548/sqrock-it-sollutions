"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    CheckCircle,
    Smartphone,
    Globe,
    Code,
    Palette,
    Shield,
    Headphones,
    Zap,
    ChevronRight,
    Phone,
    Mail,
    ExternalLink,
    Server,
    Database,
    Cpu,
    Terminal,
    Cloud,
    ShieldCheck,
    Smartphone as Mobile,
    Layers,
    GitBranch
} from "lucide-react";
import Link from "next/link";

export default function Home() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const handlePhoneCall = () => {
        window.location.href = "tel:+916378695548";
    };

    const handleEmail = () => {
        window.location.href = "mailto:sqrock.business@outlook.com";
    };

    const handleGetStarted = () => {
        // You can change this to open a modal or redirect to contact form
        window.location.href = "#contact";
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">

                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/60 z-0" />



                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 dark:from-purple-900/20 dark:to-blue-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <Badge variant="outline" className="px-4 py-2 text-sm bg-purple-900/30 border-purple-700 dark:bg-purple-900/30 dark:border-purple-700">
                            🚀 Premium Web Solutions
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Professional Website Development for Your Business
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Fast, secure & SEO-optimized websites built to grow your brand
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="#contact">
                                    <Button
                                        size="lg"
                                        className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700"
                                        onClick={handleGetStarted}
                                    >
                                        <Zap className="mr-2 h-5 w-5" />
                                        Get Website @ ₹4,999
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-8 py-6 text-lg border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                    onClick={handlePhoneCall}
                                >
                                    <Phone className="mr-2 h-5 w-5" />
                                    Contact Us
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <Link href="#technologies">
                        <ChevronRight className="h-8 w-8 rotate-90 text-gray-400 hover:text-purple-500 cursor-pointer" />
                    </Link>
                </motion.div>
            </section>

            {/* Technologies Section */}
            <section id="technologies" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Technologies We Use</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Modern stack for robust, scalable solutions</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { icon: Terminal, name: "Next.js", color: "from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800" },
                            { icon: Cpu, name: "React", color: "from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600" },
                            { icon: Server, name: "Node.js", color: "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600" },
                            { icon: Database, name: "MongoDB", color: "from-green-600 to-lime-500 dark:from-green-700 dark:to-lime-600" },
                            { icon: Terminal, name: "Django", color: "from-emerald-600 to-green-700 dark:from-emerald-700 dark:to-green-800" },
                            { icon: Code, name: "PHP", color: "from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600" },
                            { icon: Layers, name: "Laravel", color: "from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600" },
                            { icon: GitBranch, name: "Git", color: "from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600" },
                            { icon: Smartphone, name: "React Native", color: "from-blue-400 to-cyan-400 dark:from-blue-500 dark:to-cyan-500" },
                            { icon: ShieldCheck, name: "TypeScript", color: "from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700" },
                            { icon: Cloud, name: "AWS", color: "from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600" },
                            { icon: Database, name: "PostgreSQL", color: "from-blue-700 to-indigo-700 dark:from-blue-800 dark:to-indigo-800" },
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card className="h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 text-center p-6 hover:shadow-lg transition-all">
                                    <div className="flex justify-center mb-4">
                                        <div className={`p-4 bg-gradient-to-br ${tech.color} rounded-full`}>
                                            <tech.icon className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{tech.name}</h3>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Transparent Pricing</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Choose the perfect plan for your business
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* STARTER */}
                        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-purple-200 dark:border-purple-900/50 shadow-xl">
                            <CardHeader className="text-center">
                                <Badge className="mx-auto mb-3 bg-gradient-to-r from-purple-600 to-blue-600">
                                    Most Popular
                                </Badge>
                                <CardTitle className="text-2xl">Starter</CardTitle>
                                <CardDescription>For small businesses</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <span className="text-5xl font-bold">₹4,999</span>
                                    <span className="block text-gray-500">onwards</span>
                                </div>

                                <ul className="space-y-3">
                                    {[
                                        "1–3 Pages Website",
                                        "Mobile Responsive",
                                        "Basic SEO",
                                        "Contact Form",
                                        "SSL Certificate",
                                        "1 Month Support",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full" onClick={handleGetStarted}>
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* BUSINESS */}
                        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Business</CardTitle>
                                <CardDescription className="text-white/80">
                                    Best for growing companies
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <span className="text-5xl font-bold">₹9,999</span>
                                    <span className="block text-white/80">onwards</span>
                                </div>

                                <ul className="space-y-3">
                                    {[
                                        "5–8 Pages Website",
                                        "Advanced SEO",
                                        "Admin Panel",
                                        "WhatsApp Integration",
                                        "Analytics Setup",
                                        "3 Months Support",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-white" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant="secondary"
                                    className="w-full text-purple-700"
                                    onClick={handleGetStarted}
                                >
                                    Choose Plan <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        {/* PREMIUM */}
                        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-purple-200 dark:border-purple-900/50 shadow-xl">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Premium</CardTitle>
                                <CardDescription>For enterprises & startups</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center">
                                    <span className="text-5xl font-bold">₹19,999</span>
                                    <span className="block text-gray-500">onwards</span>
                                </div>

                                <ul className="space-y-3">
                                    {[
                                        "Unlimited Pages",
                                        "Custom UI/UX Design",
                                        "High Performance",
                                        "Security Hardening",
                                        "Priority Support",
                                        "6 Months Support",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full" onClick={handleGetStarted}>
                                    Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>


            {/* Services Section */}
            <section id="services" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Comprehensive web solutions for every need</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Globe, title: "Business Websites", desc: "Professional websites for companies" },
                            { icon: Palette, title: "Portfolio Websites", desc: "Showcase your work beautifully" },
                            { icon: Mobile, title: "Landing Pages", desc: "High-converting single page sites" },
                            { icon: Code, title: "Custom Web Apps", desc: "Interactive web applications" },
                            { icon: Palette, title: "Website Redesign", desc: "Modernize your existing website" },
                            { icon: Shield, title: "Maintenance & Support", desc: "Ongoing care for your website" },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
                                    <CardContent className="p-8">
                                        <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg w-fit mb-4 group-hover:from-purple-200 group-hover:to-blue-200 dark:group-hover:from-purple-600/30 dark:group-hover:to-blue-600/30 transition-all">
                                            <service.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{service.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose SQROCK */}
            <section id="why-us" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose SQROCK</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">We deliver excellence at every step</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Palette, title: "Clean UI/UX", desc: "Modern, user-friendly designs" },
                            { icon: Code, title: "Scalable & Secure", desc: "Future-proof code architecture" },
                            { icon: Zap, title: "Affordable Pricing", desc: "Premium quality at best prices" },
                            { icon: Headphones, title: "Post-delivery Support", desc: "Dedicated ongoing assistance" },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-gray-200 dark:border-gray-800 text-center p-8">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full">
                                            <feature.icon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Process</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Simple steps to your dream website</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {[
                            { step: "01", title: "Requirement Discussion", desc: "Understand your vision & needs" },
                            { step: "02", title: "UI Design", desc: "Create beautiful, functional designs" },
                            { step: "03", title: "Development", desc: "Code with modern technologies" },
                            { step: "04", title: "Launch & Support", desc: "Deploy and provide ongoing support" },
                        ].map((process, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 p-8 h-full">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                        {process.step}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{process.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{process.desc}</p>
                                </Card>

                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                        <ArrowRight className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <Card className="bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 border-purple-200 dark:border-purple-900/50 shadow-2xl shadow-purple-200/50 dark:shadow-purple-900/20">
                        <CardContent className="p-6 md:p-12">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-bold mb-4">Get Your Website Today</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">Contact us for a free consultation</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all"
                                >
                                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                                        <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Call Us</h3>
                                    <a
                                        href="tel:+916378695548"
                                        className="text-2xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                    >
                                        +91 6378695548
                                    </a>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">Mon-Sat, 10AM-7PM</p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all"
                                >
                                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                                        <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Email Us</h3>
                                    <a
                                        href="mailto:sqrock.business@outlook.com"
                                        className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors break-all"
                                    >
                                        sqrock.business@outlook.com
                                    </a>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">Response within 24 hours</p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all"
                                >
                                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                                        <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Visit Us</h3>
                                    <a
                                        href="https://sqrock.cloud"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-2 justify-center"
                                    >
                                        sqrock.cloud
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">Our official website</p>
                                </motion.div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        size="lg"
                                        className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700"
                                        onClick={handlePhoneCall}
                                    >
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Now
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="px-8 py-6 text-lg border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                        onClick={handleEmail}
                                    >
                                        <Mail className="mr-2 h-5 w-5" />
                                        Send Email
                                    </Button>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center mt-12 text-gray-500">
                        <p>© {new Date().getFullYear()} SQROCK Cloud. All rights reserved.</p>
                        <p className="mt-2 text-sm">Professional Website Development Services</p>
                    </div>
                </div>
            </section>
        </div>
    );
}