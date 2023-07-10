const teamModel = require('../models/Team');

const cloudinary = require('cloudinary').v2;

class TeamController{

    static Team_display = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const teamall = await teamModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                teamall

            })
            
        } catch (err) {
            console.log(err);
        }
    }

    static teaminsert = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        const file =req.files.image;
        //console.log(file)

        const teamimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"Pn_infosys/team_image",
            width:150,
        })
        console.log(teamimage)
        console.log(req.body);
        try {
            const { name , position} = req.body

            const result = new teamModel({
                name: name,
                position: position,
                image:{
                    public_id:teamimage.public_id,
                    url:teamimage.secure_url,
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

    static update_team = async(req,res)=>{
        console.log(req.params.id)
        console.log(req.body)
       
        try {
            //res.header("Access-Control-Allow-Origin", "*")
            const result = await teamModel.findById(req.params.id);
            const image_id = result.image.public_id;
            await cloudinary.uploader.destroy(image_id)

            const file =req.files.image;
            const teamimage= await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"Pn_infosys/team_image",
                width:150,
            })

            const update_team = await teamModel.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                position:req.body.position,
                image:{
                    public_id:teamimage.public_id,
                    url:teamimage.secure_url,
                }
            })
            console.log(update_team)

            res.status(200).json({
                //message:"routing is working fine"
                success: true,
                update_team

            })
            
        } catch (err) {
            console.log(err);
        }
    }

    static deleteteam = async(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const teamdelete = await teamModel.findByIdAndDelete(req.params.id)
            if (!teamdelete) {
               return res
                .status(500)
                .send({ status: "unsuccess", message: "team Not Found" });
            }

            const imageid = teamdelete.image.public_id;
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            await teamModel.remove(teamdelete)
            res
                .status(200)
                .send({ status: "success", message: "team Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    


    }
}

module.exports=TeamController