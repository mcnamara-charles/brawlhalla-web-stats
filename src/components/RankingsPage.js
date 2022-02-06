import React from 'react';


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

    function expandRow() {
        
    }

    React.useEffect(() => {
        async function fetchData() {
            // Get Stored Leaderboard
            var leaderboardData = getStoredData("leaderboard")
            if(!leaderboardData) {
                leaderboardData = (await fetch(`https://api.brawlhalla.com/rankings/${bracket}/${region}/1?&api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
                console.log("Requested Data")
                // Store and set results
                setLeaderboard(leaderboardData)
                storeData("leaderboard", JSON.stringify(leaderboardData))
            } else {
                // Store and set results
                setLeaderboard(JSON.parse(leaderboardData))
            }

            // Get Stored Legends
            var legendData = getStoredData("legends")
            if(!legendData) {
                legendData = (await fetch(`https://api.brawlhalla.com/legend/all&api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
                console.log("Requested Data")
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
                        <tr key={player.rank} className="leaderboard-player" onMouseEnter={(e) => expandRow(e)}>
                            <td>{`#${player.rank}`}</td>
                            <td>{player.name}</td>
                            <td className="winrate-td">
                                <span>
                                    {`${convertToWinrate(player.wins, player.games)}%`}
                                </span>
                                <div className="percent-bar">
                                    <div className="percent-fill" style={{width: `${(convertToWinrate(player.wins, player.games))*0.75}px`}}>
                                        
                                    </div>
                                </div>
                            </td>
                            <td>{player.rating}</td>
                            <td>{player.peak_rating}</td>
                            <td>{player.tier}</td>
                            <td>{player.region}</td>
                        </tr>
                    )}    
                </tbody>  
            </table>
        </div>
    );
}


export default RankingsPage;