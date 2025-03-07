const auth = require('../authmiddleware/auth');
const artController = require('../controller/ArtController');
const express = require('express');
const router = express.Router();

router.post('/create', auth, artController.createArt);
router.post('/create/many', auth, artController.createArts);
router.delete('/delete',auth,artController.deleteArt );
router.put('/update-stock',auth, artController.updateStock),
router.put('/update', auth, artController.updateArt);
router.get('/all',auth,artController.getAll);

module.exports= router