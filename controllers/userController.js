const { customError } = require("../middleware/errorHandler");
const User = require("../model/userModel");

const jwt = require('jsonwebtoken');
const asyncErrorHandler = require("../middleware/asyncErrorHandler");

// User sign-in logic
let signIn = asyncErrorHandler(async (req, res, next) => {
    const { name, lastName, email, password, confirmPassword } = req.body;
   console.log(name,lastName,email,password,confirmPassword);
   
    // Check if all required fields are provided
    if (!name || !lastName || !email || !password || !confirmPassword) {
        return next(new customError("All fields are required", 400));
    }
    

    // Check if passwords match
    if (password !== confirmPassword) {
        return next(new customError("Passwords do not match", 400));
    }

    // Check if user already exists
    let isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return next(new customError("User already exists", 400));
    }

    // Hash the password
  

    // Create new user
    let user = await User.create({ name, lastName, email, password: hashPassword });

 
    // Respond with success message
    res.status(201).json({ 
        message: "User created successfully", 
        user: { name: user.name, lastName: user.lastName, email: user.email } 
    });
});

// User login logic
let logIn = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new customError("Email and password should not be empty", 400));
    }

    // Check if user exists
    let userExist = await User.findOne({ email });
    if (!userExist) {
        return next(new customError("Invalid email or password", 401));
    }

    // Compare passwords
    let isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
        return next(new customError("Invalid email or password", 401));
    }

    // Generate token
    let token = jwt.sign(
        { email: userExist.email, userId: userExist._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    // Respond with token
    res.status(200).json({ 
        message: "Login successful", 
        token:token,
        userName:{name:userExist.name}
     });
});

module.exports = { signIn, logIn };
