const mongoose =require('mongoose');
const schema = new  mongoose.Schema({
    name:String,
    age:Number,
    email:{
        type:String,
        unique:true,
    },
    city:String,
})

module.exports = mongoose.model('users',schema);;