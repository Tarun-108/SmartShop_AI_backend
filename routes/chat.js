const {Router} = require('express')
const chatsController = require('../controllers/chatsControllers')
const router = Router();
const { authenticateJWT } = require('../middlewares/auth')

router.post('/chat/updateTitle', authenticateJWT, chatsController.updateTitle);
router.post('/chat/addChat', authenticateJWT, chatsController.addChat);
router.post('/chat/addResponse', authenticateJWT, chatsController.addResponse);
router.post('/chat/getAll', authenticateJWT, chatsController.getAll);
router.post('/chat/get', authenticateJWT, chatsController.get);
router.post('/chat/generate', authenticateJWT, chatsController.generate);

module.exports = router;