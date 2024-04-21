const express= require('express');
const userModel = require('../models/User');
const route = express.Router();
route.get('/', async function(req,res){
    try {
        const users = await userModel.find();
        res.send(users);
     } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
     }
})

module.exports=route;