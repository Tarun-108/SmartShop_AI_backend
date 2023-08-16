const {Router} = require('express')
const chatsController = require('../controllers/chatsController')
const router = Router();
const { authenticateJWT } = require('../middlewares/auth')

router.post('/chat/updateTitle', authenticateJWT, chatsController.updateTitle);
router.post('/chat/addChat', authenticateJWT, chatsController.addChat);
router.post('/chat/addResponse', authenticateJWT, chatsController.addResponse);
router.post('/chat/getAll', authenticateJWT, chatsController.getAll);
router.post('/chat/get', authenticateJWT, chatsController.get);

module.exports = router;