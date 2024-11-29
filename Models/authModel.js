const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    role:{type:String, enum:["admin","customer"], default:"customer"},
    createdAt: { type: Date, default: Date.now }, 
  });




// Add method inside the schema definition
userSchema.methods.generateToken = function() {
    return jwt.sign(
        { userId: this._id.toString(), email: this.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30m" }
    );
};

module.exports =new mongoose.model("User",userSchema)