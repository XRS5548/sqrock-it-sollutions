import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function TermsAndConditionsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="container mx-auto max-w-4xl py-10 px-4">
      <Card className="shadow-lg border-border/40">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Terms & Conditions
          </CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-1 w-10 bg-primary/30 rounded-full"></div>
            <p className="text-sm text-muted-foreground font-medium">
              Last updated: <span className="font-semibold text-foreground">{lastUpdated}</span>
            </p>
            <div className="h-1 w-10 bg-primary/30 rounded-full"></div>
          </div>
        </CardHeader>

        <Separator className="mb-2" />

        <CardContent className="space-y-8 leading-relaxed text-base py-6">
          {/* Introduction */}
          <section className="bg-muted/30 p-6 rounded-lg border">
            <p className="text-lg font-medium">
              Welcome to <strong className="font-bold text-primary">sqrock.cloud</strong> ("sqrock.cloud", "we", "our", or "us"). 
              By accessing or using this website and our services, you agree to comply with and be bound by the following 
              Terms and Conditions. If you do not agree with these terms, please do not use our website.
            </p>
          </section>

          {/* Terms Sections */}
          <div className="space-y-10">
            {[
              {
                title: "1. Use of the Website",
                content: "You agree to use this website only for lawful purposes and in a manner that does not violate any applicable laws or regulations. You must not misuse the website, attempt unauthorized access, or interfere with the website's functionality or security.",
                icon: "✅",
              },
              {
                title: "2. User Accounts",
                content: "To access certain features of sqrock.cloud, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
              },
              {
                title: "3. Services",
                content: "sqrock.cloud provides online services and solutions. We reserve the right to modify, suspend, or discontinue any part of the services at any time without prior notice.",
              },
              {
                title: "4. Payments",
                content: "Certain services may require payment. All payments are processed securely through third-party payment gateways. sqrock.cloud does not store your complete payment details and is not responsible for issues arising from payment gateway providers.",
                warning: true,
              },
              {
                title: "5. Intellectual Property",
                content: "All content on this website, including text, graphics, logos, designs, and software, is the property of sqrock.cloud unless otherwise stated. You may not copy, reproduce, or distribute any content without prior written permission.",
              },
              {
                title: "6. Prohibited Activities",
                content: "You agree not to:",
                list: [
                  "Use the website for illegal or unauthorized purposes",
                  "Attempt to hack, damage, or disrupt the website or its services",
                  "Upload malicious code, viruses, or harmful content",
                  "Violate the rights of other users or third parties",
                  "Use automated systems or bots without permission",
                  "Impersonate any person or entity",
                ],
                warning: true,
              },
              {
                title: "7. Limitation of Liability",
                content: "sqrock.cloud shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website or services. Use of the website is at your own risk.",
              },
              {
                title: "8. Termination",
                content: "We reserve the right to suspend or terminate your access to the website or services at any time, without notice, if you violate these Terms and Conditions.",
              },
              {
                title: "9. Governing Law",
                content: "These Terms and Conditions are governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan.",
              },
              {
                title: "10. Changes to These Terms",
                content: "sqrock.cloud reserves the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. We will notify users of significant changes via email or website notification.",
              },
            ].map((section, index) => (
              <section key={index} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  {section.title}
                  {section.warning && (
                    <span className="inline-flex items-center gap-1 text-sm font-normal bg-amber-500/10 text-amber-700 px-2 py-1 rounded-full">
                      <AlertCircle className="h-3 w-3" />
                      Important
                    </span>
                  )}
                </h2>
                
                <p className="text-muted-foreground mb-3">{section.content}</p>
                
                {section.list && (
                  <ul className="space-y-2 mt-4">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary/60 mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="mb-4 text-muted-foreground">
              If you have any questions, concerns, or requests regarding these Terms and Conditions, please contact us:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Owner</h3>
                  <p className="font-medium">Rohit Verma</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Email</h3>
                  <a 
                    href="mailto:sqrock.business@outlook.com" 
                    className="font-medium text-primary hover:underline transition-colors"
                  >
                    sqrock.business@outlook.com
                  </a>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Address</h3>
                  <p className="font-medium">Jaipur, Rajasthan, India</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Response Time</h3>
                  <p className="font-medium">Within 2-3 business days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Acceptance Section */}
          <div className="text-center p-6 border-t">
            <p className="text-sm text-muted-foreground">
              By continuing to use our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}