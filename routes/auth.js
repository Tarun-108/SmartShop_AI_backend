const {Router} = require('express')
const authController = require('../controllers/authControllers')
const router = Router();

router.post('/register', authController.register_post);
router.post('/login', authController.login_post);

// router.get('/register', () => {});
// router.get('/signup', () => {});

module.exports = router;