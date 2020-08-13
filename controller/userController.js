const model = require('../models/index');
const { Sequelize } = require('../models/index');
const {Op} = Sequelize
exports.cekUsia = ()=>{
    res.json({
        "keterangan" : "boleh"
      })
}

exports.getAllUser = async (req,res)=>{
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
}
exports.postUser = async (req,res)=>{
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
}

exports.updateUser = async (req,res)=>{
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
}
exports.deleteUser = async (req,res)=>{
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
}