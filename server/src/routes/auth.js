const express=require("express");
const bcrypt=require("bcrypt");
const {validateSignupData}=require("../utils/signup_validator");
const validator=require("validator");
const User = require("../models/user"); // adjust path as needed


const authRouter=express.Router();

//POST Signup
authRouter.post("/",async (req,res)=>{
    
    try{
        //validating of data
        validateSignupData(req);

        //password hash
        const {firstName,lastName,emailId,password}=req.body;
         const passwordHash = await bcrypt.hash(password, 10)
        //creating a new instance of the user model
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.send("User Added successfully")
    }
    catch(err){
        res.status(400).send("Error saving the user: "+err.message)
    }
    

});

//Login user
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error("Not a Valid Mail");
        }
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            console.log('Login successful for user:', user.emailId);
            console.log('Token generated:', token ? 'Yes' : 'No');
            
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            
            // Send user data without sensitive information
            const userResponse = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                age: user.age,
                gender: user.gender,
                photoUrl: user.photoUrl,
                about: user.about,
                skills: user.skills
            };
            
            res.json(userResponse);
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Cannot make a request: " + err.message);
    }
});

//logout user
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        expires: new Date(0)
    });
    res.send("Logout Successfully");
});




module.exports=authRouter;