import React from "react";
import { Link } from "react-router-dom";

export default function TollStart(props) {
    props.setSignInButton(false);
    return (
        
            <div className="parenth">
                <div className="mt-5 d-flex container border border-black border-4 shadow-lg flex-column justify-content-center align-items-center rounded-4 p-4"style={{ backdropFilter:'blur(3px)',maxWidth:'600px'  }}>
                <h2 className="shadow-lg border border-white border-3 p-4 rounded-4 text-center " style={{color:'white',background:'black'}} >Toll Plaza: {props.selectedToll}</h2>
                <div className="row mt-4 d-flex  justify-content-center">
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                    <Link to="/toll/upload" type="button" className="btn btn-light  d-flex w-75 justify-content-center">
                            UPLOAD DATA
                    </Link>
                    </div>

                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                    <Link to="/toll/checkrecords" type="button" className="btn btn-light d-flex w-75 justify-content-center">
                            CHECK RECORDS
                    </Link>
                    </div>
                    <div className="col-sm-5 m-1 d-flex justify-content-center">
                        <Link type="button"id="button3" className="btn btn-light  d-flex w-75 justify-content-center">
                        HOW TO
                    </Link></div>
                    <div className="col-sm-6 m-1 d-flex justify-content-center">
                    <Link type="button"id="button4" className="btn btn-light d-flex w-75 justify-content-center">
                        HELP
                    </Link>
                    </div>
                </div>
            </div>
            </div>
        
    );
}