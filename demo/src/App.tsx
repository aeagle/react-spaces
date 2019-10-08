import React, { Suspense } from 'react';
import './App.scss';
import ReactGA from 'react-ga';
import { UI } from './ui-demo/UI';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  return <UI />
}

export default App;
