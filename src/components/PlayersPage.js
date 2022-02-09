import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PlayersPage() {

    const [player, setPlayer] = React.useState("")

    let query = useQuery();
    let playerID = query.get("id")

    React.useEffect(() => {
        async function fetchData() {
            const data = (await fetch(`https://api.brawlhalla.com/player/${playerID}/stats?api_key=9WFVHV2XL7KRRNCIMULK`).then((response) => response.json()))
            setPlayer(data)
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