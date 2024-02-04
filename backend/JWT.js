const {sign,verify}=require('jsonwebtoken');
const createToken=(user)=>{
    const accessToken=sign({email:user.email},"Nithin-Kasturi");
    return accessToken;
}
const validateToken=(req,res,next)=>{
    const accessToken=req.cookies['Access-token'];
    if(!accessToken){
        return  res.send("User not authenticated");
    }
    try {
        const validToken=verify(accessToken,"Nithin-Kasturi");
        if(validToken){
            req.authenticated=true;
            return next();
        }
    } catch (error) {
        res.send(error);
    }
}
module.exports={createToken,validateToken};