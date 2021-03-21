import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Body.css';
import ReactCountryFlag from 'react-country-flag';

function RichestPeople({ year }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getMarketCap = async () => {
            try {
                const response = await axios.get(`/richestpeople/${year}`);
                setData(response.data);
    
            } catch (err) {
                console.log(err);
            }
        }
        getMarketCap()
    }, [year]);

    const addZero = num => {
        let n = num.toString();
        if(n.slice(-2, -1) !== '.'){
            n = n + '.0';
        }
        return n;
    }
    
    return (
        <>
        <div className="light bg-light">
            <div className="container">
                <h2>Richest People in {year}</h2>
                <div className="data">
                <table>
                    <thead>
                        <tr className="head">
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Net Worth</th>
                            <th>Country</th>
                            <th>Source of Wealth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>AAPL</td>
                            <td>Apple</td>
                            <td>1,900</td>
                            <td><span className={`flag-icon flag-icon-${el.country.toLowerCase()}`}></span></td>
                                <td>{el.source}</td> 
                        </tr> */}
                        {data.map(el => (
                            <tr key={el.rich_id}>
                                <td>{el.rank}</td>
                                <td>{el.name}</td>
                                <td>${addZero(el.networth)} B</td>
                                <td>
                                <ReactCountryFlag countryCode={el.country}
                                className="emojiFlag"
                                style={{
                                    fontSize: '2rem',
                                    lineHeight: 0,
                                }}
                                aria-label={el.country} />
                                </td>
                                <td>{el.source}</td> 
                            </tr>
                        ))}
                        
                    </tbody>
                    </table>

                    <div className="footnote">
                            <p>*Data from Forbes</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default RichestPeople
