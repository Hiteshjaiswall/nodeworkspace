const mongoose = reqire('mongoose');

const userSchema =new mongoose.schema({
    email:{
        type: String,
        reqire: true,
        unique:true
    }, 
    password:{
        type:String, 
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    
}, {
    timestamps:true
});

const User =mongoose.model('user', userSchema);

module.exports=User;