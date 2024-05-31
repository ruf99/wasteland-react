import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    const getNavBarStyle = () => {
        if (location.pathname === '/analyze') {

            return {
                backgroundColor: '#003559',  //prussian blue
            };
        }

        else if (location.pathname === '/references') {

            return {
                backgroundColor: '#061a40', //oxford blue
            };
        }

        else return {
            //default colours here - to be rendered on the HomePage
            backgroundColor: '#104F55',     //midnight green
        };
    };
    return (
        <nav style = {getNavBarStyle()} className="navbar">
            <div class="container">
                <div class="color">
                    <div class="pink"></div>
                </div>
                <div class="color">
                    <div class="pur"></div>
                </div>
                <div class="color">
                    <div class="blue"></div>
                </div>
                <div class="color">
                    <div class="purple"></div>
                </div>
                <div class="color">
                    <div class="white"></div>
                </div>
                <div class="color">
                    <div class="grey"></div>
                </div>
                </div>
            <Link className="Title" to="/"><h1>OiT * Roo</h1></Link>
            <ul className="navbarLinks">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/analyze">Analyze</Link>
                </li>
                <li>
                    <Link to="/references">References</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;