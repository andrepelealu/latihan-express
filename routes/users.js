var express = require('express');
var router = express.Router();
const middleware = require('../middleware/testingMiddleware')
const userController = require('../controller/userController')
const pekerjaanController = require('../controller/pekerjaanController')
//middleware cek usia
router.get('/cekusia/:usia', middleware.cekUsia, userController.cekUsia);

//middleware uppercase 
router.post('/pekerjaan/uppercase', middleware.uppercase, pekerjaanController.uppercase)

// GET users by id.
router.get('/find/:id',pekerjaanController.findById)

//GET Pekerjaan by Id
router.get('/pekerjaan/:id', pekerjaanController.getPekerjaanById)
//GET All user
router.get('/', userController.getAllUser);
// POST users
router.post('/', userController.postUser);
//post pekerjaan
router.post('/pekerjaan', pekerjaanController.postPekerjaan);
// UPDATE users
router.patch('/:id', userController.updateUser);
// DELETE users
router.delete('/:id',userController.deleteUser);
module.exports = router;
