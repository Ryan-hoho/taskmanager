const express = require('express');
const router = express.Router();

const { protect, allowRoles } = require('../middleware/authMiddleware');
const { updateUserRole, getAllUsers } = require('../controllers/userController');

router.get('/all', protect, allowRoles('admin'), getAllUsers);
router.put('/:id/role', protect, allowRoles('admin'), updateUserRole);

module.exports = router;