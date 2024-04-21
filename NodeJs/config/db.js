const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ecom_db',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected to mongoose")
}).catch(()=>{
     console.log("error connecting to mongoose")
})
