const router = require('express').Router();
const {
  getCategories,
  createCategory,
} = require('../controllers/category.controller');

const { adminAuth } = require('../middlewares/authMiddleware');
router.get('/', adminAuth, getCategories);
router.post('/', adminAuth, createCategory);
// router.get('/:categoryId', getCategory);
// router.put('/:categoryId', updateCategory);
// router.put('/delete/:categoryId', deleteCategory);

module.exports = router;
