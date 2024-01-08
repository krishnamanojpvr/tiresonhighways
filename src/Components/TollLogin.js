import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Start() {
  const [toll, setToll] = useState('');
  const [pwd, setPwd] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');


  const tollPlaza = {
    "Hyderabad": "",
    "Delhi": "",
    "Bangalore": "",
  };

  const handleTollChange = (event) => { // synthetic event
    setToll(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const togglePasswordVisibility = () => {
    const pwdInput = document.getElementById("pwd");
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
    } else {
      pwdInput.type = "password";
    }
  };
  const navigate=useNavigate();

  const handleSubmit = () => {
    if (tollPlaza[toll] === pwd) {
      setDisplayMessage("Redirecting to home page...");
      navigate('/toll')
      
    } else {
      setDisplayMessage("Invalid Password");
    }
  };

  return (
    <div id="LoginDiv">
      <h1 id="LoginTitle">Tires On Highway</h1>
      <p id='LoginSelect'>Select your Toll Plaza:</p>
      <select className="form-select" name="ids" id="toll-ids" onChange={handleTollChange}>
      <option value="">Select here</option>
        {Object.keys(tollPlaza).map((key) => (
          <option  value={key}>
            {key}
          </option>
          ))};
      </select>
      <br></br>

      <form>
        <label htmlFor="pwd" id="LoginPwd" style={{ textAlign: "center" }}>
          Password:
        </label>
        <br />
        <input type="password" id="pwd" className = "btn btn-dark" placeholder="Enter your password here" name="pwd" required value={pwd}
          onChange={handlePwdChange}
        />
        <br></br>
      </form>
      {/* <input type="checkbox" id="LoginShowPwd" onClick={togglePasswordVisibility} /> Show Password */}
      <input  type="checkbox" className="btn-check" id="btncheck1" autocomplete="off" onClick={togglePasswordVisibility} /> 
      <label className="btn btn-outline-primary b" htmlFor="btncheck1">Show Password</label>
      <button  type="button" id="LoginSubmit" onClick={handleSubmit} className="btn btn-outline-success">Submit</button>
      {displayMessage && <p style={{ color: displayMessage.includes("Invalid") ? "red" : "blue" }}>{displayMessage}</p>}
    </div>
  );
}