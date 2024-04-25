const express= require('express');
const {fork} =require('child_process')
const app = express();

app.get('/',(req,res)=>{
   const child=fork('./longComputation.js');
   child.send('start');
   child.on('message',(message)=>{
   res.send({message: message});
   })
})

app.listen(3000,function(){
    console.log("run server");
})
