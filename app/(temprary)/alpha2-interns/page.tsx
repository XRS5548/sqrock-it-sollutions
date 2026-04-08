"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { registerUser } from "./actions"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Code2, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle,
  Rocket,
  GraduationCap,
  Briefcase,
  Target,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Calendar,
  MapPin
} from "lucide-react";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  college: z.string().min(2, "College name is required"),
  branch: z.string().min(2, "Branch is required"),
  year: z.string().min(1, "Year is required"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("college", data.college);
    formData.append("branch", data.branch);
    formData.append("year", data.year);

    const result = await registerUser(formData);

    if (result.success) {
      toast.success("Successfully Registered!", {
        description: result.message,
        icon: <CheckCircle className="h-5 w-5" />,
      });
      reset();
      setIsOpen(false);
    } else {
      toast.error("Registration Failed", {
        description: result.error,
      });
    }
    
    setIsLoading(false);
  };

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Free Training",
      description: "Complete industry-ready training at zero cost",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Real Projects",
      description: "Work on live projects from real companies",
      gradient: "from-yellow-500/20 to-amber-500/20",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certificate",
      description: "Get certified and boost your resume",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Join a community of 5000+ engineers",
      gradient: "from-amber-500/20 to-yellow-500/20",
    },
  ];

  const benefits = [
    {
      title: "Industry Expert Mentors",
      description: "Learn from engineers working at top tech companies including Google, Microsoft, and Amazon",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Placement Assistance",
      description: "Get help with resume building, mock interviews, and direct referral opportunities",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Practical Learning",
      description: "80% hands-on projects, 20% theory with real-world case studies",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Lifetime Access",
      description: "Get lifetime access to all course materials and recorded sessions",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Industry Recognition",
      description: "Get recognized by 500+ partner companies for internship completion",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Flexible Schedule",
      description: "Learn at your own pace with weekend and weekday batches available",
      icon: <Calendar className="h-6 w-6" />,
    },
  ];

  const faqs = [
    {
      question: "Is the training really free?",
      answer: "Yes, the Alpha 2 Internship Program is completely free for all selected candidates. We believe in providing quality education accessible to everyone. No hidden charges, no credit card required.",
    },
    {
      question: "What is the duration of the program?",
      answer: "The program runs for 3 months with flexible learning schedules. You'll need to dedicate 10-15 hours per week. Weekend batches are also available for working professionals.",
    },
    {
      question: "Who can apply?",
      answer: "Engineering students from any branch (CS, IT, ECE, Mechanical, Civil, Electrical, etc.) who are in their 2nd, 3rd, or final year can apply. Recent graduates are also welcome.",
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes, upon successful completion of the program and projects, you'll receive a verified certificate that is recognized by 500+ industry partners.",
    },
    {
      question: "Are there any prerequisites?",
      answer: "Basic programming knowledge is recommended. We'll start with fundamentals and gradually move to advanced topics. A laptop with internet connection is required.",
    },
    {
      question: "How are the classes conducted?",
      answer: "Classes are conducted live online with interactive sessions, recorded for later access. You'll also get access to our exclusive Discord community for 24/7 support.",
    },
  ];

  const stats = [
    { value: "5000+", label: "Students Trained", icon: <Users className="h-5 w-5" /> },
    { value: "85%", label: "Placement Rate", icon: <TrendingUp className="h-5 w-5" /> },
    { value: "200+", label: "Partner Companies", icon: <Briefcase className="h-5 w-5" /> },
    { value: "50+", label: "Expert Mentors", icon: <Star className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
            <span className="text-sm text-amber-400 font-medium">🔥 Limited Seats Available for 2025 Batch</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Alpha 2
            </span>
            <br />
            <span className="text-white">Internship Program</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Free Industry-Ready Training for Engineers • Real Projects • Guaranteed Certification
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold text-lg px-8 shadow-lg shadow-amber-500/25">
                  Apply Now - Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300">
              Watch Demo
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats Section in Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                  {stat.icon}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Decorative Image */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-amber-400">Alpha 2</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to kickstart your career in tech
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className={`bg-gradient-to-br ${feature.gradient} from-gray-900 to-black border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1`}>
                <CardHeader>
                  <div className="mb-4 text-amber-400">{feature.icon}</div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
                <span className="text-sm text-amber-400">About the Program</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Bridge the Gap Between <span className="text-amber-400">Academia & Industry</span>
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Alpha 2 Internship Program is designed to bridge the gap between academic learning and industry requirements. We provide hands-on training on cutting-edge technologies with real-world projects from actual companies.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our program has successfully trained over 5000+ engineering students, with 85% of them securing placements in top tech companies within 6 months of completion.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-300">Industry-aligned curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-300">Live project experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-300">1-on-1 mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-gray-300">Placement preparation</span>
                </div>
              </div>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold">
                    Secure Your Spot
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden">
                <div className="relative h-80 md:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Students collaborating on coding project"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-500/30">
                    <p className="text-amber-400 text-sm font-medium">✨ 5000+ Engineers Trained</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid with Image Background */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop"
            alt="Code background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You'll <span className="text-amber-400">Gain</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive benefits designed for your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="text-amber-400 p-2 bg-amber-500/10 rounded-lg h-12 w-12 flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Life at <span className="text-amber-400">Alpha 2</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join a community of passionate learners and innovators
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop"
                alt="Workshop session"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-medium">Interactive Workshops</p>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop"
                alt="Mentorship session"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-medium">Expert Mentorship</p>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-medium">Team Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-950/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-amber-400">Questions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about the program
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                  <AccordionTrigger className="text-left text-white hover:text-amber-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Image */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 border border-amber-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=400&fit=crop"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg mb-6 text-gray-300 max-w-2xl mx-auto">
                Join 5000+ engineers who transformed their careers with Alpha 2 Internship Program
              </p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold text-lg px-8 shadow-lg shadow-amber-500/25">
                    Apply Now - Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
              </Dialog>
              <p className="text-xs text-gray-500 mt-4">Limited seats available • No credit card required</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Register for Alpha 2
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Fill in your details to secure your spot
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <Label htmlFor="college" className="text-gray-300">College Name</Label>
              <Input
                id="college"
                {...register("college")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="ABC College of Engineering"
              />
              {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college.message}</p>}
            </div>
            <div>
              <Label htmlFor="branch" className="text-gray-300">Branch</Label>
              <Input
                id="branch"
                {...register("branch")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="Computer Science"
              />
              {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch.message}</p>}
            </div>
            <div>
              <Label htmlFor="year" className="text-gray-300">Year of Study</Label>
              <Input
                id="year"
                {...register("year")}
                className="bg-gray-800 border-gray-700 text-white focus:border-amber-500"
                placeholder="3rd Year"
              />
              {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold"
            >
              {isLoading ? "Registering..." : "Register Now"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}