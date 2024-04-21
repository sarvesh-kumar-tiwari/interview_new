const express= require('express');
const userModel = require('../models/User');
const route = express.Router();
route.get('/', async function(req,res){
    try {
        const users = await userModel.find();
        res.send(users);
     } catch (error) {
      //   console.error('Error fetching users:', error);
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
      // console.error('Error deleting user:', error);
      res.status(400).send('Internal Server Error');
  }
})
route.post('/createUser',async function (req, res) {
   try {
      const users = await userModel.create({name: req.body.name,email: req.body.email});
       if (!users) {
        return res.status(404).send('Insert User info');
       }
     } catch (error) {
         res.status(400).send({message: error.message});
     }
})

module.exports=route;