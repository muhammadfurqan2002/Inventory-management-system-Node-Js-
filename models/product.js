const mongoose=require('mongoose');
const { type } = require('os');


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    categeory:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    supplier:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }


},{timestamps:true});



const productModel=mongoose.model("product",productSchema);


module.exports={
    productModel,
}