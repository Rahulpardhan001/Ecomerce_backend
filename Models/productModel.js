 const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
        id:{
            type:"string",
            required:true,
            unique:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String, 
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
          },
        category:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
        }
},{timestamps:true});

const ProductDB = mongoose.model('Product', productSchema);

module.exports = ProductDB