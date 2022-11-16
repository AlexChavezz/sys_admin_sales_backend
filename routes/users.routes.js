const { Router } = require('express');
const { getUser, addUser } = require('../controllers/users.controllers');


const router = Router();
router.get('/', getUser);
router.get('/a', addUser)


module.exports = router;