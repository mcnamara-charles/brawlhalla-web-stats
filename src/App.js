import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';
//import useWindowDimensions from './hooks/window.js'
// I love gemma
import DotRing from './components/DotRing/DotRing';
import { motion } from 'framer-motion';

function App() {

//const { height, width } = useWindowDimensions();

  const [mouseOut, setMouseOut] = React.useState(false)

  const handleMouseOut = (e) => {
    console.log("Mouse Out")
    setMouseOut(true)
  }

  const handleMouseOver = (e) => {
    setMouseOut(false)
  }

  return (
    <div
    onMouseLeave={(e) => handleMouseOut(e)} 
    onMouseEnter={(e) => handleMouseOver(e)} 
    data-theme="dark"
    className="App"
    >
      <DotRing mouseOut={mouseOut} />
      <Router>
          <AppWithRouterAccess />
      </Router>
    </div>
  );
}

export default App;
