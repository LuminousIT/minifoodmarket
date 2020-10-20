const router = require('express').Router();

const {
  login,
  register,
  getAdmin,
  addAdmin,
} = require('../controllers/admin.controller');
const { adminAuth } = require('../middlewares/authMiddleware');

router.get('/', adminAuth, getAdmin);
router.get('/addadmin', addAdmin);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
