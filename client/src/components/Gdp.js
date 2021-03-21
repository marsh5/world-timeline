import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Body.css';
import ReactCountryFlag from 'react-country-flag';

function Gdp({ year }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(year === '2020'){
            return;
        }
        
        const getGdp = async () => {
            try {
                const response = await axios.get(`/gdp/${year}`);
                setData(response.data);
    
            } catch (err) {
                console.log(err);
            }
        }
        getGdp()
    }, [year]);

    const addZero = num => {
        let n = num.toString();
        if(n.slice(-2, -1) === '.'){
            n = n + '0';
        } else if(n.slice(-3,-2) !== '.'){
            n = n + '.00'
        }
        return n;
    }

    if(year === '2020') {
        return(
            <>
        <div className="dark bg-dark">
            <div className="container">
                <h2>Top Countries by GDP in {year}</h2>
                <p>GDP Data for {year} is currently not published. Please select a different year to view GDP.</p>
            </div>
        </div>
        </>
        )
    } else{
        return (
            <>
            <div className="dark bg-dark">
                <div className="container">
                    <h2>Top Countries by GDP in {year}</h2>
                    <div className="data">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Rank</th>
                                <th>Country</th>
                                <th>GDP</th>
                                <th>GDP per Capita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((el, i) => (
                                <tr key={el.percapita}>
                                    <td>{i+1}</td>
                                    <td>
                                        {el.name} &nbsp;
                                        <ReactCountryFlag countryCode={el.code2}
                                            className="emojiFlag"
                                            style={{
                                                fontSize: '2rem',
                                                lineHeight: 0,
                                            }}
                                            aria-label={el.code} />
                                    </td>
                                    <td>${addZero(el.gdp)} T</td>
                                    <td>${el.percapita.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className="footnote-empty">
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
   
}

export default Gdp