import React, { Suspense } from 'react';
import './App.scss';
import ReactGA from 'react-ga';
import { Docs } from './docs/Docs';
import { Test } from './Test';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  if (window.location.hash === "#ui-demo")
  {
    const UI = React.lazy(() => import('./ui-demo/UI').then(({ UI }) => ({ default: UI })));
    return <Suspense fallback={<Loading />}><UI /></Suspense>
  }
  else if (window.location.hash === "#test")
  {
    return <Test />
  }
  
  return <Docs />
}

const Loading = () => (<span />)

export default App;
