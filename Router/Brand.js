const express = require('express');
const { fetchBrands, createBrand } = require('../Controller/Brand_Ctrl');

const router = express.Router();
//  /brands is already added in base path
router.get('/', fetchBrands).post('/', createBrand);

module.exports = router
