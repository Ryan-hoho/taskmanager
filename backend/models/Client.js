
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    company: { type: String, required: true  },
    occupation: { type: String, required: true  },
    email: { type: String, required: true  },
    phone: { type: String, required: true  },
    clientStatus: { type: String, enum:['Active','Inactive'], default:'Active' },



});

module.exports = mongoose.model('Client', clientSchema);
