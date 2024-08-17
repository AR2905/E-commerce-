const express = require('express');
const { fetchCategories, createCategory } = require('../Controller/Category_Ctrl');

const router = express.Router();
//  /categories is already added in base path
router.get('/', fetchCategories).post('/',createCategory)

module.exports = router
