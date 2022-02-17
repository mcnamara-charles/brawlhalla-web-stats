import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import RankingsPage from './components/RankingsPage.js';
import PlayersPage from './components/PlayersPage.js';
import ClansPage from './components/ClansPage.js';

const AppWithRouterAccess = () => {
  return (
  <>
    <div className='sidebar'>
      <div className='sidebar-header'>
        Leaderboard 1v1
      </div>
      <div className='sidebar-header'>
        Leaderboard 2v2
      </div>
      <div className='sidebar-option'>
        Players
      </div>
      <div className='sidebar-option'>
        Clans
      </div>
      <div className='sidebar-option'>
        Legends
      </div>
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
