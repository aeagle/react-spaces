import React from 'react';
import './App.scss';
import ReactGA from 'react-ga';
import { Test } from './Test';
// import { UI } from './ui-demo/UI';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  return <Test />
}

export default App;
