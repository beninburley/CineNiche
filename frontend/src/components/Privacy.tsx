import React from 'react';
import '../pages/Homepage.css';

const Privacy: React.FC = () => {
  return (
    <section className='hero-banner'>
      <div className='hero-overlay'>
        <div className='hero-content'>
          <br></br>

          <p className='hero-description'>
            Your privacy is important to us. It is our policy to respect your
            privacy regarding any information we may collect from you across our
            website, and other sites we own and operate.
          </p>
          <h2 className='hero-title'>Information We Collect</h2>
          <p className='hero-description'>
            We collect information such as your name, contact information, and
            any other information you provide us when you use our services.
          </p>
          <h2 className='hero-title'>Use of Information</h2>
          <p className='hero-description'>
            The information we collect is used to provide, maintain, and improve
            our services, as well as to develop new ones. We also use the
            information to communicate with you and personalize our services for
            you.
          </p>
          <h2 className='hero-title'>Sharing of Information</h2>
          <p className='hero-description'>
            We do not share your personal information with third parties, except
            as necessary to provide our services, comply with the law, or
            protect our rights.
          </p>
          <h2 className='hero-title'>Security</h2>
          <p className='hero-description'>
            We take measures to protect the security of your personal
            information. However, no method of transmission over the Internet or
            method of electronic storage is completely secure.
          </p>
          <h2 className='hero-title'>Changes to This Policy</h2>
          <p className='hero-description'>
            We may update our Privacy Policy from time to time. We encourage you
            to review this policy periodically for any changes.
          </p>
          <h2 className='hero-title'>Contact Us</h2>
          <p className='hero-description'>
            If you have any questions about our privacy practices or this
            policy, please contact us.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
