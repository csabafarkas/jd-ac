import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';

import Checkout from './components/Checkout';
import Success from './components/Success';
import Canceled from './components/Canceled';
import NotFound from './components/NotFound';
import StepProgress from './components/StepProgress';
import Info from './components/Info';

import './css/normalize.css';
import './css/global.css';

function App() {
  const [progress, setProgress] = useState(0);
  const handleNextClick = ({ progress }) => {
    setProgress(progress);
  };
  return (
    <div className='sr-root'>
      <Header />
      <div className='step-progress'>
        <StepProgress percent={progress} />
      </div>
      <Router>
        <Switch>
          <Route exact path='/success.html'>
            <Success completeProgress={() => setProgress(100)} />
          </Route>
          <Route exact path='/canceled.html'>
            <Checkout />
          </Route>
          <Route exact path='/'>
            {progress === 0 ? (
              <Info handleNextClick={handleNextClick} />
            ) : (
              <Checkout />
            )}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
