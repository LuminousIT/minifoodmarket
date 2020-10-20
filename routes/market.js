const router = require('express').Router();
const {
  createMarket,
  updateMarket,
  deleteMarket,
  getMarket,
  getMarkets,
  addMarketImage,
  searchMarket,
} = require('../controllers/market.controller');

const { adminAuth } = require('../middlewares/authMiddleware');

router.post('/', adminAuth, createMarket);
router.put('/:marketId', adminAuth, updateMarket);
router.put('/delete/:marketId', adminAuth, deleteMarket);

router.get('/', getMarkets);
router.get('/search', searchMarket);
router.get('/:marketId', getMarket);

router.put('/image/:marketId', adminAuth, addMarketImage);

module.exports = router;
