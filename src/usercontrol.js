const userService = require('./userservices');
const UserData = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUserControllerFn = async (req, res) => {
    try {
        var status = await userService.createUserDBService(req.body);
        if (status) {
            res.send({ "status": true, "message": "User created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating user" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signUp = async (req, res) => {
    try {
        console.log(req.body); // Log the request body
        const { username, email, password } = req.body;

        // Check if user already exists
        let existingUser = await UserData.findOne({ email }); // Use UserData model
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = new UserData({ username, email, password: hashedPassword });

        // Save the new user to the database
        const result = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        // Find user by email
        const user = await UserData.findOne({ email }); // Use UserData model

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Is Match:", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate and set JWT token
        const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: 30});

        // Send token along with the response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = { createUserControllerFn, signUp, login };
