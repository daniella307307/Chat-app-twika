const express= require('express');
const router= express.Router();
const userController= require('../controller/UserController');
router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/update',userController.updateProfile);
router.delete('/delete',userController.deleteProfile);
router.post('/get',userController.getUser);
module.exports=router;