import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';
import useWindowDimensions from './hooks/window.js'
import DotRing from './components/DotRing/DotRing';
import { motion } from 'framer-motion';

function App() {

const { height, width } = useWindowDimensions();

  const [mouseOut, setMouseOut] = React.useState(false)

  const handleMouseOut = (e) => {
    setMouseOut(true)
  }

  const handleMouseOver = (e) => {
    setMouseOut(false)
  }

  return (
    <motion.div
    onMouseOut={(e) => handleMouseOut(e)} 
    onMouseOver={(e) => handleMouseOver(e)} 
    data-theme="dark"
    className="App"
    >
      <DotRing mouseOut={mouseOut} />
      <Router>
          <AppWithRouterAccess />
      </Router>
    </motion.div>
  );
}

export default App;
