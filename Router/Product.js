const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../Controller/Product_Ctrl');

const router = express.Router();
//  /products is already added in base path
router.post('/', createProduct)
      .get('/', fetchAllProducts)
      .get('/:id', fetchProductById)
      .patch('/:id', updateProduct)

      
      
module.exports = router