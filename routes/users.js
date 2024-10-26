const express = require('express');
const router = express.Router();

const usersListController = require('../controllers/usersController');
router.get('/', usersListController.getAllUsersCollection);
router.get('/:id', usersListController.getEachUser);
router.post('/', usersListController.addnewUser);
router.put('/:id', usersListController.updateUser);
router.delete('/:id', usersListController.deleteUser);
module.exports = router;
