
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { firstname, employeeID, password,role } = req.body;
    try {
        const userExists = await User.findOne({ employeeID });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ firstname, employeeID, password,role });
        res.status(201).json({ id: user.id, firstname: user.firstname, employeeID: user.employeeID, role: user.role, token: generateToken(user.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { employeeID, password } = req.body;
    try {
        const user = await User.findOne({ employeeID });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({ id: user.id, firstname: user.firstname, employeeID: user.employeeID, role:user.role, token: generateToken(user.id) });
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
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        employeeID: user.employeeID,
        email: user.email,
        occupation: user.occupation,
        gender: user.gender,
        address: user.address,
        manager: user.manager,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

       
        const { firstname, middlename,lastname, employeeID, email, occupation,gender, address, manager } = req.body;   
        const isAdmin=user.role=='mananger'
        user.firstname = firstname || user.firstname;
        user.middlename = middlename || user.middlename;
        user.lastname = lastname || user.lastname;
        user.email= email || user.email;
        user.address = address || user.address;
        if (isAdmin){
        user.employeeID = employeeID || user.employeeID;
        user.occupation = occupation || user.occupation;
        user.manager= manager || user.manager;
        user.gender = gender || user.gender;
            }






        const updatedUser = await user.save();
        res.json({ id: updatedUser.id, firstname: updatedUser.firstname, middlename: updatedUser.middlename, lastname: updatedUser.lastname, 
            employeeID: updatedUser.employeeID, email: updatedUser.email, occupation: updatedUser.occupation, gender: updatedUser.gender, 
            address: updatedUser.address, manager: updatedUser.manager,  role: updatedUser.role, token: generateToken(updatedUser.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile, getProfile };
