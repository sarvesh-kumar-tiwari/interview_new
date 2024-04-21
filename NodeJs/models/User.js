const mongoose =require('mongoose');
const schema = new  mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    city:String,
})

const userModel = mongoose.model('users',schema);

module.exports =userModel;