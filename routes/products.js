const {Router} = require('express')
const productsControllers = require('../controllers/productsControllers')
const {authenticateJWT} = require("../middlewares/auth");
const router = Router();

router.post('/products/getAll', productsControllers.getAll);
router.post('/products/pics', authenticateJWT, productsControllers.getRecommended);

module.exports = router;