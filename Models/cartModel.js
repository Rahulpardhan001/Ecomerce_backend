const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    username:{
        type:String
    },
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
  },
  quantity:Number,
  order_placed: {
    type: String,
    default: "NO"
}
});

const Cart = new mongoose.model("Cart", cartSchema);
module.exports = Cart;


