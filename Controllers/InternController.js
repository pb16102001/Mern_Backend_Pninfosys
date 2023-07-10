const InternModel = require("../models/Intern");
const cloudinary = require('cloudinary').v2;

class InternController{

    //user insert karega
    static Internship_insert = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        // const file =req.files.image;
        //console.log(file)

        // const internimage = await cloudinary.uploader.upload(file.tempFilePath,{
        //     folder:"Pn_infosys/Internship_image",
        //     width:150,
        // })
        // console.log(internimage)
        console.log(req.body);
        try {
            const {name, email, mobile_no,address,gender,college,qualification,branch,semester,internship_course} = req.body

            const result = new InternModel({
               name:name,
               email:email,
               mobile_no:mobile_no,
               address:address,
               gender:gender,
               college:college,
               qualification:qualification,
               branch:branch,
               semester:semester,
               internship_course:internship_course
            //    image:{
            //         public_id:internimage.public_id,
            //         url:internimage.secure_url,
            //     }
            })

            //save data
            const internimage1 = await result.save()
            res.send(internimage1)

        }
        catch (error) {
            console.log(error);

        }
    }

    static Intership_display = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const internshipall = await InternModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                internshipall

            })
        } catch (err) {
            console.log(err);
        }
    }

    static Internship_view = async (req, res) => {
        
        console.log(req.params.id);
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const intern = await InternModel.findById(req.params.id)
            res.status(200).json({
                //message:"Routing is working fine"
                success: true,
                intern

            })
        

        } catch (error) {
            console.log(error);
        }

    }

     //admin karega delete
     static deleteintern = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const intern = await InternModel.findByIdAndDelete(req.params.id,req.body)
            if (!intern){
               return res
                .status(500)
                .send({ status: "unsuccess", message: "Internship Not Found" });
            }
            const imageid = intern.image.public_id;
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            await InternModel.remove(intern)
            res
                .status(200)
                .send({ status: "success", message: "Internship Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    }

}

module.exports = InternController