import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, Mail, Globe, Cookie, UserCheck, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Privacy Policy
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
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-medium">
                  Welcome to <strong className="font-bold text-primary">sqrock.cloud</strong> ("we", "our", "us"). 
                  Your privacy is critically important to us. This Privacy Policy explains how we collect, 
                  use, disclose, and protect your information when you visit or use our website and services.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Sections */}
          <div className="space-y-10">
            {[
              {
                title: "1. Information We Collect",
                icon: <Eye className="h-5 w-5" />,
                content: "We collect information to provide better services to all our users. The types of information we collect include:",
                items: [
                  {
                    title: "Personal Information",
                    description: "Name, email address, phone number, and address provided during account creation or inquiries.",
                    important: true
                  },
                  {
                    title: "Account Information",
                    description: "Username, password (encrypted), profile preferences, and service usage history.",
                    important: false
                  },
                  {
                    title: "Payment Information",
                    description: "Payment-related details processed securely through third-party payment gateways. We do not store full payment card details.",
                    warning: true
                  }
                ],
                note: "We do not knowingly collect sensitive personal data such as government-issued IDs, biometric data, gender, or date of birth unless absolutely necessary for service delivery."
              },
              {
                title: "2. How We Use Your Information",
                icon: <UserCheck className="h-5 w-5" />,
                content: "Your information helps us provide, improve, and protect our services. We use collected data to:",
                list: [
                  "Provide, operate, and maintain our services",
                  "Communicate with you regarding business, services, or support",
                  "Process payments and manage transactions securely",
                  "Improve website functionality and user experience",
                  "Comply with legal and regulatory obligations",
                  "Protect against fraud and unauthorized access",
                  "Send service-related updates and notifications"
                ]
              },
              {
                title: "3. Cookies and Tracking Technologies",
                icon: <Cookie className="h-5 w-5" />,
                content: "We use cookies and similar tracking technologies to enhance your experience and analyze website performance.",
                details: "Cookies help us understand how you interact with our website, remember your preferences, and provide personalized content. You can control or disable cookies through your browser settings, though some features may not function properly without them.",
                types: [
                  { name: "Essential Cookies", purpose: "Required for basic website functionality" },
                  { name: "Analytics Cookies", purpose: "Help us understand website usage patterns" },
                  { name: "Preference Cookies", purpose: "Remember your settings and preferences" }
                ]
              },
              {
                title: "4. Data Sharing and Disclosure",
                icon: <Globe className="h-5 w-5" />,
                content: "We value your trust and are committed to protecting your privacy. We do not sell or rent your personal information.",
                disclosure: "We may share your information only in the following cases:",
                list: [
                  "With trusted third-party payment gateways for processing transactions",
                  "When required by law, regulation, or legal process",
                  "To protect our rights, property, or safety and that of our users",
                  "With service providers who assist in our operations (under strict confidentiality agreements)",
                  "During business transfers such as mergers or acquisitions"
                ],
                note: "All third-party partners are vetted for security and privacy compliance."
              },
              {
                title: "5. Data Security",
                icon: <Lock className="h-5 w-5" />,
                content: "We implement comprehensive security measures to protect your personal information.",
                measures: [
                  "Secure servers with encryption",
                  "HTTPS protocol for all communications",
                  "Regular security audits and vulnerability assessments",
                  "Access controls and authentication mechanisms",
                  "Data backup and disaster recovery procedures"
                ],
                warning: "While we implement robust security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security."
              },
              {
                title: "6. Data Retention",
                icon: <Shield className="h-5 w-5" />,
                content: "We retain your personal information only as long as necessary for legitimate business purposes.",
                retention: "Our standard retention periods are:",
                periods: [
                  { type: "Active Accounts", duration: "5 years from last activity" },
                  { type: "Payment Records", duration: "7 years for tax and legal compliance" },
                  { type: "Support Inquiries", duration: "3 years from resolution" },
                  { type: "Marketing Data", duration: "2 years or until you opt-out" }
                ],
                note: "You may request deletion of your data at any time, subject to legal requirements."
              },
              {
                title: "7. Your Rights",
                icon: <UserCheck className="h-5 w-5" />,
                content: "You have control over your personal data. Your rights include:",
                rights: [
                  { right: "Access", description: "Review the personal information we hold about you" },
                  { right: "Correction", description: "Request updates or corrections to inaccurate data" },
                  { right: "Deletion", description: "Request deletion of your personal data" },
                  { right: "Objection", description: "Object to certain data processing activities" },
                  { right: "Portability", description: "Receive your data in a structured, commonly used format" },
                  { right: "Withdraw Consent", description: "Withdraw consent at any time where applicable" }
                ],
                action: "To exercise these rights, please contact us using the information below."
              },
              {
                title: "8. Children's Privacy",
                icon: <AlertCircle className="h-5 w-5" />,
                content: "Our services are not intended for individuals under the age of 18.",
                warning: "We do not knowingly collect personal information from minors. If we become aware that we have collected such data, we will take steps to delete it promptly."
              },
              {
                title: "9. International Users",
                icon: <Globe className="h-5 w-5" />,
                content: "Our website operates from India and is governed by applicable Indian laws.",
                note: "While we do not specifically target users in regions governed by GDPR or CCPA, we follow generally accepted data protection best practices and respect international privacy standards."
              },
              {
                title: "10. Changes to This Privacy Policy",
                icon: <Mail className="h-5 w-5" />,
                content: "We may update this Privacy Policy periodically to reflect changes in our practices.",
                update: "When we make significant changes, we will:",
                list: [
                  "Update the 'Last Updated' date at the top of this page",
                  "Post a prominent notice on our website",
                  "Notify registered users via email for major changes"
                ],
                note: "Continued use of our services after changes constitutes acceptance of the updated policy."
              }
            ].map((section, index) => (
              <section key={index} className="relative pl-8 border-l-2 border-primary/20 hover:border-primary/40 transition-colors group">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <div className="text-primary">
                    {section.icon}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {section.title}
                  {section.title === "5. Data Security" && (
                    <span className="inline-flex items-center gap-1 text-xs font-normal bg-green-500/10 text-green-700 px-2 py-1 rounded-full">
                      <Lock className="h-3 w-3" />
                      Secure
                    </span>
                  )}
                </h2>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">{section.content}</p>
                  
                  {section.items && (
                    <div className="grid gap-3 mt-4">
                      {section.items.map((item, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${item.warning ? 'bg-amber-500/5 border-amber-200' : 'bg-muted/30 border-border'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{item.title}</span>
                            {item.important && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Required</span>
                            )}
                            {item.warning && (
                              <span className="text-xs bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded-full">Sensitive</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.list && (
                    <ul className="space-y-2 mt-3">
                      {section.list.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {section.details && <p className="text-sm text-muted-foreground mt-3">{section.details}</p>}
                  
                  {section.types && (
                    <div className="grid gap-2 mt-4">
                      {section.types.map((type, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                          <span className="font-medium text-sm">{type.name}</span>
                          <span className="text-xs text-muted-foreground">{type.purpose}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.disclosure && (
                    <>
                      <p className="font-medium mt-4">{section.disclosure}</p>
                    </>
                  )}
                  
                  {section.measures && (
                    <div className="grid gap-2 mt-4">
                      {section.measures.map((measure, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{measure}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.retention && (
                    <>
                      <p className="font-medium mt-4">{section.retention}</p>
                      <div className="grid gap-2 mt-2">
                        {section.periods.map((period, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 border rounded">
                            <span className="text-sm font-medium">{period.type}</span>
                            <span className="text-sm bg-muted px-2 py-1 rounded">{period.duration}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {section.rights && (
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      {section.rights.map((right, idx) => (
                        <div key={idx} className="p-3 border rounded-lg hover:border-primary/30 transition-colors">
                          <h4 className="font-semibold text-primary mb-1">{right.right}</h4>
                          <p className="text-xs text-muted-foreground">{right.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.warning && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {section.warning}
                      </p>
                    </div>
                  )}
                  
                  {section.update && (
                    <>
                      <p className="font-medium mt-4">{section.update}</p>
                    </>
                  )}
                  
                  {section.action && (
                    <p className="text-sm font-medium text-primary mt-3">{section.action}</p>
                  )}
                  
                  {section.note && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg border">
                      <p className="text-sm text-muted-foreground">{section.note}</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-xl border border-primary/20 mt-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mail className="h-6 w-6" />
              11. Contact Us
            </h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Data Protection Officer</h3>
                    <p className="font-medium text-lg">Rohit Verma</p>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Email Address</h3>
                    <a 
                      href="mailto:sqrock.business@outlook.com" 
                      className="font-medium text-lg text-primary hover:underline transition-colors"
                    >
                      sqrock.business@outlook.com
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Registered Address</h3>
                    <p className="font-medium">Jaipur, Rajasthan, India</p>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Response Time</h3>
                    <p className="font-medium">Within 48 hours for privacy-related inquiries</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">When contacting us about privacy matters, please include:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Your full name and contact information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Details of your request or concern
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Any relevant account information
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}