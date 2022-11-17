const { Router } = require('express');
const { getUser, addUser, updateUser, getAllUsers, deleteUser } = require('../controllers/users.controllers');


const router = Router();
router.get('/getAll', getAllUsers);
router.post('/get', getUser);
router.post('/add', addUser);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;