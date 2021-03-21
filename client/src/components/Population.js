import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Body.css';
import ReactCountryFlag from 'react-country-flag';

function Population({ year }) {
    const [data, setData] = useState([]);
    const [world, setWorld] = useState({});

    useEffect(() => {
        if(year === '2020'){
            return;
        }
        
        const getPopulation = async () => {
            try {
                const response = await axios.get(`/population/${year}`);
                const res = response.data;
                
                setData(res.slice(1,11));
                setWorld(res[0]);

            } catch (err) {
                console.log(err);
            }
        }
        getPopulation()
    }, [year]);

    if(year === '2020') {
        return(
            <>
        <div className="light bg-light">
            <div className="container">
                <h2>Top Countries by Population in {year}</h2>
                <p>Population Data for {year} is currently not published. Please select a different year to view Population.</p>
            </div>
        </div>
        </>
        )
    } else{
        return (
            <>
            <div className="light bg-light">
                <div className="container">
                    <h2>Top Countries by Population in {year}</h2>
                    <div className="data">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Rank</th>
                                <th>Country</th>
                                <th>Population</th>
                                <th>Annual Growth %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((el, i) => (
                                <tr key={el.population}>
                                    <td>{i+1}</td>
                                    <td>
                                        {el.name} &nbsp;
                                        <ReactCountryFlag countryCode={el.code2}
                                            className="emojiFlag"
                                            style={{
                                                fontSize: '2rem',
                                                lineHeight: 0,
                                            }}
                                            aria-label={el.code2} />
                                    </td>
                                        <td>
                                        {(Math.round(el.population)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} M
                                        </td>
                                    <td>{(el.percent * 100).toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className="population-world">
                            <p>Total World Population: {(Math.round(world.population)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} M</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
   
}

export default Population