const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
    vehicleNumber: String,
    userMobileNumber: String,
    userTyre64: String,
    tyreStatus : Object,
}); 

const TollData = mongoose.model('First', firstSchema);

module.exports = TollData;
