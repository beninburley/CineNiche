import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // ✅ Add this
import './Logout.css';

function Logout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // ✅ Clear user-specific cookies
        Cookies.remove('userConsent');

        // ✅ Redirect to login
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <a className='logout' href='#' onClick={handleLogout}>
      {props.children}
    </a>
  );
}

export default Logout;
