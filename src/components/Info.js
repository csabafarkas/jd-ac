import React, { useState } from 'react';
import acSticker from '../images/ac-type.png';

export default function Info({ handleNextClick }) {
  const [showFullImage, setShowFullImage] = useState(false);
  const fullImage = showFullImage ? (
    <div
      className='full-image-container'
      onClick={() => setShowFullImage(false)}
    >
      <img alt='A/C sticker' src={acSticker}></img>
    </div>
  ) : null;
  return (
    <>
      {fullImage}
      <div className='info-container'>
        <div className='info-container--banner'>
          <h2>Are you an electric or hybrid car owner?</h2>
          <p>
            Before you purchase an A/C service online, please contact us on{' '}
            <b>085 758 5829</b> or <b>021 484 9999</b> or
            <a href='http://jdmotors.ie/contact-us/'>
              &nbsp;contact us on our website.
            </a>
          </p>
        </div>
        <div className='info-container--steps'>
          <h2>Book your A/C refill service in 3 easy steps!</h2>
          <ol>
            <li>
              Select the service you want to purchase based on the type of
              refrigerant in your car.
              <div className='info-container--ac-type'>
                <div>
                  A/C systems use one two types of refrigerants: type{' '}
                  <b>R134A</b> or type <b>R1234YF</b>. You can easily find out
                  what type of gas your vehicle uses by reading your car's
                  manual or lifting your bonnet and look for a sticker with your
                  A/C information.
                </div>
                <img
                  alt='A/C sticker'
                  src={acSticker}
                  onClick={() => setShowFullImage(true)}
                ></img>
              </div>
            </li>
            <li>Pay via our secure Stripe payment gateway</li>
            <li>Book your appointment online</li>
          </ol>
        </div>
        <div className='info--button-container'>
          <button onClick={() => handleNextClick({ progress: 50 })}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
