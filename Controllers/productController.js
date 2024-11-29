const ProductDB = require("../Models/productModel");

const createProduct = async (req, res) => {
  const {name, description, price, stock, category, image, rating } =
    req.body;
  console.log(name, price);
   

  try {
    const Product = await ProductDB.create({
       name,
      description,
      price,
      stock,
      category,
      image,
      rating,
    });
    res.status(200).json({ success: true, data: Product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get ALL Products

const getAllProducts = async(req, res)=>{
    // const {title, price} = req.body;
    try {
        const AllProducts = await ProductDB.find();
        console.log(AllProducts, "data is")
        res.status(200).json({ success: true, data: AllProducts});

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
 
        
    }
    } 
    
// Get a single product by ID
const getProductById =async (req,res)=>{
    const id = req.params.id
   try {
    const product = await ProductDB.findById(req.params.id);
    console.log(product)
    if(!product){
        res.status(404).json({succes:false, message:'product not found'})
    }
    res.status(200).json({succes:true, data:product});
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
} 

// Update a product by ID
const updateProduct =async (req,res)=>{
    try {
        const updatedProduct = await ProductDB.findByIdAndUpdate(req.params.id, {...req.body},{
            new:true, runValidators:true})
            if(!updateProduct){
                return res.status(404).json({succes:false, message:'product not found'})
            }
            res.status(200).json({success:true, data:updateProduct})
    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });     
    }
    } 
// Delete a product by ID
const deleteProduct =async (req,res)=>{
    try {
        const Deletedproduct = await ProductDB.findByIdAndDelete(req.params.id);
        if(!Deletedproduct){
            res.status(404).json({succes:false, message:'product not found'})
        }
        res.status(200).json({succes:true, message:'Product deleted succussfully'});
       } catch (error) {
        res.status(500).json({ success: false, message: error.message });
       }

} 

module.exports = { getAllProducts, createProduct,getProductById,updateProduct,deleteProduct };
