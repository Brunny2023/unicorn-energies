
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-unicorn-navy mb-6">Privacy Policy</h1>
        
        <div className="prose prose-sm max-w-none text-gray-600">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">1. Introduction</h2>
            <p>At Unicorn Energies, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            <p>Please read this Privacy Policy carefully. By accessing or using Unicorn Energies, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-unicorn-navy mb-2">Personal Information:</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Register for an account</li>
              <li>Complete investment or withdrawal forms</li>
              <li>Submit support tickets or contact us</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to surveys or participate in promotions</li>
            </ul>
            <p>This information may include, but is not limited to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Date of birth</li>
              <li>Financial information (for investment purposes)</li>
              <li>Government-issued identification (for compliance with KYC/AML regulations)</li>
            </ul>
            
            <h3 className="text-lg font-medium text-unicorn-navy mb-2">Automatically Collected Information:</h3>
            <p>When you visit our website or use our platform, we may automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Access times and dates</li>
              <li>Referring website addresses</li>
              <li>Pages viewed on our site</li>
              <li>Device information</li>
            </ul>
            
            <h3 className="text-lg font-medium text-unicorn-navy mb-2">Cookies and Similar Technologies:</h3>
            <p>We use cookies, web beacons, and similar tracking technologies to enhance your user experience, analyze usage patterns, and tailor content to your preferences. You can control cookie settings through your browser preferences.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and manage your investments</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Communicate with you about your account and investments</li>
              <li>Send you updates, newsletters, and marketing materials (with opt-out options)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns and improve our website and services</li>
              <li>Customize your experience and deliver personalized content</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">4. Information Sharing and Disclosure</h2>
            <p>Unicorn Energies does not sell, rent, or trade your personal information with third parties for their marketing purposes. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in providing our services, including payment processors, identity verification services, cloud hosting providers, and customer support tools.</li>
              <li><strong>Business Partners:</strong> Trusted partners who help us operate our business and deliver services.</li>
              <li><strong>Legal and Regulatory Authorities:</strong> When required by law, court order, or governmental regulation.</li>
              <li><strong>Corporate Transactions:</strong> In connection with a merger, acquisition, or sale of assets, where your information may be transferred as a business asset.</li>
            </ul>
            <p>All third parties with whom we share your information are required to protect your personal information in accordance with applicable laws and regulations.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, disclosure, or destruction.</p>
            <p>While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
            <p>When we no longer need to process your personal information, we will securely delete or anonymize it.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights with respect to your personal information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
              <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
              <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, machine-readable format.</li>
              <li><strong>Objection:</strong> You can object to our processing of your personal information.</li>
              <li><strong>Withdrawal of Consent:</strong> You can withdraw consent where processing is based on consent.</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">8. International Data Transfers</h2>
            <p>Your personal information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from those in your country.</p>
            <p>By using our services, you consent to the transfer of your information to countries outside your country of residence, including the United States.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">9. Children's Privacy</h2>
            <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from children. If we learn that we have collected personal information from a child, we will delete it promptly.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the bottom of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">11. Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
            <p>Email: privacy@unicorn-energies.com</p>
            <p>Postal Address: 123 Investment St, Financial District, NY 10004</p>
            <p>Phone: +1 (555) 123-4567</p>
          </section>
          
          <div className="mt-10 text-center text-xs text-gray-500">
            <p>Last Updated: April 13, 2025</p>
            <p>© 2025 Unicorn Energies. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
