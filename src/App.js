import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';
//import useWindowDimensions from './hooks/window.js'
import DotRing from './components/DotRing/DotRing';
import { motion } from 'framer-motion';

function App() {

//const { height, width } = useWindowDimensions();

  const [mouseOut, setMouseOut] = React.useState(false)
  const [clicked, setClicked] = React.useState(false)

  const handleMouseOut = (e) => {
    e.preventDefault()
    setMouseOut(true)
  }

  const handleMouseOver = (e) => {
    e.preventDefault()
    setMouseOut(false)
  }

  const handlePageClick = (e) => {
    e.preventDefault()
    setClicked(true)
  }

  const handlePageUnclick = (e) => {
    e.preventDefault()
    setClicked(false)
  }

  return (
    <div
      onMouseLeave={(e) => handleMouseOut(e)} 
      onMouseEnter={(e) => handleMouseOver(e)} 
      onMouseDown={(e) => handlePageClick(e)}
      onMouseUp={(e) => handlePageUnclick(e)}
      data-theme="dark"
      className="App"
    >
      <DotRing mouseOut={mouseOut} clicked={clicked}/>
      <Router>
          <AppWithRouterAccess />
      </Router>
    </div>
  );
}

export default App;
