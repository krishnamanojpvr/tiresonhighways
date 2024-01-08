// import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export default function TollStart() {
    // const nav=useNavigate()



    return (
        <div className="home">
            <div>

                {/* <!-- Button trigger modal --> */}
                <button type="button" id='TollLog' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    LOG OUT
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">WARNING!!!</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure about that?
                            </div>
                            <div className="modal-footer">
                                <Link to="/"><button type="button" className="btn btn-danger" data-bs-dismiss="modal">Yes, Log Out</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div id="buttons4">
                <div>
                    {/* <button type="button" id="button1" onClick={()=>nav("/UploadCMode")} className="btn btn-dark"><span>href a tag</span><span id='b1'>&gt;</span></button> */}

                    <Link to="/toll/upload"><button type="button" id="button1" className="btn btn-dark">UPLOAD DATA<span id='b1'>&gt;</span></button></Link>
                    <button type="button" id="button2" className="btn btn-dark">
                        <span >CHECK RECORDS</span>
                        <span id='b2'>&gt;</span>
                    </button>
                </div>

                <div>
                    <button type="button" id="button3" className="btn btn-dark">
                        <span >HOW TO</span>
                        <span id='b3'>&gt;</span>
                    </button>
                    <button type="button" id="button4" className="btn btn-dark">
                        <span >HELP</span>
                        <span id='b4'>&gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}