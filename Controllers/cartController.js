const Cart = require("../Models/cartModel");
const ProductDB = require("../Models/productModel");

async function addToCart(req, res) {
  try {
    const { cartItem } = req.body; // Destructure cartItem from the request body
    if (!cartItem || !cartItem.product || !cartItem.quantity) {
      return res.status(400).json({ message: "Invalid cart item data" });
    }

    // Attach the user id from the session or token
    const userId = req.user._id;
    console.log(userId, "userId created");
    cartItem.user = userId;
    cartItem.username = req.user.username;

    // Check if the product already exists in the cart and hasn't been ordered
    const existingItem = await Cart.findOne({
      product: cartItem.product,
      user: userId,
      order_placed: "NO",
    });

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += 1; // Add to the existing quantity
      await existingItem.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Cart updated",
          cartItem: existingItem,
        });
    } else {
      // If the product does not exist, create a new cart item
      const newCartItem = new Cart(cartItem);
      console.log(newCartItem, "newuser");
      await newCartItem.save();
      return res
        .status(201)
        .json({
          success: true,
          message: "Item added to cart",
          cartItem: newCartItem,
        });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add item to cart",
        error: error.message,
      });
  }
}

// Get all items in the user's cart
const getCart = async (req, res) => {
  try {
    // const { userId } = req.params;
    const user = req.user._id;
    console.log(user, "userid is ");

    // Fetch all cart items for the user
    const cartItems = await Cart.find({ user }).populate("product");
   

    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve cart items",
        error: error.message,
      });
  }
};

const removeCart = async (req, res) => {
  try {
    const { user, product } = req.body;

    await Cart.findOneAndDelete({ user, product });
    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to remove item from cart",
        error: error.message,
      });
  }
};



async function updateCart(req, res) {
  const id = req.body._id; // Cart item ID
  const quantity = req.body.quantity; // New quantity value
console.log(id, quantity,"update cart");
  if (!id || !quantity || quantity < 1) {
    return res.status(400).send("Invalid data");
  }

  try {
    // Find and update the cart item by its ID
    const updatedCart = await Cart.findByIdAndUpdate(
      id, // Document ID
      { $set: { quantity: quantity } }, // Update operation
      { new: true } // Return the updated document
    );

    if (!updatedCart) {
      return res.status(404).send("Cart item not found");
    }

    res.status(200).send("Cart quantity updated successfully");
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).send("Internal Server Error");
  }
}






module.exports = { addToCart, getCart, removeCart,updateCart };
