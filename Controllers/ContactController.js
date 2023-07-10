const contactModel = require("../models/Contact")

class ContactController{
   
    //admin karega display
    static contactall = async (req, res) => {
        try {
            res.header("Access-Control-Allow-Origin", "*")
            const contactall = await contactModel.find()
            res.status(200).json({
                //message:"TOuting is working fine"
                success: true,
                contactall

            })
            //console.log(contactall)
            //res.send(contactall)
        } catch (err) {
            console.log(err);
        }
    }

    //user insert Karega
    static contactinsert =async(req,res)=>{
        //console.log(req.body)
        try{
            res.header("Access-Control-Allow-Origin", "*")
            const contact = await contactModel.create(req.body)

            res.status(201).json({
                success:true,
                contact
            })
        }catch(error){
            console.log(error)
        }
    }

    //admin karega delete
    static deletecontact = async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const contact = await contactModel.findByIdAndDelete(req.params.id,req.body)
            if (!contact){
               return res
                .status(500)
                .send({ status: "unsuccess", message: "Contact Not Found" });
            }
            await contactModel.remove(contact)
            res
                .status(200)
                .send({ status: "success", message: "Contact Delete Success" });
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContactController