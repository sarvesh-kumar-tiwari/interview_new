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

route.get(`/delete/:id`, async function(req, res){
  try {
   const users = await userModel.findOneAndDelete({ _id: req.params.id });
    if (!users) {
     return res.status(404).send('User not found');
    }
    res.send(`Deleted user with id ${req.params.id}`);
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
  }
})

module.exports=route;