import React from 'react';
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="parenth">
            <div className="Home container m-0">
            <div id='title' className="row ">
                <div className ="display-1 col text-center">TIRES ON HIGHWAYS</div>                 
            </div>
            <div className="options row text-center">
                <div className="option1 col-12 mt-2 mb-2">
                <Link to="/guest"><button type="button"  className="btn btn-dark gs" draggable>Continue as Guest</button></Link>
                </div>
                {/* <br /> */}
                <div className="option2 col-12 mt-2 mb-2">
                <Link to="/toll/upload"><button type="button" className="btn btn-dark gs">Toll Sign In</button></Link>
                
                </div>
            </div>
        </div>
        </div>
    );}