
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-unicorn-navy mb-6">Terms of Service</h1>
        
        <div className="prose prose-sm max-w-none text-gray-600">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">1. Introduction</h2>
            <p>Welcome to Unicorn Energies. These Terms of Service ("Terms") govern your use of our website, services, and products. By accessing or using Unicorn Energies, you agree to be bound by these Terms.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">2. Risk Disclosure</h2>
            <p className="font-bold">ALL INVESTMENTS CARRY RISK. Please read this section carefully.</p>
            <p>Investing in energy markets and related assets involves substantial risk of loss. Past performance is not indicative of future results. The value of investments can go down as well as up, and investors may not get back the amount invested.</p>
            <p>While Unicorn Energies will make every reasonable effort to protect your investment and deliver returns as projected, we cannot guarantee specific outcomes. The energy market is subject to numerous factors beyond our control, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Market volatility and price fluctuations</li>
              <li>Changes in government regulations and policies</li>
              <li>Global economic conditions</li>
              <li>Geopolitical events and conflicts</li>
              <li>Natural disasters and environmental concerns</li>
              <li>Technological disruptions</li>
            </ul>
            <p>Unicorn Energies cannot guarantee that adverse market conditions will not result in loss of principal. We strongly advise that you do not invest funds that you cannot afford to lose.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">3. Investor Suitability</h2>
            <p>Our investment products may not be suitable for all investors. Before making any investment decision, you should:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Consider your financial situation, investment objectives, and risk tolerance</li>
              <li>Consult with independent financial, legal, and tax advisors</li>
              <li>Review all available information about our investment opportunities</li>
              <li>Understand that investments should only represent a reasonable portion of your overall portfolio</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">4. Account Registration</h2>
            <p>To use certain features of Unicorn Energies, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            <p>You are responsible for safeguarding your account password and for any activities or actions under your account. Unicorn Energies will not be liable for any losses or damages arising from your failure to comply with this section.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">5. Investment Terms</h2>
            <p>Each investment opportunity may have specific terms, including minimum investment amounts, lock-up periods, withdrawal conditions, and fee structures. These specific terms will be provided to you before you make an investment decision.</p>
            <p>Unicorn Energies reserves the right to modify investment terms for future investments, but will not retroactively change terms for existing investments unless required by law.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">6. Fees and Expenses</h2>
            <p>Unicorn Energies charges management fees, performance fees, and other expenses related to operating our investment platform. The fee structure will be disclosed to you prior to investment.</p>
            <p>We reserve the right to modify our fee structure at any time, with notice to investors.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">7. Withdrawals</h2>
            <p>Withdrawal requests are subject to the specific terms of each investment plan, including lock-up periods and withdrawal fee percentages. Unicorn Energies will process withdrawal requests in a timely manner, but we cannot guarantee processing times due to factors outside our control.</p>
            <p>Unicorn Energies reserves the right to temporarily suspend withdrawals in extraordinary market circumstances or if we suspect fraudulent activity.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">8. Intellectual Property</h2>
            <p>The Unicorn Energies website, logo, content, and technology platform are protected by copyright, trademark, and other intellectual property laws. You may not modify, reproduce, or create derivative works based on any content or technology from our platform without express written consent.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">9. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, UNICORN ENERGIES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
              <li>ANY INVESTMENT DECISIONS MADE BASED ON INFORMATION PROVIDED BY UNICORN ENERGIES</li>
              <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">11. Changes to Terms</h2>
            <p>Unicorn Energies reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-unicorn-navy mb-4">12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at texasunic@gmail.com.</p>
          </section>
          
          <div className="mt-10 text-center text-xs text-gray-500">
            <p>Last Updated: April 14, 2025</p>
            <p>© 2025 Unicorn Energies. All rights reserved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
