import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Leaderboard1s from './leaderboards/leaderboard1s';
import Leaderboard2s from './leaderboards/leaderboard2s';

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
    const [timeGenerated, setTimeGenerated] = React.useState("")
    const [leaderboard, setLeaderboard] = React.useState([])
    const [leaderboardRender, setLeaderboardRender] = React.useState(<Leaderboard1s leaderboard={""} legends={""} />)
    const [legends, setLegends] = React.useState([])

    // Gets data with requested key from local storage
    function getStoredData(key) {
        return window.localStorage.getItem(key)
    }

    // Gets the next page of results for the leaderboard
    async function appendPage(e) {
        const allData = JSON.parse(getStoredData("brawlhalla-site-data"))

        e.preventDefault()
        if(leaderboard.length < 99) {
            setLeaderboard(leaderboard.concat(allData.data.data[queryRegion][queryBracket].page2))
        }
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
    
    return (
        <div className="ranks">
            <h1 className="display">Global Leaderboard: <span className="gl-span">{queryBracket}</span></h1>
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
                {queryBracket.includes("2") ? <Leaderboard2s leaderboard={leaderboard} /> : <Leaderboard1s leaderboard={leaderboard} legends={legends} />}
            <div className="see-more__wrapper">
                <button className={leaderboard.length < 99 ? 'button style2' : 'button style2 disabled'} onClick={(e) => appendPage(e)}>See More</button>
            </div>
        </div>
    )

}


export default RankingsPage;