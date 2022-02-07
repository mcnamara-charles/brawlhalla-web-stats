import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';
//import useWindowDimensions from './hooks/window.js'
import { motion } from 'framer-motion';

function App() {

//const { height, width } = useWindowDimensions();

  return (
    <div
      data-theme="dark"
      className="App"
    >
      <Router>
          <AppWithRouterAccess />
      </Router>
    </div>
  );
}

export default App;
