
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    middlename:{ type: String  },
    lastname:{ type: String },
    employeeID: { type: String, required: true, unique: true },
    email:{ type: String, unique: true  },
    password: { type: String, required: true },
    occupation:{ type: String },
    gender:{ type: String  },
    address: { type: String },
    manager: { type: String },
    role : { type: String , default: 'employee'},



});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
