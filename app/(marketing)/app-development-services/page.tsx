import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  Apple, 
  Crosshair, 
  Palette,
  ChevronRight,
  Rocket,
  Code,
  TestTube,
  Layout,
  Lightbulb,
  CheckCircle2,
  Star,
  Users,
  Zap
} from "lucide-react"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Mobile App Development Services in India | Android & iOS | SQROCK",
  description:
    "SQROCK IT Solutions offers professional mobile app development services in India. We build Android apps, iOS apps, Flutter & React Native cross-platform apps for startups and businesses. 50+ apps delivered. Get a free quote today.",
  keywords: [
    "mobile app development company India",
    "Android app development India",
    "iOS app development India",
    "Flutter app development",
    "React Native app development",
    "cross platform app development",
    "app development services India",
    "mobile app development startup",
    "hire app developers India",
    "app development company Rajasthan",
  ],
  authors: [{ name: "SQROCK IT Solutions", url: "https://sqrock.cloud" }],
  creator: "SQROCK IT Solutions",
  publisher: "SQROCK IT Solutions",
  metadataBase: new URL("https://sqrock.cloud"),
  alternates: {
    canonical: "/app-development-services",
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
    url: "https://sqrock.cloud/app-development-services",
    siteName: "SQROCK IT Solutions",
    title: "Mobile App Development Services in India | SQROCK",
    description:
      "Build powerful Android, iOS & cross-platform mobile apps with SQROCK IT Solutions. 50+ apps delivered, 98% client satisfaction. Free consultation available.",
    images: [
      {
        url: "/images/app-development-services.png",
        width: 1200,
        height: 630,
        alt: "SQROCK Mobile App Development Services - Android, iOS & Flutter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Development Services in India | SQROCK",
    description:
      "Build powerful Android, iOS & cross-platform mobile apps with SQROCK IT Solutions. 50+ apps delivered. Get a free quote today.",
    images: ["/images/app-development-services.png"],
  },
  category: "technology",
}

export default function AppDevelopmentPage() {
  const services = [
    {
      icon: Smartphone,
      title: "Android App Development",
      description: "Build powerful Android applications with modern UI and smooth performance using Kotlin and Jetpack Compose.",
      features: ["Material Design", "Google Play Ready", "Optimized Performance"]
    },
    {
      icon: Apple,
      title: "iOS App Development",
      description: "Develop premium iOS apps with secure architecture and seamless user experience using Swift and SwiftUI.",
      features: ["Apple Design Awards", "App Store Ready", "Latest iOS Features"]
    },
    {
      icon: Crosshair,
      title: "Cross Platform Apps",
      description: "Create apps using Flutter and React Native to run on both Android and iOS platforms with a single codebase.",
      features: ["Cost Effective", "Faster Development", "Native Performance"]
    },
    {
      icon: Palette,
      title: "App UI / UX Design",
      description: "Design modern and intuitive mobile interfaces for better user engagement and retention.",
      features: ["User Research", "Interactive Prototypes", "Design Systems"]
    }
  ]

  const whyChoose = [
    {
      icon: Users,
      title: "Experienced App Developers",
      description: "Skilled team with 50+ successful app launches across various industries.",
      stats: "50+ Apps Delivered"
    },
    {
      icon: Zap,
      title: "Modern Technologies",
      description: "Using Flutter, React Native, Kotlin and Swift to build powerful, future-proof apps.",
      stats: "10+ Technologies"
    },
    {
      icon: Rocket,
      title: "Scalable Architecture",
      description: "Apps designed to handle growing users and business expansion with microservices.",
      stats: "99.9% Uptime"
    }
  ]

  const technologies = [
    { name: "Flutter", category: "Framework" },
    { name: "React Native", category: "Framework" },
    { name: "Kotlin", category: "Language" },
    { name: "Swift", category: "Language" },
    { name: "Firebase", category: "Backend" },
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "REST API", category: "API" },
    { name: "GraphQL", category: "API" },
    { name: "AWS", category: "Cloud" }
  ]

  const process = [
    { icon: Lightbulb, title: "Idea & Planning", description: "Requirements analysis and project roadmap" },
    { icon: Layout, title: "UI / UX Design", description: "Wireframes and interactive prototypes" },
    { icon: Code, title: "App Development", description: "Agile development with regular sprints" },
    { icon: TestTube, title: "Testing", description: "Quality assurance and user acceptance testing" },
    { icon: Rocket, title: "Launch", description: "Deployment and post-launch support" }
  ]

  const faqs = [
    {
      question: "How long does it take to build a mobile app?",
      answer: "Most mobile apps take 4-12 weeks depending on features and complexity. Simple apps can be ready in 4-6 weeks, while complex enterprise solutions may take 12-16 weeks. We'll provide a detailed timeline after your consultation."
    },
    {
      question: "Do you develop Android and iOS apps?",
      answer: "Yes, we build Android, iOS and cross-platform applications using modern frameworks. We can develop native apps for each platform or use cross-platform solutions like Flutter and React Native to save time and cost."
    },
    {
      question: "Do you provide app maintenance?",
      answer: "Yes, we provide comprehensive app maintenance including updates, bug fixing, performance optimization, and feature enhancements. We offer flexible maintenance packages to keep your app running smoothly."
    },
    {
      question: "How much does it cost to develop an app?",
      answer: "App development costs vary based on complexity, features, and platforms. Simple apps start from $10,000, while more complex solutions range from $25,000 to $50,000+. Contact us for a personalized quote."
    }
  ]

  return (
    <div className="w-full">

      {/* HERO */}
      <section
        className="relative py-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/app-development-services.png')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <Badge className="mb-6 bg-primary/90 text-secondary border-none px-4 py-2 text-sm">
            🚀 Mobile App Development Experts
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Ideas Into
            <span className="text-primary block mt-2">Powerful Mobile Apps</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
            Build powerful and scalable mobile applications with SQROCK IT
            Solutions. We create Android, iOS and cross-platform apps for
            startups and businesses.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="group">
              Start Your App Project
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20">
              View Portfolio
            </Button>
          </div>

          <div className="flex justify-center gap-8 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>50+ Apps Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Services</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive App Development Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer end-to-end mobile app development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-7 w-7 text-primary group-hover:text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Why SQROCK Stands Out
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with business understanding to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform" />
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{item.stats}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Tech Stack</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Technologies We Work With
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust and scalable applications
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-secondary transition-colors cursor-default group"
              >
                <span className="mr-2 opacity-50 group-hover:opacity-100">{tech.category}:</span>
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Process</Badge>
            <h2 className="text-4xl font-bold mb-4">
              How We Build Your App
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven development methodology that ensures quality and timely delivery
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-primary/20" />
            
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center relative">
                  <div className="w-20 h-20 rounded-full bg-primary text-secondary flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="bg-background rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Apps Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-sm opacity-90">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Mobile App?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Partner with SQROCK IT Solutions to create powerful mobile
            applications for your business. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Free Consultation
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our app development services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={index.toString()}
                className="border rounded-lg px-6 bg-card hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}