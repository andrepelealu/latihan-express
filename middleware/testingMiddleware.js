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

exports.uppercase= async (req,res,next)=>{
    try{
        
        let data = await req.body.pekerjaan.toUpperCase()
        req.body.pekerjaan = data
        next()
    }catch (err){
  
    }
 

}