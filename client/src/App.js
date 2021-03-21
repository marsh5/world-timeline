import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import MarketCap from './components/MarketCap';
import RichestPeople from './components/RichestPeople';
import Gdp from './components/Gdp';
import Population from './components/Population';
import Faang from './components/Faang';
import Powerful from './components/Powerful';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {

    const [year, setYear] = useState('2020');
    const [click, setClick] = useState(false);
    const [menuClick, setMenuClick] = useState(true);
    const [showDarkNav, setDarkNav] = useState(true);
    const [showNav, setNav] = useState(false);

    setInterval(()=> {
      if(window.pageYOffset > 550){
        setNav(true)
      }else{
        setNav(false);
      }
    }, 400)

    const handleYearChange =  (ev) => {
      setYear(ev.target.value);
      setClick(true);
    }

    const handleMenuClick = () => {
      setMenuClick(!menuClick);
      setDarkNav(!showDarkNav);
    }

  return (
    <>
    <Router>
      <Switch>
        <Route path='/' exact>
          <div className={`${showNav ? 'navbar' : 'navbar-off'} ${showDarkNav ? 'nav-bg-dark' : 'nav-no-bg'} ${showNav ? 
        'a' : 'b'}`}>
              <div className="navbar-container">
              <div className={showDarkNav ? 'timeline-nav' : 'timeline-nav-off'}>
              <p>Year Selected: {year}</p>
              <input type="range" min="2000" max="2020" value={year} onChange={handleYearChange}className="slider" />
              </div>
            </div>
            <div className="menu-icon" onClick={handleMenuClick}>
                  { menuClick ? <FaTimes /> : <FaBars /> }
              </div>
          </div>

          <div className="front-page" id="top">
          <div className="container">
            <h1>World Timeline</h1>
            <div className="pulse">
              <span></span>
            </div>
            <div className ="yearShown">
              <p>{year} </p>
            </div>
            <div className="timeline">
              <input type="range" min="2000" max="2020" value={year} onChange={handleYearChange}className="slider" />
              <p>{click ? ' ' : 'Select Year'}</p>
            </div>

            <div className={click ? 'explore-btn' : 'explore-btn-off'} onClick={()=> {window.location.href='#data'}}>
              <p className={click ? 'sliding-text-active' : 'sliding-text'}>Now Explore</p>   
              <div className={click ? 'down-arrow-active' : 'down-arrow'}>
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
            </div>
          </div>
        </div>
      
        <div id="data" >
        </div>
       
          <MarketCap year = {year} />
          <RichestPeople year = {year}/>
          <Gdp year = {year}/>
          <Population year = {year}/>
          <Faang year = {year}/>
          <Powerful year = {year}/>
          <Footer />
        </Route>
        <Route path='/about' component={About} />
        {/* passing handleAboutClick in so that state can change and renders the navbar again (setting it to false) */}
        {/* <Route path='/about' render={() => <About handleAboutClick={handleAboutClick}/>}/> */}
      </Switch>
    </Router>
    </>
  );
}

export default App;
