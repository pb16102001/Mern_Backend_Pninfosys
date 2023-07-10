const sliderModel = require('../models/Slider');

const cloudinary = require('cloudinary').v2;

class Slidercontroller{

    
    static silderdisplay = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const sliderall = await sliderModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                sliderall

            })
            //console.log(getall)
            //res.send(getall)
        } catch (err) {
            console.log(err);
        }
    }
    
    static sliderinsert = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        const file =req.files.pimage;
        console.log(file)

        const sliderimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"Pn_infosys/slider_image",
            width:150,
        })
        console.log(sliderimage)
        console.log(req.body);
        try {
            const { title , description} = req.body

            const result = new sliderModel({
                title: title,
                description: description,
            
                pimage:{
                    public_id:sliderimage.public_id,
                    url:sliderimage.secure_url,
                }
            })

            //save data
            const result1 = await result.save()
            res.send(result1)

        }
        catch (error) {
            console.log(error);

        }
    }

    
    static updateslider = async(req,res)=>{
        console.log(req.params.id)
        console.log(req.body)
       
        try {
            //res.header("Access-Control-Allow-Origin", "*")
            const result = await sliderModel.findById(req.params.id);
            const image_id = result.pimage.public_id;
            await cloudinary.uploader.destroy(image_id)

            const file = req.files.pimage;
            const sliderimage= await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"Pn_infosys/slider_image",
                width:150,
            })

            const updateslider = await sliderModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                pimage:{
                    public_id:sliderimage.public_id,
                    url:sliderimage.secure_url,
                }
            })
            console.log(updateslider)

            res.status(200).json({
                //message:"routing is working fine"
                success: true,
                updateslider

            })
            // console.log(updateslider)
            // res.send(updateslider)
        } catch (err) {
            console.log(err);
        }



    }

    
    static deleteslider = async(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const sliderdelete = await sliderModel.findByIdAndDelete(req.params.id)
            if (!sliderdelete) {
               return res
                .status(500)
                .send({ status: "unsuccess", message: "slider Not Found" });
            }

            const imageid = sliderdelete.pimage.public_id;
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            await sliderModel.remove(sliderdelete)
            res
                .status(200)
                .send({ status: "success", message: "slider Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    


    }

}


module.exports = Slidercontroller