const { Router } = require('express');
const { getAllProducts, updateProduct } = require('../controllers/products.controllers');

const router = Router();

router.get('/get', getAllProducts);
router.put('/update', updateProduct);


module.exports = router;