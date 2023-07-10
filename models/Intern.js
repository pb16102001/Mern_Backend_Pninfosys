const mongoose = require('mongoose');


//define schema
const InternSchema = new mongoose.Schema({
    

      
        name : {type:String, required:true},
        email:  {type:String,required:true},
        mobile_no : {type:Number,required:true},
        address:  {type:String,required:true},
        gender :  {type:String,required:true},
        college :  {type:String,required:true},
        qualification:  {type:String,required:true},
        branch: {type:String,required:true},
        semester: {type:String,required:true},
        internship_course: {type:String,required:true},
        // image:   //array mai rakhege bahut sari image
        // {
        //     public_id: {
        //     type: String,
        //     //required: true,
        //     },
        //     url: {
        //     type: String,
        //     //required: true,
        //     },
        // },
    
},{timestamps:true});

const InternModel = mongoose.model('Internship' , InternSchema)

module.exports = InternModel