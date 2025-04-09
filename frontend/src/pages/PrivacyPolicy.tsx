import React from 'react';
import './PrivacyPolicy.css';
import Header from '../Homepage/Header';
import Footer from '../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className='privacy-policy-container'>
        <div className='privacy-policy'>
          <h1>Privacy Policy</h1>
          <div className='last-updated'>Last updated: April 9, 2025</div>

          <p>
            This Privacy Policy describes how CineNiche ("we", "our", or "us")
            collects, uses, and shares your personal information when you use
            our website or services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us,
            such as when you register for an account, sign up for a newsletter,
            or contact us.
          </p>
          <ul>
            <li>Account information (email address, name, etc.)</li>
            <li>Payment information</li>
            <li>Viewing preferences and activity</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Process transactions</li>
            <li>Improve user experience</li>
            <li>Send updates and promotional communications</li>
          </ul>

          <h2>Sharing of Information</h2>
          <p>We do not sell your personal information. We may share it with:</p>
          <ul>
            <li>Service providers (payment processors, analytics)</li>
            <li>Legal authorities when required by law</li>
            <li>Business transfers in case of merger or acquisition</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies to personalize content, provide social media
            features, and analyze our traffic. You can control the use of
            cookies in your browser settings.
          </p>

          <div className='gdpr-section'>
            <h2>What Are Your Privacy Rights? (GDPR/UK GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA) or the
              United Kingdom, you have certain rights under the GDPR and UK
              GDPR, including:
            </p>
            <ul>
              <li>The right to access the personal data we hold about you</li>
              <li>The right to correct any inaccurate or incomplete data</li>
              <li>The right to request deletion of your data</li>
              <li>
                The right to restrict or object to processing of your data
              </li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p>
              We rely on different legal bases to process your data, including
              your consent, legal obligations, and legitimate interests. We act
              as the “data controller” for information collected through our
              services in the EU and UK.
            </p>
            <p>
              You may contact your local supervisory authority if you believe
              our data practices violate applicable laws.
            </p>
          </div>

          <h2>Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary for the
            purposes set out in this policy and to comply with legal
            obligations.
          </p>

          <h2>Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to
            protect your personal information. However, no system is completely
            secure.
          </p>

          <h2>Children’s Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not
            knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will
            revise the "last updated" date at the top of this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at support@cineniche.com.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
