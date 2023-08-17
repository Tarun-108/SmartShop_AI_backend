const {Router} = require('express')
const chatsController = require('../controllers/chatsControllers')
const router = Router();
const { authenticateJWT } = require('../middlewares/auth')

router.post('/chat/updateTitle', authenticateJWT, chatsController.updateTitle);
router.post('/chat/addChat', authenticateJWT, chatsController.addChat);
router.post('/chat/addResponse', authenticateJWT, chatsController.addResponse);
router.get('/chat/getAll', authenticateJWT, chatsController.getAll);
router.get('/chat/get', authenticateJWT, chatsController.get);

module.exports = router;