const express=require("express");
const bcrypt = require('bcrypt');
const validator=require("validator");
const {userAuth}=require("../middlewares/auth");
const {validateEditProfile} = require("../utils/signup_validator");

const user=require("../models/user")

const profileRouter=express.Router();

//get VIEW profile
profileRouter.get("/view",userAuth, async (req, res) => {
    try {
        const user=req.user;
        res.send(user);
    } catch (err) {
        res.status(401).send("Cannot make a request: " + err.message);
    }
});

//patch EDIT profile
profileRouter.patch("/edit",userAuth, async(req,res)=>{
    try{
        if(!validateEditProfile(req)){
            throw new Error("Invalid Edit Request")
        }
        const user=req.user;
        Object.keys(req.body).forEach((key)=>{
            user[key]=req.body[key]
        });
       await user.save();
       res.send("Updated Sucessfully")
    }
    catch(err){
         res.status(400).send("Cannot make a request: " + err.message);
    }
})

//password forgot
profileRouter.post("/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Validate strength
        if (
            !validator.isStrongPassword(oldPassword) ||
            !validator.isStrongPassword(newPassword)
        ) {
            throw new Error("Enter Strong Passwords");
        }

        const user = req.user; //from middleware

        const isPasswordValid = await user.validatePassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error("Enter a Correct Password");
        }

        await user.encryptPassword(newPassword); 
        await user.save(); 

        res.send("Password Successfully Changed");
    } catch (err) {
        res.status(400).send("Cannot make a request: " + err.message);
    }
});



module.exports=profileRouter
