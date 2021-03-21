import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube } from 'react-icons/fa';
import '../App.css';


function Footer() {
    // const location = useLocation();
    // useEffect(handleLocationChange, [location])

     
    //  console.log(location);
    return (
        <div className="footer">
            <div className="footer-container">
                <Link to='/about'>
                About
                </Link>
                <Link
                    className='social-icon'
                    to={
                        '//www.youtube.com/channel/UCIsauc7i0YoJGXuit3VSAQQ'
                    }
                    target='_blank'
                    aria-label='Youtube'
                    >
                <FaYoutube />
                </Link>
                <div onClick={()=> {window.location.href='#top'}}>
                Back to Top
                </div>
                
            </div>
            
        </div>
    )
}

export default Footer
