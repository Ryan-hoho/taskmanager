
const express = require('express');
const { getClients, addClient, updateClient, deleteClient } = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getClients).post(protect, addClient);
router.route('/:id').put(protect, updateClient).delete(protect, deleteClient);

module.exports = router;
