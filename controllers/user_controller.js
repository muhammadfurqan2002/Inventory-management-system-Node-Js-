const { userModel } = require('../models/user');
const {validationResult}=require('express-validator');
async function loginUser(req, res, next) {
        const { email, password } = req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const token = await userModel.verifyPassword(email, password);
            return res.cookie("token", token).json({ Token: `${token}` });    
        }catch(e){
            next(e);
        }
}

async function signUp(req, res,next) {
        const { email, name, password } = req.body;
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        try{
            const user = await userModel.create({
                email,
                name,
                password
            });
            return res.json({ msg: "user created" ,
                user:user
            });
        }catch(e){
            next(e);
        }
}


module.exports={
    loginUser,
    signUp
}