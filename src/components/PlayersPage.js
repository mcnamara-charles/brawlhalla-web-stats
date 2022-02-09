import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PlayersPage() {
    let query = useQuery();
    let playerID = query.get("id")

    React.useEffect(() => {
        async function fetchData() {

        }
           
        fetchData()
    },[])

    return (
        <>
            <div className='player'>

            </div>
        </>
    );
}


export default PlayersPage;