import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader.js';

export default function TollUpload(props) {
  props.setSignInButton(false);
  const [img, setImg] = useState([]);
  const [base64String, setBase64String] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState(null);
  const [userMobileNumber, setUserMobileNo] = useState(null);
  const [loader, setLoader] = useState(false); // Loader
  const [uploadStatus, setUploadStatus] = useState(false); // Result
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadStatus) {
      const timeoutId = setTimeout(() => {
        setUploadStatus(false);
      }, 2000);

      return () => clearTimeout(timeoutId); // This will clear the timeout if the component unmounts or if uploadStatus changes before the timeout completes
    }
  }, [uploadStatus]);

  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;

  const dateS = (date.getFullYear() + '-' + m + '-' + String(d));

  const handleVNOChange = (event) => {
    setLoader(false);
    setUploadStatus(null);
    setVehicleNumber(event.target.value.toUpperCase());


  }

  const handleMNOChange = (event) => {
    setLoader(false);
    setUploadStatus(null);
    setUserMobileNo(event.target.value);
  }

  const handleImageChange = async (event) => {
    setUploadStatus(null);
    setBase64String([]);
    setImg([]);
    setLoader(false);

    for (let i = 0; i < event.target.files.length; i++) {
      const selected = event.target.files[i];
      setImg(s => [...s, selected]);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploadStatus(null);
    setLoader(true);
    if (img.length > 0) {

      const requestData = new FormData();
      for (let i = 0; i < img.length; i++) {
        const tui = `TollUploadImage${i}`
        requestData.append(tui, img[i]);
      }

      requestData.append('vehicleNumber', vehicleNumber);
      requestData.append('userMobileNumber', userMobileNumber);
      requestData.append('date', dateS);
      requestData.append('tollPlaza', props.selectedToll);

      async function call_express(requestData) {
        try {
          const response_express = await axios.post('https://tohexpress.onrender.com/tollupload', requestData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });

          console.log(response_express);
          setLoader(false);
          setUploadStatus("Uploaded Successfully");
          document.getElementById('TollUploadForm').reset();

        } catch (error) {
          console.error('Error submitting form:', error);
          setLoader(false);
          setUploadStatus("Not Uploaded");
          console.error(error.response.data);
          if (error.response.data === "Session Expired, Please Login Again") {
            alert("Session Expired, Please Login Again");
            navigate('/toll');
          }
        }
      }

      if (vehicleNumber && userMobileNumber && base64String && img) {
        call_express(requestData);
      }
      else {
        console.log("Error : One or more fields are empty");
      }
    };
  }

  return (
    <div className=" mt-3  d-flex justify-content-center">
      <div className='TollUpload container' style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%'}} className='border border-white border-3 bg-black rounded-4 mt-5 p-4' encType='multipart/form-data' id='TollUploadForm' >
          <div id="TollUploadText">
            <h1 style={{color:'white'}}>Upload the data</h1>
          </div>
          <div className="col-sm-7">
            <label htmlFor="TollVehicleNumber" id="TollVehNo" style={{color:'white'}}className="form-label">VehicleNumber</label>
            <input type="text" className="form-control " onChange={handleVNOChange} id="TollVehicleNumber" required style={{ textTransform: 'uppercase', borderColor: 'black' }} />
          </div>
          <div className="col-sm-7 mt-2">
            <label htmlFor="TollUserMobileNo" id="TollUserNo" style={{color:'white'}}className="form-label">User Mobile Number</label>
            <input type="number" className="form-control " style={{borderColor: 'black'
            }} onChange={handleMNOChange} inputMode="numeric" id="TollUserMobileNo" required />
          </div>
          <div className="image col-sm-7 mt-2 mb-2">
            <label htmlFor="TollTireImage" id="TollUploadTire" style={{color:'white'}}className="form-label">Upload Tire(s) :</label>
            <input type="file" accept='image/*' name="tyre" onChange={handleImageChange} style={{ borderColor: 'black' }} required id="TollTireImage" maxLength={8} className='form-control' multiple />
          </div>
          {loader && <Loader />}
          
          <div className="col-12 mt-2 mb-2">
            <button type="submit" id="TollSubmit" className="btn btn-primary">Submit</button>
          </div>
          <div className="col-12 mt-2">
            <Link to="/toll/start" type='button' id='TollBack' className="btn btn-warning">Go Back</Link>
          </div>
          {uploadStatus && (
            <div className="col-12 mt-2 mb-2">
            {uploadStatus === 'Uploaded Successfully'? <button type="button" className="btn btn-success">{uploadStatus}</button> : <button type="button" className="btn btn-danger">{uploadStatus}</button>}
          </div>
          )}
        </form>
      </div>
    </div>
  );

}