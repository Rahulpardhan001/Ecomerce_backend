const userDb = require("../Models/authModel");
const bcrypt = require("bcrypt");

// Register logic
const RegisterController = async (req, res) => {
  try {
    const { username, email,phone, password } = req.body;
       console.log(username, "user" ,email,"backend")
    if (!username || !email || !password) {
      console.log("All Field is required");
      return;
    }
    const existUser = await userDb.findOne({ email: email });
    // console.log(existUser,"exist user")
    
    if (existUser) {
      return res.status(400).json({success:false, message: "User Already Exist " });
    }
    // hash password
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);

    const newUser = await userDb.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    const token = await newUser.generateToken();
    res.status(201).json({
      success:true,
      message: "User Registered Successfully",
      token,
      userId: newUser._id.toString(),
    });
  } catch (error) {   
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

// Login controller

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password,"login controller")
    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const userExist = await userDb.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success:false, message: "Invalid email or password" });
    }

    // Generate JWT token if login is successful
    const token = userExist.generateToken();

    // Return success response with token
    res.status(200).json({
      success:true,
      message: "Login successful",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { RegisterController, LoginController };
