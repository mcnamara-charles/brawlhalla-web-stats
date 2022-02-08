import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';


function RankingsPage () {
    const [bracket, setBracket] = React.useState("1v1")
    const [region, setRegion] = React.useState("all")
    const [leaderboard, setLeaderboard] = React.useState([])
    const [legends, setLegends] = React.useState([])

    function storeData(key, value) {
        window.localStorage.setItem(key, value)
    }

    function getStoredData(key) {
        return window.localStorage.getItem(key)
    }

    function convertToWinrate(w, g) {
        return (w/g*100).toFixed(2)
    }

    function getLegendName(n) {
        const l = legends.find(legend => {
            return legend.legend_id === n
        })

        return l.legend_name_key
    }

    function getLegendActualName(n) {
        const l = legends.find(legend => {
            return legend.legend_id === n
        })

        return l.bio_name
    }

    function getTierKey(t) {
        return t.toLowerCase().replace(" ", "-")
    }


    React.useEffect(() => {
        async function fetchData() {
            // Get Stored Leaderboard
            var leaderboardData = getStoredData("leaderboard")
            if(!leaderboardData) {
                leaderboardData = (await fetch(`https://api.brawlhalla.com/rankings/${bracket}/${region}/1?api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
                // Store and set results
                setLeaderboard(leaderboardData)
                const slbd = {
                    "time": new Date().toLocaleString(),
                    "data": leaderboardData
                }
                storeData("leaderboard", JSON.stringify(slbd))
            } else {
                // Store and set results
                const lbfd = JSON.parse(leaderboardData)
                console.log(lbfd.data)
                const innerData = lbfd.data;
                const timeDataStored = lbfd.time;
                const nmp = ((new Date().getTime() - new Date(timeDataStored).getTime())/1000/60)

                if(nmp < 30) {
                    setLeaderboard(innerData)
                } else {
                    console.log("reretrieving data")
                    leaderboardData = (await fetch(`https://api.brawlhalla.com/rankings/${bracket}/${region}/1?api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
                    // Store and set results
                    setLeaderboard(leaderboardData)
                    const slbd = {
                        "time": new Date().toLocaleString(),
                        "data": leaderboardData
                    }
                    storeData("leaderboard", JSON.stringify(slbd))
                }
            }

            // Get Stored Legends
            var legendData = getStoredData("legends")
            if(!legendData) {
                legendData = (await fetch(`https://api.brawlhalla.com/legend/all&api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
                // Store and set results
                setLegends(legendData)
                storeData("legends", JSON.stringify(legendData))
            } else {
                // Store and set results
                setLegends(JSON.parse(legendData))
            }
        }

        fetchData()
    },[bracket, region])

    if(leaderboard && legends.length > 0) {
        return (
            <div className="ranks">
                <h1 className="display">Global Leaderboard</h1>
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
                                                <div className="name">{player.name}</div>
                                                <div className="horizontal-data">
                                                    <img src={`img/legends/${getLegendName(player.best_legend)}.png`}/>
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
                                                            labelStyle={(index) => ({
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
                                                    { title: 'Wins', value: player.best_legend_wins, color: '#00c400' },
                                                    { title: 'Losses', value: (player.games - player.wins), color: '#600101' },
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
                                        <span className="expanded-player-rating">{player.rating}</span>
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
                                            <img className="region-icon" src={`/img/regions/${player.region}.png`}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}    
                    </tbody>  
                </table>
            </div>
        );
    } else {
        return(
            <div></div>
        )
    }
}


export default RankingsPage;