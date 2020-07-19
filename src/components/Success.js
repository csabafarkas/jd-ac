import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const Success = ({ completeProgress }) => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');
  const history = useHistory();
  axios.defaults.baseURL =
    'https://elated-torvalds-69c91d.netlify.app/.netlify/functions/server';

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        history.replace('/');
      }

      try {
        const res = await axios.get('/checkout-session?sessionId=' + sessionId);
        setSession(res);
        completeProgress();
      } catch (e) {
        history.replace('/');
      }
    }
    fetchSession();
  }, [sessionId]);

  return session ? (
    <div>
      <div className='sr-main'>
        <div className='sr-payment-summary completed-view'>
          <h1>Thank you for your purchase</h1>
          <p>Please check your emails with your purchase details.</p>
          <p>
            If you wish, you can book your appointment now using our online
            booking interface on this page.
          </p>
          <p>
            Should you not wish to book appointment now, please call us on 085
            758 5829 or 021 484 9999. Alternatively, you can send us an email to
            info@jdmotors.ie.
          </p>
        </div>
        <iframe
          className='booking'
          height='460px'
          width='370px'
          title='garage-assistant-booking'
          src='https://www.garage-booking-live.com/start.php?uid=BFE3596F5AB170B87D48OLBS'
        ></iframe>
        <script
          type='text/javascript'
          src='https://www.garage-booking-live.com/mobile_button.js?uid=BFE3596F5AB170B87D48OLBS'
          name='MobileButton'
          id='MobileButton'
        ></script>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Success;
