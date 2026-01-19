import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Mail, 
  Home, 
  User, 
  Lock, 
  Cookie, 
  Eye, 
  Download, 
  AlertCircle,
  ChevronRight
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 18, 2024";

  // Helper function for class names
  const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-xl opacity-90">Effective Date: {lastUpdated}</p>
          </div>

          {/* Quick Navigation */}
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <ChevronRight className="h-5 w-5" />
              Quick Navigation
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { id: "introduction", label: "Introduction" },
                { id: "information", label: "Information We Collect" },
                { id: "usage", label: "How We Use Information" },
                { id: "cookies", label: "Cookies & Tracking" },
                { id: "sharing", label: "Data Sharing" },
                { id: "security", label: "Data Security" },
                { id: "retention", label: "Data Retention" },
                { id: "rights", label: "Your Rights" },
                { id: "children", label: "Children's Privacy" },
                { id: "contact", label: "Contact Us" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-10">
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Home className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Introduction</h2>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Welcome to <span className="font-bold text-blue-700">sqrock.cloud</span> ("Website," "we," "us," or "our"). 
                This Privacy Policy outlines how we collect, use, disclose, and protect your 
                information when you use our website located at{" "}
                <a 
                  href="https://sqrock.cloud/" 
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  https://sqrock.cloud/
                </a>.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                This Privacy Policy applies to all users of our Website, including visitors, 
                registered users, and customers. By accessing or using our Website, you agree 
                to the terms of this Privacy Policy.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
                <h3 className="font-bold text-gray-800 mb-2">Business Information</h3>
                <ul className="space-y-1 text-gray-700">
                  <li><span className="font-semibold">Business Owner:</span> Rohit Verma</li>
                  <li><span className="font-semibold">Business Address:</span> Jaipur, Rajasthan, India</li>
                  <li>
                    <span className="font-semibold">Contact Email:</span>{" "}
                    <a 
                      href="mailto:sqrock.business@outlook.com" 
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      sqrock.business@outlook.com
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Information We Collect */}
            <section id="information" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Data We Collect */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Data We Collect</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                      <span><strong>Personal Information:</strong> Name, email, phone, address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                      <span><strong>Contact Information:</strong> Phone for business communication only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                      <span><strong>Payment Information:</strong> Processed securely via third-party gateways</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full mt-2"></div>
                      <span><strong>Account Information:</strong> User credentials and profile details</span>
                    </li>
                  </ul>
                </div>

                {/* Data We DO NOT Collect */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4">Data We DO NOT Collect</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-red-600 rounded-full mt-2"></div>
                      <span>Sensitive personal data (government IDs, biometrics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-red-600 rounded-full mt-2"></div>
                      <span>Direct IP address tracking beyond technical needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-red-600 rounded-full mt-2"></div>
                      <span>Data from third-party sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-red-600 rounded-full mt-2"></div>
                      <span>Demographic data (gender, date of birth)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* How We Use Information */}
            <section id="usage" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How We Use Your Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Service Provision", desc: "To provide, maintain, and improve our services" },
                  { title: "Communication", desc: "For business, service, and support communication" },
                  { title: "Payment Processing", desc: "To securely process transactions via payment gateways" },
                  { title: "User Experience", desc: "To enhance and personalize your experience" },
                  { title: "Legal Compliance", desc: "To comply with applicable laws and regulations" },
                  { title: "Security", desc: "To protect against fraud and unauthorized access" },
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Cookies & Tracking */}
            <section id="cookies" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Cookies and Tracking Technologies</h2>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  Our Website uses cookies and similar tracking technologies to improve website 
                  functionality, remember user preferences, analyze traffic, and enhance user experience.
                </p>
                <p className="text-gray-700">
                  You can control cookie preferences through your browser settings. Disabling certain 
                  cookies may affect website functionality.
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Data Sharing */}
            <section id="sharing" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Data Sharing and Disclosure</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">With Trusted Third Parties</h3>
                  <p className="text-gray-700">
                    We share payment information only with trusted third-party payment gateways 
                    to process transactions. These partners are contractually obligated to protect 
                    your data.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-3">Legal Requirements</h3>
                  <p className="text-gray-700 mb-3">
                    We may disclose your information if required by law, court order, or 
                    governmental regulations, or to:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">• Comply with legal obligations</li>
                    <li className="flex items-center gap-2">• Protect our rights, property, or safety</li>
                    <li className="flex items-center gap-2">• Prevent fraud or security issues</li>
                    <li className="flex items-center gap-2">• Respond to legal requests</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">We Do NOT</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Sell Data</h4>
                      <p className="text-sm text-gray-600">We do not sell or rent personal data</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Unnecessary Sharing</h4>
                      <p className="text-sm text-gray-600">We don't share data without consent or legal basis</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Data Security */}
            <section id="security" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {[
                  "HTTPS encryption for data transmission",
                  "Secure server infrastructure",
                  "Regular security assessments",
                  "Access controls and authentication",
                  "Secure payment processing",
                  "Data encryption at rest",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-2">Important Security Notice</h3>
                    <p className="text-yellow-700">
                      While we implement robust security measures, no method of transmission over 
                      the Internet or electronic storage is 100% secure. We cannot guarantee 
                      absolute security but continuously work to maintain and improve our security 
                      practices.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Data Retention */}
            <section id="retention" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Retention</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  We retain your personal data only for as long as necessary to fulfill the 
                  purposes outlined in this Privacy Policy, meet legal obligations, resolve 
                  disputes, and enforce agreements.
                </p>
                <div className="bg-white p-5 rounded-lg border border-gray-300">
                  <h3 className="font-bold text-gray-800 mb-2">Retention Period</h3>
                  <p className="text-gray-700">
                    We typically retain user data for <strong>up to 5 years</strong> after the 
                    last interaction, unless a longer retention period is required by law or 
                    necessary for legitimate business purposes.
                  </p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* User Rights */}
            <section id="rights" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Download className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Your Rights and Choices</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Access", desc: "Request access to your personal data" },
                  { title: "Correction", desc: "Correct inaccurate or incomplete data" },
                  { title: "Deletion", desc: "Request deletion of your data" },
                  { title: "Opt-Out", desc: "Opt out of marketing communications" },
                  { title: "Data Portability", desc: "Get your data in machine-readable format" },
                  { title: "Withdraw Consent", desc: "Withdraw consent for data processing" },
                ].map((right, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
                    <h3 className="font-bold text-blue-700 mb-2">{right.title}</h3>
                    <p className="text-gray-600 text-sm">{right.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Children's Privacy */}
            <section id="children" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Children's Privacy</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-gray-700 mb-4">
                  Our Website is <strong>not intended</strong> for users under the age of 18. 
                  We do not knowingly collect personal information from minors.
                </p>
                <p className="text-gray-700">
                  If we become aware that we have collected personal data from a minor without 
                  verified parental consent, we will take steps to remove that information from 
                  our servers.
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Contact Information */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700">Business Owner</h4>
                        <p className="text-gray-800 text-lg">Rohit Verma</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Business Address</h4>
                        <p className="text-gray-800">Jaipur, Rajasthan, India</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Email</h4>
                        <a 
                          href="mailto:sqrock.business@outlook.com" 
                          className="text-blue-700 hover:text-blue-900 hover:underline text-lg font-medium"
                        >
                          sqrock.business@outlook.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-gray-800 mb-3">Response Time</h3>
                    <p className="text-gray-600 mb-4">
                      We strive to respond to all privacy-related inquiries within{" "}
                      <strong>7-10 business days</strong>.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        For urgent matters, please include "URGENT: Privacy Request" in your 
                        email subject line.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200"></div>

            {/* Policy Updates */}
            <section className="scroll-mt-24">
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Policy Updates</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of 
                  material changes by posting the updated policy on this page and updating the 
                  "Effective Date."
                </p>
                <div className="bg-white p-5 rounded-lg border border-gray-300">
                  <p className="text-gray-600 text-sm">
                    <strong>Last Updated:</strong> {lastUpdated}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 text-white p-6 text-center">
            <p className="text-lg font-semibold mb-2">Thank you for trusting sqrock.cloud</p>
            <p className="text-gray-300">
              We are committed to protecting your privacy and providing a secure experience.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} sqrock.cloud • All rights reserved
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <a 
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-lg"
          >
            Back to Top
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}