const User = require('../models/User');

const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { role } = req.body;
    const allowedRoles = ['employee', 'manager', 'admin'];

    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }

    if (req.user.id === user.id && role !== 'admin') {
      return res.status(400).json({ message: 'Admin cannot downgrade own role' });
    }

    user.role = role;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      employeeID: updatedUser.employeeID,
      role: updatedUser.role,
      message: 'User role updated successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserRole, getAllUsers };