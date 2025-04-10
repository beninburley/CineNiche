import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// This component asks the user if they will accept cookies and determines what to do

function CookieAsk() {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('userConsent');
    if (consent === undefined) {
      setShouldShowBanner(true);
      console.log('User has not made a cookie choice yet.');
    } else if (consent === 'true') {
      console.log('User accepted cookies.');
    } else if (consent === 'false') {
      console.log('User declined cookies.');
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('userConsent', 'true', { expires: 150 });
    console.log('Cookies accepted');
    setShouldShowBanner(false);
  };

  const handleDecline = () => {
    Cookies.set('userConsent', 'false', { expires: 150 });
    console.log('Cookies declined');
    setShouldShowBanner(false);
  };

  const handleClose = () => {
    console.log('User dismissed the cookie banner.');
    setShouldShowBanner(false); // No cookie is set
  };

  return (
    <>
      {shouldShowBanner && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            background: '#2B373B',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 9999,
            color: 'white',
            fontSize: '14px',
          }}
        >
          <div>
            This website uses cookies only for authentication purposes. No
            tracking or analytics cookies are used.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleDecline}
              style={{
                background: '#aaa',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              style={{
                background: 'gold',
                color: 'black',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Accept
            </button>
            <button
              onClick={handleClose}
              style={{
                background: '#444',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
              aria-label='Close cookie banner'
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieAsk;
