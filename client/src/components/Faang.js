import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Body.css';

function Faang({ year }) {
    const [data, setData] = useState([]);

    useEffect(() => {
    if(parseInt(year) <= 2004) {
        return;
    }
        const getFaang = async () => {
            try {
                const response = await axios.get(`/faang/${year}`);
                setData(response.data);
    
            } catch (err) {
                console.log(err);
            }
        }
        getFaang()
    }, [year]);

    if(parseInt(year) <= 2004) {
        return(
            <>
        <div className="dark bg-dark">
            <div className="container">
                <h2>Tech Companies (FAANG) Trailing Twelve Months Revenue and Profit  in {year}</h2>
                <p>FAANG Data is only available after 2005. Please select 2005 or later to view.</p>
            </div>
        </div>
        </>
        )
    } else{
        return (
            <>
            <div className="dark bg-dark">
                <div className="container">
                    <h2>Tech Companies (FAANG) Trailing Twelve Months Revenue and Profit  in {year}</h2>
                    <div className="data">
                    <table>
                        <thead>
                            <tr className="head">
                                <th>Name</th>
                                <th>Revenue</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((el, i) => (
                                <tr key={el.revenue}>
                                    <td>{el.name}</td>
                                    <td>${(el.revenue/1000000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} B</td>
                                    <td>${(el.profit/1000000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} B</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>

                        <div className="footnote">
                            <p>{year === '2020' ? `*As of Q3 ${year}` : `*As of Q4 ${year}`}</p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
   
}

export default Faang