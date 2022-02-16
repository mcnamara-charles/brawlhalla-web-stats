import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useLocation } from "react-router-dom";

// To get query parameters from URL bar
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Page Functional Component
function RankingsPage () {

    // Makes useQuery callable
    let query = useQuery();
    // Gets bracket parameter from queries; Either 1v1 or 2v2. Will return "1v1" if parameter does not exist in the URL
    let queryBracket = query.get("bracket")
    queryBracket = queryBracket ? queryBracket : "1v1"
    // Gets region parameter from queries; 7 different options. Will return "all" if parameter does not exist in the URL
    let queryRegion = query.get("region")
    queryRegion = queryRegion ? queryRegion : "all"

    /*
    Getters and Setters for React UseState variables;
    Stores pages to remind tree what the last page is that's being rendered;
    Keeps time that data was generated to allow users to refresh. Should be time constricted to avoid overuse;
    Keeps leaderboard and legends for generative content;
    */
    const [nextPage, setNextPage] = React.useState(2)
    const [timeGenerated, setTimeGenerated] = React.useState("")
    const [leaderboard, setLeaderboard] = React.useState([])
    const [legends, setLegends] = React.useState([])

    // Stores data in local storage
    function storeData(key, value) {
        window.localStorage.setItem(key, value)
    }

    // Gets data with requested key from local storage
    function getStoredData(key) {
        return window.localStorage.getItem(key)
    }

    // Converts wins and games into a winrate percentage
    function convertToWinrate(w, g) {
        return (w/g*100).toFixed(2)
    }

    // Gets the next page of results for the leaderboard
    async function appendPage(e) {
        const allData = JSON.parse(getStoredData("brawlhalla-site-data"))

        e.preventDefault()
        if(leaderboard.length < 99) {
            setLeaderboard(leaderboard.concat(allData.data.data[queryRegion][queryBracket].page2))
        }
    }

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


    /*
    UseEffect to grab data on page initial load but not to make an attempt again until the page is fully refreshed.
    Once fired it checks stored data and if recent enoough, makes use of that. If not, or if that data doesn't exist, uses a fetch request to get and store.
    */
    React.useEffect(() => {
        async function setData() {
            const allData = JSON.parse(getStoredData("brawlhalla-site-data"))
            // Tries to Get Stored Leaderboard
            setLeaderboard(allData.data.data[queryRegion][queryBracket].page1)
            setLegends(allData.data.data.legends)
            setTimeGenerated(String(new Date(allData.time).toLocaleString()))
        }

        setData()
    },[queryRegion, queryBracket])

    try {
        if(queryBracket.includes("2")) {
            return (
                <div className="ranks">
                    <h1 className="display">Global Leaderboard: <span className="gl-span">2v2</span></h1>
                    <div className="view-button-groups">
                            <div className="button-group__wrapper">
                                <div className="button-group__label">
                                    Bracket:
                                </div>
                                <div className='button-group'>
                                    <Link to={`/rankings?bracket=1v1&${"region="+queryRegion}`}>
                                        <button className={queryBracket.includes(1) ? "button style-a active" : "button style-a"}>1v1</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=2v2&${"region="+queryRegion}`}>
                                        <button className={queryBracket.includes(2) ? "button style-a active" : "button style-a"}>2v2</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="button-group__wrapper">
                                <div className="button-group__label">
                                    Region:
                                </div>
                                <div className='button-group'>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=all`}>
                                        <button className={queryRegion.includes("all") ? "button style-a active" : "button style-a"}>All</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=aus`}>
                                        <button className={queryRegion.includes("aus") ? "button style-a active" : "button style-a"}>AUS</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=brz`}>
                                        <button className={queryRegion.includes("brz") ? "button style-a active" : "button style-a"}>BRZ</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=eu`}>
                                        <button className={queryRegion.includes("eu") ? "button style-a active" : "button style-a"}>EU</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=jpn`}>
                                        <button className={queryRegion.includes("jpn") ? "button style-a active" : "button style-a"}>JPN</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=sea`}>
                                        <button className={queryRegion.includes("sea") ? "button style-a active" : "button style-a"}>SEA</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=us-e`}>
                                        <button className={queryRegion.includes("us-e") ? "button style-a active" : "button style-a"}>US-E</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=us-w`}>
                                        <button className={queryRegion.includes("us-w") ? "button style-a active" : "button style-a"}>US-W</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                    <div className="see-more__wrapper">
                        <button className={leaderboard.length < 99 ? 'button style2' : 'button style2 disabled'} onClick={(e) => appendPage(e)}>See More</button>
                    </div>
                </div>
            )
        } else if (queryBracket.includes("1")) {
            if(leaderboard && legends.length > 0) {
                return (
                    <div className="ranks">
                        <h1 className="display">Global Leaderboard: <span className="gl-span">1v1</span></h1>
                        <div className="view-button-groups">
                            <div className="button-group__wrapper">
                                <div className="button-group__label">
                                    Bracket:
                                </div>
                                <div className='button-group'>
                                    <Link to={`/rankings?bracket=1v1&${"region="+queryRegion}`}>
                                        <button className={queryBracket.includes(1) ? "button style-a active" : "button style-a"}>1v1</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=2v2&${"region="+queryRegion}`}>
                                        <button className={queryBracket.includes(2) ? "button style-a active" : "button style-a"}>2v2</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="button-group__wrapper">
                                <div className="button-group__label">
                                    Region:
                                </div>
                                <div className='button-group'>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=all`}>
                                        <button className={queryRegion.includes("all") ? "button style-a active" : "button style-a"}>All</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=aus`}>
                                        <button className={queryRegion.includes("aus") ? "button style-a active" : "button style-a"}>AUS</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=brz`}>
                                        <button className={queryRegion.includes("brz") ? "button style-a active" : "button style-a"}>BRZ</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=eu`}>
                                        <button className={queryRegion.includes("eu") ? "button style-a active" : "button style-a"}>EU</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=jpn`}>
                                        <button className={queryRegion.includes("jpn") ? "button style-a active" : "button style-a"}>JPN</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=sea`}>
                                        <button className={queryRegion.includes("sea") ? "button style-a active" : "button style-a"}>SEA</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=us-e`}>
                                        <button className={queryRegion.includes("us-e") ? "button style-a active" : "button style-a"}>US-E</button>
                                    </Link>
                                    <Link to={`/rankings?bracket=${queryBracket}&region=us-w`}>
                                        <button className={queryRegion.includes("us-w") ? "button style-a active" : "button style-a"}>US-W</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='date-marker'>
                                <span>Time Generated: {timeGenerated}</span>    
                            </div>
                        </div>
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
                                                            { title: 'Wins', value: player.wins, color: '#00c400' },
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
                        <div className="see-more__wrapper">
                            <button className={leaderboard.length < 99 ? 'button style2' : 'button style2 disabled'} onClick={(e) => appendPage(e)}>See More</button>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div></div>
                )
            }
        }
    } catch {
        if(leaderboard && legends.length > 0) {
            return (
                <div className="ranks">
                    <h1 className="display">Global Leaderboard: <span className="gl-span">1v1</span></h1>
                    <div className="view-button-groups">
                        <div className="button-group__wrapper">
                            <div className="button-group__label">
                                Bracket:
                            </div>
                            <div className='button-group'>
                                <Link to={`/rankings?bracket=1v1&${"region="+queryRegion}`}>
                                    <button className={queryBracket.includes(1) ? "button style-a active" : "button style-a"}>1v1</button>
                                </Link>
                                <Link to={`/rankings?bracket=2v2&${"region="+queryRegion}`}>
                                    <button className={queryBracket.includes(2) ? "button style-a active" : "button style-a"}>2v2</button>
                                </Link>
                            </div>
                        </div>
                        <div className="button-group__wrapper">
                            <div className="button-group__label">
                                Region:
                            </div>
                            <div className='button-group'>
                                <Link to={`/rankings?bracket=${queryBracket}&region=all`}>
                                    <button className={queryRegion.includes("all") ? "button style-a active" : "button style-a"}>All</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=aus`}>
                                    <button className={queryRegion.includes("aus") ? "button style-a active" : "button style-a"}>AUS</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=brz`}>
                                    <button className={queryRegion.includes("brz") ? "button style-a active" : "button style-a"}>BRZ</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=eu`}>
                                    <button className={queryRegion.includes("eu") ? "button style-a active" : "button style-a"}>EU</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=jpn`}>
                                    <button className={queryRegion.includes("jpn") ? "button style-a active" : "button style-a"}>JPN</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=sea`}>
                                    <button className={queryRegion.includes("sea") ? "button style-a active" : "button style-a"}>SEA</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=us-e`}>
                                    <button className={queryRegion.includes("us-e") ? "button style-a active" : "button style-a"}>US-E</button>
                                </Link>
                                <Link to={`/rankings?bracket=${queryBracket}&region=us-w`}>
                                    <button className={queryRegion.includes("us-w") ? "button style-a active" : "button style-a"}>US-W</button>
                                </Link>
                            </div>
                        </div>
                    </div>
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
                                                        { title: 'Wins', value: player.wins, color: '#00c400' },
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
                    <div className="see-more__wrapper">
                        <button className={leaderboard.length < 99 ? 'button style2' : 'button style2 disabled'} onClick={(e) => appendPage(e)}>See More</button>
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            )
        }
    } 
}


export default RankingsPage;