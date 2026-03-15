import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, ShoppingCart, Globe, PenTool, CheckCircle, Clock, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Web Development Services India | Custom Website Development | SQROCK",
  description:
    "SQROCK IT Solutions offers professional web development services in India. Custom websites, ecommerce development, web applications & UI/UX design for startups and businesses. 150+ projects delivered. 98% client satisfaction. Get a free consultation today.",
  keywords: [
    "web development services India",
    "custom website development India",
    "ecommerce website development India",
    "web application development company",
    "Next.js development company India",
    "React web development India",
    "SEO optimized website development",
    "business website development India",
    "web development company Rajasthan",
    "hire web developers India",
  ],
  authors: [{ name: "SQROCK IT Solutions", url: "https://sqrock.cloud" }],
  creator: "SQROCK IT Solutions",
  publisher: "SQROCK IT Solutions",
  metadataBase: new URL("https://sqrock.cloud"),
  alternates: {
    canonical: "/web-development-services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sqrock.cloud/web-development-services",
    siteName: "SQROCK IT Solutions",
    title: "Web Development Services India | Custom Website Development | SQROCK",
    description:
      "Custom websites, ecommerce platforms & web applications built by SQROCK IT Solutions. 150+ projects delivered, 98% client satisfaction. SEO optimized & secure.",
    images: [
      {
        url: "/images/web-development-services.png",
        width: 1200,
        height: 630,
        alt: "SQROCK Web Development Services - Professional Website Development India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services India | SQROCK IT Solutions",
    description:
      "Custom websites, ecommerce platforms & scalable web applications. 150+ projects delivered. SEO optimized & secure. Free consultation available.",
    images: ["/images/web-development-services.png"],
  },
  category: "technology",
}


export default function WebDevelopmentPage() {
    const services = [
        {
            icon: <Code className="h-10 w-10 text-primary" />,
            title: "Custom Website Development",
            description: "Build fully customized websites tailored for businesses, startups and online brands."
        },
        {
            icon: <ShoppingCart className="h-10 w-10 text-primary" />,
            title: "Ecommerce Development",
            description: "Powerful ecommerce platforms with payment integration and modern UI experience."
        },
        {
            icon: <Globe className="h-10 w-10 text-primary" />,
            title: "Web Application Development",
            description: "High performance scalable web applications using modern frameworks."
        },
        {
            icon: <PenTool className="h-10 w-10 text-primary" />,
            title: "UI / UX Design",
            description: "Modern user friendly interface design focused on conversion and performance."
        }
    ]

    const whyChooseUs = [
        {
            icon: <CheckCircle className="h-6 w-6 text-primary" />,
            title: "Experienced Developers",
            description: "Our team builds modern and scalable web solutions using advanced technologies."
        },
        {
            icon: <Globe className="h-6 w-6 text-primary" />,
            title: "SEO Optimized Websites",
            description: "Every website is optimized for Google ranking and performance."
        },
        {
            icon: <Shield className="h-6 w-6 text-primary" />,
            title: "Secure Development",
            description: "Secure coding practices and modern architecture for safe applications."
        }
    ]

    const technologies = [
        "React", "Next.js", "Node.js", "PHP", "Laravel", "MongoDB", "MySQL", "TailwindCSS",
        "TypeScript", "GraphQL", "Docker", "AWS", "Vue.js", "Python", "Django", "PostgreSQL"
    ]

    const processSteps = [
        { step: "Discovery", description: "Understanding your requirements" },
        { step: "Planning", description: "Strategic project roadmap" },
        { step: "Design", description: "UI/UX wireframing" },
        { step: "Development", description: "Coding & implementation" },
        { step: "Testing", description: "Quality assurance" },
        { step: "Launch", description: "Deployment & support" }
    ]

    const faqs = [
        {
            question: "What web development services do you offer?",
            answer: "We provide custom website development, ecommerce solutions, web applications and UI/UX design services. Our team specializes in creating responsive, scalable, and secure web solutions tailored to your business needs."
        },
        {
            question: "How long does it take to develop a website?",
            answer: "A typical business website takes 2-4 weeks depending on the project complexity. Ecommerce platforms may take 4-8 weeks, while complex web applications can take 2-3 months. We provide detailed timelines during our initial consultation."
        },
        {
            question: "Do you build ecommerce websites?",
            answer: "Yes, we develop modern ecommerce platforms with payment gateway integration, inventory management, and secure checkout processes. We work with platforms like Shopify, WooCommerce, and custom solutions."
        },
        {
            question: "What technologies do you specialize in?",
            answer: "We specialize in modern technologies including React, Next.js, Node.js, Laravel, and various databases. We choose the best tech stack based on your project requirements and scalability needs."
        }
    ]

    return (
        <div className="w-full">

            {/* HERO SECTION - Enhanced with gradient and better spacing */}
            <section className="relative py-24 overflow-hidden  bg-center " style={{ backgroundImage: "url('/images/web-development-services.png')" }}>
                {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" /> */}
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container relative mx-auto px-6 text-center"  >
                    <Badge className="mb-6" variant="outline">Web Development Experts</Badge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        Professional Web Development Services
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                        Build scalable, secure and SEO-optimized websites with SQROCK IT
                        Solutions. We create high-performance web applications and
                        business websites for startups and enterprises.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href='/getquote'>
                            <Button size="lg" className="group">
                                Get Free Consultation
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" size="lg">
                                View Portfolio
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">150+</div>
                            <div className="text-sm text-muted-foreground">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">98%</div>
                            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">24/7</div>
                            <div className="text-sm text-muted-foreground">Support Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">5+</div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION - Enhanced with icons and better cards */}
            <section className="py-24 bg-muted/40">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="secondary">What We Offer</Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Our Web Development Services
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive web solutions tailored to your business needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <CardHeader>
                                    <div className="mb-4">{service.icon}</div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE SECTION - Enhanced with icons */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="secondary">Why Us</Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Why Choose SQROCK
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We combine expertise with innovation to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                                <CardContent className="pt-8">
                                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* TECHNOLOGIES SECTION - Enhanced with more tech and better layout */}
            <section className="py-24 bg-muted/40">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <Badge className="mb-4" variant="secondary">Tech Stack</Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Technologies We Use
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Modern tools and frameworks for cutting-edge web solutions
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                        {technologies.map((tech, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION - Enhanced with descriptions and better visuals */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4" variant="secondary">Our Process</Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Our Development Process
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A systematic approach to deliver high-quality web solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {processSteps.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                        {index + 1}
                                    </div>
                                    {index < processSteps.length - 1 && (
                                        <ChevronRight className="hidden lg:block absolute top-3 -right-3 text-muted-foreground/30 w-4 h-4" />
                                    )}
                                </div>
                                <h3 className="font-semibold mb-1">{item.step}</h3>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION - Enhanced with better styling */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary to-primary" />
                <div className="container relative mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4 ">
                        Start Your Web Development Project Today
                    </h2>
                    <p className=" text-lg mb-8 max-w-2xl mx-auto">
                        Partner with SQROCK IT Solutions to build modern and scalable
                        web applications that drive business growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={'/getquote'}>
                            <Button size="lg" variant="ghost" className="group">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href={'/contact'} >
                            <Button size="lg" variant="outline" className="bg-transparent ">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION - Enhanced with more questions and better styling */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <Badge className="mb-4" variant="secondary">FAQ</Badge>
                        <h2 className="text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-muted-foreground">
                            Get answers to common questions about our web development services
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={String(index + 1)} className="border rounded-lg px-6">
                                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="text-center mt-8">
                        <p className="text-muted-foreground">
                            Still have questions? {" "}
                            <Link href={'/contact'}>
                                <Button variant="link" className="p-0 h-auto font-semibold">
                                    Contact our support team
                                </Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}