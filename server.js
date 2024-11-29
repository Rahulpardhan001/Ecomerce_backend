const express = require('express')
const app = express()
const port = 3000
const db = require('./Config/Db');
require("dotenv").config();
const cors = require('cors');
// Routes
const authRoutes = require('./Routes/authRoute')
const productRoute = require('./Routes/productRoute')
const cartRoutes = require('./Routes/cartRoute');


//middleware
const corsOptions ={
  origin:"http://localhost:5173",
  menthods:"GET, POST, PUT, DELETE, PATCH, HEAD",
  Credentials:true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


db.init().then(() => {
    console.log("Db connected");
    app.listen(port, () => {
      console.log("Hearing PORT:", port);
    });
  }).catch (error=> {
  console.log("SERVER run error:", error);
});