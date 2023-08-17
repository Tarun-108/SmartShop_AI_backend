const {Router} = require('express')
const productsControllers = require('../controllers/productsControllers')
const router = Router();

router.post('/chat/getAll', productsControllers.getAll);

module.exports = router;