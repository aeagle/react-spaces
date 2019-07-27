import React from 'react';
import './App.scss';
import ReactGA from 'react-ga';
import { Docs } from './docs/Docs';
import { UI } from './ui-demo/UI';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  if (window.location.hash === "#ui-demo")
  {
    return <UI />
  }
  
  return <Docs />
}

export default App;
