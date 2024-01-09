// ! Routes.js
// ^ importing modules
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const axios = require('axios');
const TollData = require('./models/TollDataSch');
const app = express();
const blobUtil = require('blob-util');
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv').config();

// ^ defining port
const express_port = 4000;

// ^ CORS 
app.use(cors());

// & Multer config for TollUpload
const TollUp = multer.memoryStorage();
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } });

// & Multer config for GuestUpload
const GuestUp = multer.memoryStorage();
const Guestupload = multer({ storage: GuestUp })

// & Google Cloud Storage connection
const storage = new Storage({
  projectId: 'deployflask-409215',
  keyFilename: './deployflask-409215-ebd0880e3066.json',
});
const bucket = storage.bucket('tiresonhighways');

// & MongoDB connection
mongoose.connect("mongodb://localhost:27017/myFirst")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON and serving static files
app.use(express.urlencoded({ extended: true }));

//! Slash Route for testing
app.get('/', (req, res) => {
  res.send("Hello TiresOnHighways User!!!");
});

//! TollUpload Route
app.post('/tollupload', Tollupload.single("TolluploadImage"), async (req, res) => {

  const { vehicleNumber, userMobileNumber, userTyre64 } = req.body;

  const files = req.files;
  const tollImageBuffer = files[0].buffer;
  const tollBlob = blobUtil.createBlob([tollImageBuffer], { type: 'image/jpeg' });

  const tollFlaskRequestData = new FormData();
  tollFlaskRequestData.append('image', tollBlob, 'TolluploadImage.jpg');
  let tollFlaskResponse = null;

  try {
    console.log("Sending file to flask api. . . ");
    const tollResponse_flask = await axios.post(`https://finalflask.el.r.appspot.com/classify`, tollFlaskRequestData)
    tollFlaskResponse = tollResponse_flask.data;


    if (tollFlaskResponse["error"]) {
      return res.status(500).send('Bad response from flask api');
    }

    try {
      const tollData = new TollData({
        vehicleNumber: vehicleNumber,
        userMobileNumber: userMobileNumber,
        userTyre64: userTyre64,
        tyreStatus: tollFlaskResponse
      });

      await tollData.save();
      res.send(`Data saved to MongoDB: ${JSON.stringify(tollData, null, 2)}`);

    } catch (err) {
      res.status(500).send('Error saving data to MongoDB');
    }


  } catch (error) {
    return res.status(500).send('Error sending file to flask_api');
  }
});

// ! GuestUpload Route
app.post('/guestUp', Guestupload.any(), async (req, res) => {

  const guestBlobArray = [];

  try {
    const files = req.files;

    for (let i = 0; i < files.length; i++) {
      const guestImageBuffer = files[i].buffer;
      const guestBlob = blobUtil.createBlob([guestImageBuffer], { type: 'image/jpeg' });
      guestBlobArray.push(guestBlob);
    }

    const guestFlaskRequestData = new FormData();
    guestBlobArray.forEach((guestBlob) => {
      guestFlaskRequestData.append('image', guestBlob, 'guestTireImage.jpg');
    });

    const guestFlaskResponse = [];


    try {
      const guestResponse_flask = await axios.post("https://finalflask.el.r.appspot.com/classify", guestFlaskRequestData);
      for (let i = 0; i < files.length; i++) {
        guestFlaskResponse.push(guestResponse_flask.data[i]);
      }

      if (guestFlaskResponse["error"]) {
        return res.status(500).send('Bad response from flask api');
      }

      return res.send(guestFlaskResponse);
    }

    catch (error) {
      return res.status(500).send('Error sending file to flask_api');
    }
  } catch (err) {
    return res.status(500).send('Error reading folder');
  }
});

// ! GuestDetails Route
app.get('/guestDet', async (req, res) => {
  try {
    const vehicleNumber = req.query.vehicleNumber;
    const tollData = await TollData.find({ vehicleNumber: vehicleNumber });
    res.send(tollData);
  }
  catch (err) {
    res.send("No Data Found");
  }
});

// ^ Server listening on port 4000
app.listen(express_port, () => console.log(`Server is listening on port ${express_port}`));
