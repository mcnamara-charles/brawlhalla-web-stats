import React from 'react';
import { Route, Routes, Link} from 'react-router-dom';


function LandingPage() {

    const testAPI = (e) => {
        e.preventDefault();
        fetch('https://api.brawlhalla.com/rankings/1v1/all/1?name=C&api_key=9WFVHV2XL7KRRNCIMULK')
        .then(response => response.json())
        .then(data => console.log(data));
    }

    return (
        <>
            <div className="options__wrapper">
                <div className="options__wrapper-row">
                    <Link to="/rankings">
                        <div className='option'>
                            
                        </div>
                    </Link>
                    <div className='option'>
                        
                    </div>
                    <div className='option'>
                        
                    </div>
                </div>
            </div>
        </>
    );
}


export default LandingPage;