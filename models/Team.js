const mongoose = require('mongoose');


const teamSchema =new mongoose.Schema({
    name: {type:String, 
        required: true,
    },

	position: {
        type:String, 
        required: true,
        },
    
    image:   //array mai rakhege bahut sari image
    {
        public_id: {
            type: String,
            //required: true,
        },
        url: {
            type: String,
            //required: true,
        },
    },
     
    
    
},{timestamps:true});


 
var teamModel = mongoose.model('Team', teamSchema);
module.exports=teamModel;