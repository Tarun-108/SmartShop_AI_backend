const {Router} = require('express')
const userProfileController = require('../controllers/userProfileControllers')
const router = Router();
const { authenticateJWT } = require('../middlewares/auth')

router.post('/user/create', authenticateJWT, userProfileController.create_post);
router.post('/user/get', authenticateJWT, userProfileController.getUser_post);
router.post('/user/addPurchases', authenticateJWT, userProfileController.addPurchases);

module.exports = router;