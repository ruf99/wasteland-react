import "./HomePage.css";
import { Link } from 'react-router-dom';
import {useState } from 'react';

function HomePage() {  

  const [showInfo, setShowInfo] = useState(false);

  const infoPop = () => {
    setShowInfo(!showInfo);
  };


  return (
    <>
      <div>
        {showInfo ? (
          <div className="infoText">
            <div className="informationMessageBox"><p className="p_message">Hi! My name is Rufaida (Roo), and this is a project I did for Out In Tech. <br></br>
            I wanted to work on something that closely aligned with my interests and also helped me learn new skills, and so I was interested in presenting the analysis behind one of my favourite aritsts' work - Hozier. <br></br>
            By using 'Analyze', the user can find the analysis for a select few tracks by Hozier, and delve a little deeper into the lyrical understanding behind the music. <br></br> The information is pulled from a postgres database that I made, and the user is also presented with a recommended playlist at the end of the analysis. </p></div>
            <button className="backButton" onClick={() => infoPop()}>Go Back</button>
          </div>
        ) : (
          <>
            <div className="HeaderText">
              <h1>Welcome</h1>
            </div>
            <div className="music">
            <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>

          </>
        )}
        <br></br>
        {!showInfo && <button className="informationButton" onClick={infoPop}>Information</button>}
        <footer className="footer_roo_home">
        © Rufaida's Portfolio 💚| 2020-2024
        </footer>
      </div>
    </>
  );
};
export default HomePage;