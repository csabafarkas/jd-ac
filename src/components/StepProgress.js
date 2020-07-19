import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { MdInfo, MdShoppingCart } from 'react-icons/md';
import { BsCalendarFill } from 'react-icons/bs';

export default function StepProgress({ percent }) {
  return (
    <ProgressBar
      filledBackground='linear-gradient(to right, #f04e31, #316af0)'
      percent={percent ?? 0}
    >
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div
            className={`transitionStep ${accomplished ? 'accomplished' : null}`}
          >
            {/* 🥵 */}
            <MdInfo />
          </div>
        )}
      </Step>
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div
            className={`transitionStep ${accomplished ? 'accomplished' : null}`}
          >
            {/* 🤔 */}
            <MdShoppingCart />
          </div>
        )}
      </Step>
      <Step transition='scale'>
        {({ accomplished, index }) => (
          <div
            className={`transitionStep ${accomplished ? 'accomplished' : null}`}
          >
            {/* ⛄ */}
            <BsCalendarFill />
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}
