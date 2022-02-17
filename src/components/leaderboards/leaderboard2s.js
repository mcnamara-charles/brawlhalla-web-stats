import { Link } from "react-router-dom";
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Leaderboard2s = ({ leaderboard }) => {

    // Converts wins and games into a winrate percentage
    function convertToWinrate(w, g) {
        return (w/g*100).toFixed(2)
    }

    function getTierKey(t) {
        return t.toLowerCase().replace(" ", "-")
    }

    if(!leaderboard) {
        return(
            <div></div>
        )
    }
    
    try {
        return (
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player Name</th>
                        <th>Winrate</th>
                        <th>Rating</th>
                        <th>Peak Rating</th>
                        <th>Tier</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((team) =>
                        <tr key={team.rank} className="leaderboard-player">
                            <td>
                                    <div className="collapsed-content">
                                    {`#${team.rank}`}
                                </div>
                                <div className="expanded-content">
                                    <div className="rank">
                                        {`#${team.rank}`}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="collapsed-content">
                                    {team.teamname}
                                </div>
                                <div className="expanded-content">
                                    <div className="player-details">
                                        <div className='player-details__content-wrapper bracket2v2'>
                                            <div className="names2v2">
                                                <Link to={`/players?id=${team.brawlhalla_id_one}`} className="name2">
                                                    {team.teamname.split('+')[0]}
                                                </Link>
                                                <div className="concatenator">+</div>
                                                <Link to={`/players?id=${team.brawlhalla_id_two}`} className="name2 secondary">
                                                    {team.teamname.split('+')[1]}
                                                </Link>
                                            </div>
                                            <div className="horizontal-data bracket2v2">
                                                No Data to Show for 2v2
                                            </div>
                                        </div>
    
                                    </div>
                                </div>
                            </td>
                            <td className="winrate-td">
                                <div className="collapsed-content">
                                    <span>
                                        {`${convertToWinrate(team.wins, team.games)}%`}
                                    </span>
                                    <div className="percent-bar">
                                        <div className="percent-fill" style={{width: `${(convertToWinrate(team.wins, team.games))*0.75}px`}}>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="expanded-content">
                                    <div className='personal-winrate-chart__wrapper'>
                                        <PieChart
                                            data={[
                                                { title: 'Wins', value: team.wins, color: '#00c400' },
                                                { title: 'Losses', value: (team.games - team.wins), color: '#600101' },
                                            ]}
                                            style={{height:"210px"}}
                                            lineWidth={20}
                                            paddingAngle={18}
                                            rounded
                                            label={({ dataEntry }) => dataEntry.value}
                                            labelStyle={(index) => ({
                                                fill: '#ffffff',
                                                fontSize: '10px',
                                                fontFamily: 'sans-serif',
                                            })}
                                            labelPosition={60}
                                        />
                                        <div className="personal-winrate-chart__context">
                                            <span>{`Win % overall: `}</span>
                                            <span className="16-fp">{`${convertToWinrate(team.wins, team.games)}%`}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="rating-col">
                                <div className="collapsed-content">
                                    {team.rating}
                                </div>
                                <div className="expanded-content">
                                    <span className="expanded-player-rating">{team.rating}</span>
                                </div>
                            </td>
                            <td className="rating-col">
                                <div className="collapsed-content">
                                    {team.peak_rating}
                                </div>
                                <div className="expanded-content">
                                    <span className="expanded-player-rating">{team.peak_rating}</span>
                                </div>
                            </td>
                            <td>
                                <div className="collapsed-content">
                                    {team.tier}
                                </div>
                                <div className="expanded-content">
                                    <div className="tier-banner__wrapper">
                                        <img src={`img/banners/${getTierKey(team.tier)}.png`} alt={team.tier}/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="collapsed-content">
                                    {team.region}
                                </div>
                                <div className="expanded-content">
                                    <div className="region__wrapper">
                                        <img className="region-icon" src={`/img/regions/${team.region}.png`} alt={team.region}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}    
                </tbody>  
            </table>
        )
    } catch {
        return <div></div>
    }
}

export default Leaderboard2s;