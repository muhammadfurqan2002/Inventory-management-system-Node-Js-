const mongoose=require('mongoose');
const {createHmac,randomBytes}=require('node:crypto');
const { createTokenFromUser } = require('../services/authentication');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    salt:{
        type:String
    }

},{timestamps:true});


userSchema.pre('save',
function(next){
    const user=this;

    if(!user.isModified("password"))return;

    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hashedPassword;

    next();
})


userSchema.statics.verifyPassword = async function (email, password) {
   
    try {
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error("User Not Found");
        }
        const salt = user.salt;
        const hashPassword = createHmac("sha256", salt).update(password).digest('hex');

        if (user.password !== hashPassword) {
            throw new Error("Incorrect Password");
        }
        const token = createTokenFromUser(user);
        return token;
    } catch (error) {
        console.error("Error in verifyPassword:", error);
        throw error;
    }
};



const userModel=mongoose.model('user',userSchema);








module.exports={
    userModel,
}




