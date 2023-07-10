const express = require('express')   
const app = express()
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const { connectDB } = require('./DB/ConnectDB');

const cors = require('cors');
var bodyParser=require('body-parser')
const fileUpload = require("express-fileupload");
const web = require('./Routes/web.js');
const cloudinary = require('cloudinary')
const cookieParser = require('cookie-parser');


app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({useTempFiles: true}));

//dotenv port
dotenv.config({path:".env"})

//database connect
connectDB()

//express josn se postman se data uthakr late hai
app.use(express.json())

//image 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


//load Router
app.use('/api/pn',web)

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.listen(process.env.PORT, () => {
    console.log(`server is running of PN_infosys Project : ${process.env.PORT}`)
})