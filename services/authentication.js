const jwt=require('jsonwebtoken');

const sercetKey="#@1234";




function createTokenFromUser(user){
  
    const payLoad={
        _id:user._id,
        name:user.name,
        email:user.email
    };
    return jwt.sign(payLoad,sercetKey);
}



function verifyToken(token){
   
    if(!token){
        return  null;
    }
   
    return jwt.verify(token,sercetKey);
}

module.exports={
    verifyToken,
    createTokenFromUser,
}
