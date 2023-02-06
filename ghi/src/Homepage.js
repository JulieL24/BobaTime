// import { useState } from 'react';

function Home(){


    return (
        <>
            <div className="container">
                <div className="text-center store-slogan">
                    <h1>Welcome to Boba Time!</h1>
                    <h4>A place to discover your next boba milk tea place.</h4>
                    <img className="home-photo" src={require('./images/milktea3.jpg')} alt="milk tea" 
                        width="300"
                        height="428"
                    />
                    <img className="home-photo" src={require('./images/milktea.jpg')} alt="milk tea" 
                        width="300"
                        height="428"
                    />
                     <img className="home-photo" src={require('./images/milktea2.jpg')} alt="milk tea" 
                        width="300"
                        height="428"
                    />

                </div>

            </div>
        </>
    );

}

export default Home