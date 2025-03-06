const express = require('express');
const router = express.Router();
const messageController = require('../controller/MessageController');
router.post('/send', messageController.sendMessage);
router.get('/get', messageController.getMessage);
router.delete('/delete/:id', messageController.deleteMessage);
router.put('/update/:id', messageController.updateMessage);
module.exports = router;
