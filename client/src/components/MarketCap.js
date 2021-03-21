import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import './Body.css';

//const baseUrl = 'http://localhost:5000

function MarketCap({year}) {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const getMarketCap = async () => {
            try {
                const response = await axios.get(`/marketcap/${year}`);
                setData(response.data);
    
            } catch (err) {
                console.log(err);
            }
        }
        
        getMarketCap()
    }, [year]);
    
    return (
        <div className="dark bg-dark">
            <div className="container">
                <h2>Largest Companies by Market Cap in {year}</h2>
                <div className="data">
                <table>
                    <thead>
                        <tr className="head">
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Market Cap</th>
                            <th>Country</th>
                            <th>Industry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>AAPL</td>
                            <td>Apple</td>
                            <td>1,900</td>
                        </tr> */}
                        {data.map(el => (
                            <tr key={el.cap}>
                                <td>{el.rank}</td>
                                <td>{el.name}</td>
                                <td>${(Math.round(el.cap/1000)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} B</td>
                                <td>
                                <ReactCountryFlag countryCode={el.country}
                                className="emojiFlag"
                                style={{
                                    fontSize: '2rem',
                                    lineHeight: 0,
                                }}
                                aria-label={el.country} />
                                </td>
                                <td>{el.industry}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                    </table>

                    <div className="footnote">
                            <p>*Public companies only. Market cap as of Q1</p>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default MarketCap
