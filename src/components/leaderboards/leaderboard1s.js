import { Link } from "react-router-dom";
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Leaderboard1s = ({ leaderboard, legends }) => {

    // Converts a legend id into a legend name key
    function getLegendName(n) {
        const l = legends.find(legend => {
            return legend.legend_id === n
        })

        return (l ? l.legend_name_key : "bodvar")
    }

    // Converts a legend id into the legend's full name
    function getLegendActualName(n) {
        const l = legends.find(legend => {
            return legend.legend_id === n
        })

        return (l ? l.bio_name : "Bödvar")
    }

    // Converts a tier to a tier_key for use with images
    function getTierKey(t) {
        return t.toLowerCase().replace(" ", "-")
    }

    function convertToWinrate(w, g) {
        return (w/g*100).toFixed(2)
    }

    if(!leaderboard || !legends)
    return(
        <div></div>
    )

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
                {leaderboard.map((player) =>
                    <tr key={player.rank} className="leaderboard-player">
                        <td>
                                <div className="collapsed-content">
                                {`#${player.rank}`}
                            </div>
                            <div className="expanded-content">
                                <div className="rank">
                                    {`#${player.rank}`}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="collapsed-content">
                                {player.name}
                            </div>
                            <div className="expanded-content">
                                <div className="player-details">
                                    <div className='player-details__content-wrapper'>
                                        <Link to={`/players?id=${player.brawlhalla_id}`} className="name">
                                            {player.name}
                                        </Link>
                                        <div className="horizontal-data">
                                            <img src={`img/legends/${getLegendName(player.best_legend)}.png`} alt={getLegendName(player.best_legend)}/>
                                            <div className="player-legend-chart__wrapper">
                                                <PieChart
                                                    data={[
                                                        { title: 'Wins', value: player.best_legend_wins, color: '#00c400' },
                                                        { title: 'Losses', value: (player.best_legend_games - player.best_legend_wins), color: '#600101' },
                                                    ]}
                                                    style={{height:"150px"}}
                                                    lineWidth={16}
                                                    paddingAngle={18}
                                                    rounded
                                                    label={({ dataEntry }) => dataEntry.value}
                                                    labelStyle={() => ({
                                                        fill: '#ffffff',
                                                        fontSize: '10px',
                                                        fontFamily: 'sans-serif',
                                                    })}
                                                    labelPosition={60}
                                                />
                                            </div>
                                        </div>
                                        <div className="win-percent-with-best_character">
                                            <span>{`Win % with ${getLegendActualName(player.best_legend)}: `}</span>
                                            <span className="16-fp">{`${convertToWinrate(player.best_legend_wins, player.best_legend_games)}%`}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </td>
                        <td className="winrate-td">
                            <div className="collapsed-content">
                                <span>
                                    {`${convertToWinrate(player.wins, player.games)}%`}
                                </span>
                                <div className="percent-bar">
                                    <div className="percent-fill" style={{width: `${(convertToWinrate(player.wins, player.games))*0.75}px`}}>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="expanded-content">
                                <div className='personal-winrate-chart__wrapper'>
                                    <PieChart
                                        data={[
                                            { title: 'Wins', value: player.wins, color: '#00c400' },
                                            { title: 'Losses', value: (player.games - player.wins), color: '#600101' },
                                        ]}
                                        style={{height:"210px"}}
                                        lineWidth={20}
                                        paddingAngle={18}
                                        rounded
                                        label={({ dataEntry }) => dataEntry.value}
                                        labelStyle={() => ({
                                            fill: '#ffffff',
                                            fontSize: '10px',
                                            fontFamily: 'sans-serif',
                                        })}
                                        labelPosition={60}
                                    />
                                    <div className="personal-winrate-chart__context">
                                        <span>{`Win % overall: `}</span>
                                        <span className="16-fp">{`${convertToWinrate(player.wins, player.games)}%`}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="rating-col">
                            <div className="collapsed-content">
                                {player.rating}
                            </div>
                            <div className="expanded-content">
                                <span className="expanded-player-rating">{player.rating}</span>
                            </div>
                        </td>
                        <td className="rating-col">
                            <div className="collapsed-content">
                                {player.peak_rating}
                            </div>
                            <div className="expanded-content">
                                <span className="expanded-player-rating">{player.peak_rating}</span>
                            </div>
                        </td>
                        <td>
                            <div className="collapsed-content">
                                {player.tier}
                            </div>
                            <div className="expanded-content">
                                <div className="tier-banner__wrapper">
                                    <img src={`img/banners/${getTierKey(player.tier)}.png`} alt={player.tier}/>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="collapsed-content">
                                {player.region}
                            </div>
                            <div className="expanded-content">
                                <div className="region__wrapper">
                                    <img className="region-icon" src={`/img/regions/${player.region}.png`} alt={player.region}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}    
            </tbody>  
        </table>
    )
}

export default Leaderboard1s;