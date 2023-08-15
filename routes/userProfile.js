const {Router} = require('express')
const userProfileController = require('../controllers/userProfileControllers')
const router = Router();

router.post('/user/create', userProfileController.create_post);
router.post('/user/get', userProfileController.getUser_post);

module.exports = router;