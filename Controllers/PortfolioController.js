const portfolioModel = require('../models/Portfolio');

const cloudinary = require('cloudinary').v2;

class PortfolioControllers{

    static Portfolio_insert = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        const file =req.files.pimage;
        //console.log(file)

        const portfolioimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"Pn_infosys/portfolio_image",
            width:150,
        })
        console.log(portfolioimage)
        console.log(req.body);
        try {
            const { title , link } = req.body

            const result = new portfolioModel({
                title: title,
                link: link,
                pimage:{
                    public_id:portfolioimage.public_id,
                    url:portfolioimage.secure_url,
                }
            })

            //save data
            const portfolioimage1 = await result.save()
            res.send(portfolioimage1)

        }
        catch (error) {
            console.log(error);

        }
    }

    
    static Portfolio_display = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const portfolioall = await portfolioModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                portfolioall

            })
            //console.log(portfolioall)
            //res.send(portfolioall)
        } catch (err) {
            console.log(err);
        }
    }

    
    static update_portfolio = async(req,res)=>{
        console.log(req.params.id)
        console.log(req.body)
       
        try {
            //res.header("Access-Control-Allow-Origin", "*")
            const result = await portfolioModel.findById(req.params.id);
            const image_id = result.pimage.public_id;
            await cloudinary.uploader.destroy(image_id)

            const file = req.files.pimage;
            const portfolioimage= await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"Pn_infosys/portfolio_image",
                width:150,
            })

            const updateportfolio = await portfolioModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                link:req.body.link,
                pimage:{
                    public_id:portfolioimage.public_id,
                    url:portfolioimage.secure_url,
                }
            })
            console.log(updateportfolio)

            res.status(200).json({
                //message:"routing is working fine"
                success: true,
                updateportfolio

            })
            // console.log(updateportfolio)
            // res.send(updateportfolio)
        } catch (err) {
            console.log(err);
        }



    }

    
    static delete_portfolio = async(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const portfoliodelete = await portfolioModel.findByIdAndDelete(req.params.id)
            if (!portfoliodelete) {
               return res
                .status(500)
                .send({ status: "unsuccess", message: "Portfolio Not Found" });
            }

            const imageid = portfoliodelete.pimage.public_id;
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


            await portfolioModel.remove(portfoliodelete)
            res
                .status(200)
                .send({ status: "success", message: "Portfolio Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    


    }

}

module.exports=PortfolioControllers