const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { firstname, employeeID, password, email } = req.body;

  try {
    const userExists = await User.findOne({ employeeID });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstname,
      employeeID,
      password,
      email,
      role: 'employee',
    });

    res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      employeeID: user.employeeID,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { employeeID, password } = req.body;

  try {
    const user = await User.findOne({ employeeID });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        firstname: user.firstname,
        employeeID: user.employeeID,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid employeeID or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      firstname: user.firstname || '',
      middlename: user.middlename || '',
      lastname: user.lastname || '',
      preferredName: user.preferredName || '',

      employeeID: user.employeeID || '',
      email: user.email || '',
      occupation: user.occupation || '',
      gender: user.gender || '',
      nationality: user.nationality || '',
      dateOfBirth: user.dateOfBirth || '',

      phone: user.phone || '',
      emergencyContactName: user.emergencyContactName || '',
      emergencyContactNumber: user.emergencyContactNumber || '',

      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',

      department: user.department || '',
      team: user.team || '',
      jobTitle: user.jobTitle || '',
      employmentType: user.employmentType || '',
      manager: user.manager || '',
      workLocation: user.workLocation || '',
      employmentStatus: user.employmentStatus || '',

      role: user.role || '',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      firstname,
      middlename,
      lastname,
      preferredName,

      employeeID,
      email,
      occupation,
      gender,
      nationality,
      dateOfBirth,

      phone,
      emergencyContactName,
      emergencyContactNumber,

      address,
      city,
      state,
      country,

      department,
      team,
      jobTitle,
      employmentType,
      manager,
      workLocation,
      employmentStatus,
    } = req.body;

    const isManager = user.role === 'manager';
    const isAdmin = user.role === 'admin';

    // everyone can edit personal/basic fields
    user.firstname = firstname ?? user.firstname;
    user.middlename = middlename ?? user.middlename;
    user.lastname = lastname ?? user.lastname;
    user.preferredName = preferredName ?? user.preferredName;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.emergencyContactName =
      emergencyContactName ?? user.emergencyContactName;
    user.emergencyContactNumber =
      emergencyContactNumber ?? user.emergencyContactNumber;
    user.address = address ?? user.address;
    user.city = city ?? user.city;
    user.state = state ?? user.state;
    user.country = country ?? user.country;
    user.nationality = nationality ?? user.nationality;
    user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;

    // manager/admin can edit employment-managed fields
    if (isManager || isAdmin) {
      user.employeeID = employeeID ?? user.employeeID;
      user.occupation = occupation ?? user.occupation;
      user.gender = gender ?? user.gender;
      user.manager = manager ?? user.manager;
      user.department = department ?? user.department;
      user.team = team ?? user.team;
      user.jobTitle = jobTitle ?? user.jobTitle;
      user.employmentType = employmentType ?? user.employmentType;
      user.workLocation = workLocation ?? user.workLocation;
      user.employmentStatus = employmentStatus ?? user.employmentStatus;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      middlename: updatedUser.middlename,
      lastname: updatedUser.lastname,
      preferredName: updatedUser.preferredName,

      employeeID: updatedUser.employeeID,
      email: updatedUser.email,
      occupation: updatedUser.occupation,
      gender: updatedUser.gender,
      nationality: updatedUser.nationality,
      dateOfBirth: updatedUser.dateOfBirth,

      phone: updatedUser.phone,
      emergencyContactName: updatedUser.emergencyContactName,
      emergencyContactNumber: updatedUser.emergencyContactNumber,

      address: updatedUser.address,
      city: updatedUser.city,
      state: updatedUser.state,
      country: updatedUser.country,

      department: updatedUser.department,
      team: updatedUser.team,
      jobTitle: updatedUser.jobTitle,
      employmentType: updatedUser.employmentType,
      manager: updatedUser.manager,
      workLocation: updatedUser.workLocation,
      employmentStatus: updatedUser.employmentStatus,

      role: updatedUser.role,
      token: generateToken(updatedUser.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
};