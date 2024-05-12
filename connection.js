const mongoose=require('mongoose');

function connectDB(connection){
    return mongoose.connect(connection);
}



module.exports={
    connectDB,
}