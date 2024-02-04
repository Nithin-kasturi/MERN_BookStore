const mongoose=require('mongoose');
const userSchema=mongoose.model('User',{
    email:String,
    password:String,
    comments:[{
        id:String,
        comment:String,
    }],
    replies:[
        {  
            id:String,
            email:String,
            reply:String,
        }
    ],
});
module.exports=userSchema;