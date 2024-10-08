
import locationData from "../model/Location-schema.js";

const userLocation=async(req,res)=>{
     // Destructure to simplify
     const {email,address} = req.body;

    // Ensure the user doesn't already exist before saving
    try {
        const userdata = await locationData.findOne({ address });
    
        if (userdata) {
          return res.status(404).json({ success: false, message: "Address Already Exist" });
        }
    
        
            const userlocation=new locationData({
                email,
                address,
            })
            const locationdata=await userlocation.save();
            res.status(201).json({
                success: true,
                messsage:'saved successfully'
              });
          
        }
          catch(error){
            res.status(500).json({ success: false, message: error.message });

          }

    
  
    



}
const getUserByEmail = async (req, res) => {
  const { mail } = req.body;

  try {
    // Use find instead of findOne to get all matching users
    const users = await locationData.find({ email: mail });

    if (users.length > 0) {
      res.status(200).json(users); // Send all matching users
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export {userLocation,getUserByEmail}