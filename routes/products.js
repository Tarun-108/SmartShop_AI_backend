const {Router} = require('express')
const productsControllers = require('../controllers/productsControllers')
const {authenticateJWT} = require("../middlewares/auth");
const router = Router();

router.post('/products/getAll', productsControllers.getAll);
router.post('/products/pics', authenticateJWT, productsControllers.getRecommended);
router.post('/products/homeProducts', authenticateJWT, productsControllers.getHomeProducts);

module.exports = router;