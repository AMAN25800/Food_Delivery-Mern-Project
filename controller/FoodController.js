import FoodItems from '../model/user-schema.js';

 const addFood = async (req, res) => {
 // Destructure to simplify
 const { customer_name, customer_phone,customer_email,Amount_Paid, customer_address, cart ,current_date} = req.body;

 try {
   const newUser = new FoodItems({
     customer_name,
     customer_phone,
     customer_email,
     customer_address,
     Amount_Paid,
     current_date,
     cart,
     
   });

   await newUser.save();
   res.status(201).json({ message: 'User and cart data saved successfully!' });
 } catch (error) {
   console.error('Error saving user data:', error);
   res.status(500).json({ message: 'Failed to save user data', error });
 }
  }

const listFood=async(req,res)=>{
    try{
      const {email}=req.query;
        const foods=await FoodItems.find({customer_email:email});
        res.json({success:true,data:foods})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export  {addFood,listFood}