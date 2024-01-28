import React from 'react';
import { Link } from "react-router-dom";


export default function Home(props){
    props.setSignInButton(true);
    return (
        <>
        <div className="parentgu container d-flex justify-content-center mt-5">
            <div className="Home container mt-5 rounded-5" id='home'style={{ backdropFilter: 'blur(3px)', color: 'white' }}>
            <div id='title' className="row ">
                <div className ="display-1 col text-center"style={{color:'balck '}}>TIRES ON HIGHWAYS</div>                 
            </div>
            <div className="options row text-center">
                <div className="option1 col-12 mt-2 mb-2">
                <Link to='/guest' type="button" style={{background:'white',color:'black'}} className="btn btn-dark gs" draggable>Continue as Guest</Link>
                </div>
            </div>
        </div>
        </div>
        </>
    );}