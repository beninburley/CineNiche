import { Link } from 'react-router-dom';
import './Footer.css'; // Link to your CSS file for this component

function Footer() {
  return (
    <footer className='landing-footer'>
      <p>
        &copy; 2025 CineNiche •{' '}
        <Link to='/privacy-policy' className='footer-link'>
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
