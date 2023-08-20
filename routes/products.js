const {Router} = require('express')
const productsControllers = require('../controllers/productsControllers')
const router = Router();

router.post('/products/getAll', productsControllers.getAll);
router.post('/products/pics', productsControllers.getRecommended);

module.exports = router;