import CookieConsent, { Cookies } from 'react-cookie-consent';

function CookieAsk() {
  return (
    <CookieConsent
      location='bottom'
      buttonText='Accept'
      declineButtonText='Decline'
      enableDeclineButton
      cookieName='userConsent'
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      declineButtonStyle={{
        color: '#fff',
        fontSize: '13px',
        background: '#999',
      }}
      expires={150}
      onAccept={() => {
        console.log('Cookies accepted');
      }}
      onDecline={() => {
        console.log('Cookies declined');
      }}
    >
      We use cookies to enhance the user experience. By clicking "Accept", you
      consent to our use of cookies.
    </CookieConsent>
  );
}

export default CookieAsk;
