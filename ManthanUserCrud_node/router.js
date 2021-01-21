const express = require('express');

const router = express.Router();
const jwtAuth = require('./Authentication')

const useController = require('./controller/user.controller')


// router.get('/', jwtAuth.verifyJWTToken , useController.getUserData )

router.get('/' , useController.getUserData )

router.post('/addEditUser' , useController.AddEditUser )

router.post('/deleteUser' , useController.DeleteUser )


module.exports = router;