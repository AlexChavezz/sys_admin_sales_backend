const { Router } = require('express');
const { getUser, addUser, updateUser } = require('../controllers/users.controllers');


const router = Router();
router.post('/get', getUser);
router.get('/add', addUser);
router.put('/update', updateUser);

module.exports = router;