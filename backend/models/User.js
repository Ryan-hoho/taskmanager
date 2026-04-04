const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    middlename: { type: String, default: '' },
    lastname: { type: String, default: '' },
    preferredName: { type: String, default: '' },

    employeeID: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true, default: '' },
    password: { type: String, required: true },

    occupation: { type: String, default: '' },
    gender: { type: String, default: '' },
    nationality: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },

    phone: { type: String, default: '' },
    emergencyContactName: { type: String, default: '' },
    emergencyContactNumber: { type: String, default: '' },

    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },

    department: { type: String, default: '' },
    team: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    employmentType: { type: String, default: '' },
    manager: { type: String, default: '' },
    workLocation: { type: String, default: '' },
    employmentStatus: { type: String, default: '' },

    role: {
      type: String,
      enum: ['employee', 'manager', 'admin'],
      default: 'employee',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);