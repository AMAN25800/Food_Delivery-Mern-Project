import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  customer_email:{type:String,required:true},
  customer_name: { type: String, required: true },
  customer_phone: { type: String, required: true },
  customer_address: { type:String, required: true },
  Amount_Paid:{type:Number,required:true},
  current_date:{type:String,required:true},
  cart:[{
    name: { type: String, required: true },
    item_img: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }] // Array of items in the cart
});

const FoodItems = mongoose.model('Food', userSchema);

export default FoodItems;