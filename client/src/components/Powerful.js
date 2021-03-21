import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Body.css';
import ReactCountryFlag from 'react-country-flag';

function Powerful({ year }) {
    const [data, setData] = useState([]);

    useEffect(() => {
    if(parseInt(year) <= 2008 || parseInt(year) === 2017  || parseInt(year) === 2019 || parseInt(year) === 2020) {
        return;
    }
        const getPowerful = async () => {
            try {
                const response = await axios.get(`/powerful/${year}`);
                setData(response.data);
    
            } catch (err) {
                console.log(err);
            }
        }
        getPowerful()
    }, [year]);

    if(parseInt(year) <= 2008 || parseInt(year) === 2017  || parseInt(year) === 2019 || parseInt(year) === 2020) {
        return(
            <>
        <div className="light bg-light">
            <div className="container">
                <h2>Most Powerful People in {year}</h2>
                <p>Since 2009 (with absences in 2017, 2019 and 2020), Forbes has released an annual list of the world's most powerful people. Please select a different year to view. </p>
            </div>
        </div>
        </>
        )
    } else{
        return (
            <>
            <div className="light bg-light">
                <div className="container">
                    <h2>Most Powerful People in {year}</h2>
                    <div className="data">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Name</th>
                                <th>Country</th>
                                <th>Source of Influence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(el => (
                                <tr key={el.name}>
                                    <td>{el.name}</td>
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
                            <p>
                            List is based off of Forbes' annual list of the world's most powerful people.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
   
}

export default Powerful