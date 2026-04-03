
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectname: { type: String, required: true },
    company: { type: String, required: true },
    contactmember: { type: String, required: true },
    email: { type: String},
    phone: { type: String},
    startdate: { type: Date, required: true },
    priority: { type: String, enum:['High', 'Medium', 'Low'] },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date },

});

module.exports = mongoose.model('Task', taskSchema);
