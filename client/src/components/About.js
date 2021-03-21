import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function About() {


    return (
        <>
           <div className="front-page-about">
            <div className="container-about">
                <h1>About</h1>
                <div className="pulse">
                <span></span>
                </div>
                <div className="about-text">
                    <p>Everybody loves historical data! But unfortunately finding this data can be a tedious and timely task. At World TimeLine, we compile some of the most interesting data around the world and display it all into one single page for anyone to easily view and digest. </p>
                    <p>Our sources are from public financial statements, government reports, and Forbes.</p>
                </div>
                <Link to={{
                            pathname: "/"
                        }}>
                    <button className='btn'>Home</button>
                </Link>

            </div>
        </div>
        </>
    )
}

export default About
