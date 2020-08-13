var express = require('express');
var router = express.Router();
const model = require('../models/index');
const { response } = require('../app');
const { Sequelize } = require('../models/index');
const middleware = require('../middleware/testingMiddleware')
const {Op} = Sequelize

//middleware cek usia
router.get('/cekusia/:usia', middleware.cekUsia, function(req,res){
    res.json({
      "keterangan" : "boleh"
    })
})

//middleware uppercase 
router.post('/pekerjaan/uppercase', middleware.uppercase, async function(req,res){
  try{
    var {pekerjaan} = req.body
    const send = await model.pekerjaan.create({pekerjaan});
    res.status(200).json(send)
  }catch(err){
    res.status(400).json(err.message)
  }


})

// GET users listing.
router.get('/find/:id',function(req,res){
  let {id} = req.params

  model.users.findByPk(id,{
    include: [model.pekerjaan]
  }).then((data)=>{
    if(data){
      res.json(data)

    }else{
      res.json('data tidak ditemukan')
    }

  })
})


router.get('/pekerjaan/:id',function(req,res){
  let {id} = req.params

  model.pekerjaan.findByPk(id,{
    include: [model.users]
  }).then((data)=>{
    if(data){
      res.json(data)

    }else{
      res.json('data tidak ditemukan')
    }

  })
})

router.get('/', async function (req, res, next) {
  try {
    let filter= {}
    let {q} = req.query
    if(q){
      filter = {
        where:{
          name:{
            [Op.like] : `${q}%`
          }
        }
      }
    }
    const users = await model.users.findAll(filter );
    if (users.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': users
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.messages,
      'data': {}
    })
  }
});
// POST users
router.post('/', async function (req, res, next) {
  try {
    const {
      name,
      email,
      gender,
      phoneNumber
    } = req.body;
    const users = await model.users.create({
      name,
      email,
      gender,
      phone_number: phoneNumber
    });
  if (users) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'User berhasil ditambahkan',
      'data': users,
    })
  }
 } catch (err) {
   res.status(400).json({
     'test': 'error',
     'messages': err.message,
     'data': {},
   })
 }
});
//post pekerjaan
router.post('/pekerjaan', async function (req, res, next) {
  try {
    const {
      pekerjaan,
  
    } = req.body;
    const users = await model.pekerjaan.create({
      pekerjaan
     
    });
  if (users) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'pekerjaan berhasil ditambahkan',
      'data': users,
    })
  }
 } catch (err) {
   res.status(400).json({
     'test': 'error',
     'messages': err.message,
     'data': {},
   })
 }
});
// UPDATE users
router.patch('/:id', async function (req, res, next) {

  try {

    const usersId = req.params.id;
    const {
      name,
      email,
      gender,
      phoneNumber
    } = req.body;
    const users = await model.users.update({
      name,
      email,
      gender,
      phone_number: phoneNumber
    }, {
      where: {
        id: usersId
      }
    });
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': users,
      })
    }
  } catch (err) {
    res.status(400).json(err.message)
  }
});
// DELETE users
router.delete('/:id', async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const users = await model.users.destroy({ where: {
      id: usersId
    }})
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil dihapus',
        'data': users,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});
module.exports = router;
