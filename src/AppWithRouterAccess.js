import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import RankingsPage from './components/RankingsPage.js';
import PlayersPage from './components/PlayersPage.js';
import ClansPage from './components/ClansPage.js';

const AppWithRouterAccess = () => {
  return (
  <>
    <div className='sidebar'>
      <div className='sidebar-header'>
        
      </div>
      <Link to="/rankings?bracket=1v1">
        <div className='sidebar-option'>
          Leaderboard 1v1
        </div>
      </Link>
      <Link to="/rankings?bracket=2v2">
        <div className='sidebar-option'>
          Leaderboard 2v2
        </div>
      </Link>
      <Link to="/players">
        <div className='sidebar-option'>
          Players
        </div>
      </Link>
      <Link to="/clans">
        <div className='sidebar-option'>
          Clans
        </div>
      </Link>
      <Link to="/legends">
        <div className='sidebar-option'>
          Legends
        </div>
      </Link>
    </div>
    <main>
      <Routes>
        <Route path="/" exact element={<LandingPage />}/>
        <Route path="/rankings" element={<RankingsPage />}/>
        <Route path="/players" element={<PlayersPage />}/>
        <Route path="/clans" element={<ClansPage />}/>
      </Routes>
    </main>
  </>
  )
}

export default AppWithRouterAccess;
