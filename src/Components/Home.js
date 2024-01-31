import React from 'react';
import { Link } from "react-router-dom";


export default function Home(props){
    props.setSignInButton(true);
    return (
        <>
        <div className="parenth container d-flex justify-content-center mt-5">
            <div className="Home container mt-5 rounded-5" id='home'style={{ color: 'white' }}>
            <div id='title'  className="row  ">
                <h1 className ="display-1 col border border-black rounded-3 border-3 shadow-lg text-center"style={{backdropFilter:'blur(10px)',color:'white '}}>TIRES ON HIGHWAYS</h1>                 
            </div>
            <div className="options row text-center">
                <div className="option1 col-12 mt-2 mb-2">
                <Link to='/guest' type="button"  className="btn btn-light gs" draggable>Continue as Guest</Link>
                </div>
            </div>
        </div>
        </div>
        </>
    );}