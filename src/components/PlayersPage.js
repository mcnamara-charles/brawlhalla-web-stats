import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useLocation } from "react-router-dom";
const _ = require("lodash");  

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PlayersPage() {

    function getTierKey(t) {
        return t.toLowerCase().replace(" ", "-")
    }

    function convertToWinrate(w, g) {
        return (w/g*100).toFixed(2)
    }

    function getPlayerLevelFill(lv, xpp) {
        if(lv===100) return "100%"
        else return String(xpp*100)
    }

    const [player, setPlayer] = React.useState("");
    const [personalRanked, setPersonalRanked] = React.useState(true);
    const [legendsRanked, setLegendsRanked] = React.useState(true);


    let query = useQuery();
    let playerID = query.get("id")

    React.useEffect(() => {
        async function fetchData() {
            const data = (await fetch(`https://api.brawlhalla.com/player/${playerID}/stats?api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
            const Rdata = (await fetch(`https://api.brawlhalla.com/player/${playerID}/ranked?api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
            // Convert Same Objects below for _.merge.
            Rdata.ranked_wins = Rdata.wins;
            Rdata.ranked_games = Rdata.games;

            for(let i = 0; i<Rdata.legends.length; i++) {
                Rdata.legends[i].ranked_wins = Rdata.legends[i].wins;
                Rdata.legends[i].ranked_games = Rdata.legends[i].games;
            }

            const fullData = _.merge(Rdata, data)
            
            setPlayer(fullData)
            console.log(fullData)
        }
           
        fetchData()
    },[playerID])

    if(player) {
        return (
            <>
                <div className='player'>
                    <h1 className="display">Player: <span className="gl-span">{player.name}</span></h1>
                    <h2 className="display small">Personal Data</h2>
                    <div className="player-level__wrapper">
                        <div className="player-level__outer">
                            <div className="player-level__inner" style={{width: getPlayerLevelFill(player.level, player.xp_percentage)}}>
                                <h2 className="level-indicator">{`Level ${player.level}`}</h2>
                            </div>    
                        </div> 
                    </div>
                    <div className='player_data__wrapper'>
                        <div className={personalRanked ? "player-ranked_data" : "player-ranked_data hidden"}>
                            <div className="player-ranked_data-tier__wrapper">
                                <div className='player-ranked_data-tier'>
                                    <img src={`img/banners/${getTierKey(player.tier)}.png`}/>
                                </div>
                            </div>
                            <div className="player-ranked_data-data__wrapper">
                                <div className="pr-data-rating__wrapper">
                                    <h2 className="subhead small">Tier: </h2>
                                    <p className="data-mark">{player.tier}</p>
                                </div>
                                <div className="pr-data-rating__wrapper">
                                    <h2 className="subhead small">Rating: </h2>
                                    <p className="data-mark">{player.rating}</p>
                                </div>
                                <div className="pr-data-rating__wrapper">
                                    <h2 className="subhead small">Peak Rating: </h2>
                                    <p className="data-mark">{player.peak_rating}</p>
                                </div>
                            </div>
                            <div className="player-chart__wrapper">
                                <PieChart
                                    data={[
                                        { title: 'Wins', value: player.ranked_wins, color: '#00c400' },
                                        { title: 'Losses', value: (player.ranked_games - player.ranked_wins), color: '#600101' },
                                    ]}
                                    style={{height:"75%"}}
                                    lineWidth={13}
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
                        <div className={personalRanked ? "player-unranked_data hidden" : "player-unranked_data"}>

                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className='no-data'>
                </div>
            </>
        );
    }
}


export default PlayersPage;