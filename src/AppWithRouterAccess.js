import React from 'react';
//import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import { Route, Routes, Link} from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import RankingsPage from './components/RankingsPage.js';

const AppWithRouterAccess = () => {
  return (
  <>
    <div className='sidebar'>
      
    </div>
    <main>
      <Routes>
        <Route path="/" exact element={<LandingPage />}/>
        <Route path="/rankings" element={<RankingsPage />}/>
        {/*<Route path="/about" component={About} />*/}
      </Routes>
    </main>
  </>
  )
}

export default AppWithRouterAccess;
