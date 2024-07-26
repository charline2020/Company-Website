const mongoose = require('mongoose');

// create model structure
let contactFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    message: {
        type: String,
        required: true
    }
});

let contactFormModel = mongoose.model('contactForm', contactFormSchema);

// export the object
module.exports = contactFormModel;