import React from 'react';
import snowflake from '../images/snowflake.png';

export default function LoadingSpinner() {
  return (
    <div className='loading-spinner'>
      <img className='snowflake' src={snowflake} alt='rotating-snowflake' />
      <p>Loading...</p>
    </div>
  );
}
