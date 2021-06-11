import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Footer';
import NavBar from '../NavBar';
import ball_in_glove from '../../images/baseball-glove-dirt.png';
import './GettingStarted.css';

const GettingStarted = () => {

  return (
    <>
      <div className="container page-container" style={{backgroundImage: `url(${ball_in_glove})`}}>
        <div className="nav-bar-container">
          <NavBar />
        </div>
        <div className="middle-container">
          <div className="card" style={{border: '5px solid red', position: 'relative', height: '500px', width: '500px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

            <Button variant="outlined" color="primary" style={{height: '150px', width: '150px', marginRight: '50px'}}/>
            <Button variant="outlined" color="primary" style={{height: '150px', width: '150px'}}/>
          </div>
        </div>
        <div className="bottom-container"></div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default GettingStarted;