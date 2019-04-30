const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactAppSchema = new Schema({
    name: {type: String, required: true, max: 100},
    phone: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Contact', ContactAppSchema);