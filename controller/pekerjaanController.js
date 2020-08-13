const model = require('../models/index');
const { Sequelize } = require('../models/index');
const {Op} = Sequelize

exports.uppercase = async (req,res)=>{
    try{
        var {pekerjaan} = req.body
        const send = await model.pekerjaan.create({pekerjaan});
        res.status(200).json(send)
      }catch(err){
        res.status(400).json(err.message)
      }
    
}
exports.findById = (req,res)=>{
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
}
exports.getPekerjaanById = (req,res)=>{
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
}
exports.postPekerjaan = async (req,res)=>{
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
}