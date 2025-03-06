const express = require('express');
const router = express.Router();
const messageController = require('../controller/MessageController');
const auth = require('../authmiddleware/auth');
router.post('/send',auth, messageController.sendMessage);
router.get('/get',auth, messageController.getMessage);
router.delete('/delete/:id',auth, messageController.deleteMessage);
router.put('/update/:id',auth, messageController.updateMessage);
module.exports = router;
