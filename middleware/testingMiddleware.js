exports.middlewareTest = (params,req,res,next) =>{
    console.log(`middleware : ${params}`);
}

exports.cekUsia=(req,res,next)=>{
    let usia = req.params.usia
    if(usia<18){
        res.json({
            "message": "belum cukup usia"
        })
    }else{
        next()
    }
}

exports.uppercase=(req,res,next)=>{
    if(!req.body.string){
        res.json({
            "message" : "data harus di isi"
        })
    }
    let data = req.body.string
    req.body.string = data.toUpperCase();
    next()
}