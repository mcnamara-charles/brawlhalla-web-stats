import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useLocation } from "react-router-dom";
const _ = require("lodash");  

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PlayersPage() {

    const [player, setPlayer] = React.useState("");
    const [playerRanked, setPlayerRanked] = React.useState("");


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

            const fullData = _.merge(data, Rdata)
            
            setPlayer(data)
            setPlayerRanked(Rdata)
            console.log(data)
        }
           
        fetchData()
    },[])

    if(player) {
        return (
            <>
                <div className='player'>
                    <h1 className="display">Player: <span className="gl-span">{player.name}</span></h1>
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