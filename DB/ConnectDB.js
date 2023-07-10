const mongoose = require('mongoose');

const connectDB = ()=>{
    return mongoose.connect(process.env.DB_URL) 
    .then(()=>{
        console.log('Connection successfully,Of PN_infosys Project 💦💦💦💦💦 ')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports={
    connectDB
}













