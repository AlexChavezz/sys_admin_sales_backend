const { Router } = require('express');
const { getUser } = require('../controllers/users.controllers');


const router = Router();
router.get('/', getUser);



module.exports = router;