const newsModel = require("../models/News_events");
const cloudinary = require('cloudinary').v2;

class News_eventsControllers{

    static News_eventsinsert = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        const file =req.files.pimage;
        //console.log(file)

        const newsimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"Pn_infosys/News_events_image",
            width:150,
        })
        console.log(newsimage)
        console.log(req.body);
        try {
            const { title , description} = req.body

            const result = new newsModel({
                title: title,
                description: description,
                pimage:{
                    public_id:newsimage.public_id,
                    url:newsimage.secure_url,
                }
            })

            //save data
            const newsimage1 = await result.save()
            res.send(newsimage1)

        }
        catch (error) {
            console.log(error);

        }
    }

    
    static News_events_display = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const newsall = await newsModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                newsall

            })
            //console.log(newsall)
            //res.send(newsall)
        } catch (err) {
            console.log(err);
        }
    }

    
    static update_news_events = async(req,res)=>{
        console.log(req.params.id)
        console.log(req.body)
       
        try {
            //res.header("Access-Control-Allow-Origin", "*")
            const result = await newsModel.findById(req.params.id);
            const image_id = result.pimage.public_id;
            await cloudinary.uploader.destroy(image_id)

            const file = req.files.pimage;
            const newsimage= await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"Pn_infosys/News_events_image",
                width:150,
            })

            const updatenews = await newsModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                pimage:{
                    public_id:newsimage.public_id,
                    url:newsimage.secure_url,
                }
            })
            console.log(updatenews)

            res.status(200).json({
                //message:"routing is working fine"
                success: true,
                updatenews

            })
            // console.log(updatenews)
            // res.send(updatenews)
        } catch (err) {
            console.log(err);
        }



    }

    
    static delete_news_events = async(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const newsdelete = await newsModel.findByIdAndDelete(req.params.id)
            if (!newsdelete) {
               return res
                .status(500)
                .send({ status: "unsuccess", message: "News events Not Found" });
            }

            const imageid = newsdelete.pimage.public_id;
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            await newsModel.remove(newsdelete)
            res
                .status(200)
                .send({ status: "success", message: "News events Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    


    }

}

module.exports=News_eventsControllers