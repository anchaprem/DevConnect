const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");

const userRouter=express.Router();


userRouter.get("/requests/received",userAuth,async(req,res)=>{
    try{
        
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName","lastName","emailId","age","gender","photoUrl","about","skills"]);
        
        res.json({
            message: "fetched successfully",
            data: connectionRequest,
        });

    }
    catch(err){
        console.error('Error fetching received requests:', err);
        res.status(400).send("Error: "+err.message);
    }
})

// New endpoint for pending mutual connections
userRouter.get("/requests/pending",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        
        // Find requests where current user accepted but other user hasn't responded yet
        const pendingConnections=await ConnectionRequestModel.find({
            fromUserId:loggedInUser._id,
            status: "interested"
        }).populate("toUserId",["firstName","lastName","emailId","age","gender","photoUrl","about","skills"]);
        
        res.json({
            message: "Pending mutual connections fetched successfully",
            data: pendingConnections,
        });

    }
    catch(err){
        console.error('Error fetching pending connections:', err);
        res.status(400).send("Error: "+err.message);
    }
})

userRouter.get("/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        // Only show connections where both users have agreed (status: "connected")
        const connectionRequests=await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:"connected"},
                {fromUserId:loggedInUser._id,status:"connected"}
            ],
        }).populate("fromUserId","firstName lastName emailId age gender photoUrl about skills").populate("toUserId","firstName lastName emailId age gender photoUrl about skills");
        
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        
        res.json({
            message:"Connections fetched successfully",
            data
        });

    }
    catch(err){
        console.error('Error fetching connections:', err);
        res.status(400).send("Error: "+err.message);
    }
})


//FEED API 
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;

        const connectionRequest=await ConnectionRequestModel.find({
            $or:
            [
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id},
            ]
        })
        const hideFromFeed=new Set();
        connectionRequest.forEach(element => {
            hideFromFeed.add(element.fromUserId.toString());
            hideFromFeed.add(element.toUserId.toString());
        });

        const users=await user.find({
            $and:[
                    {_id:{$nin:Array.from(hideFromFeed)}},
                    {_id:{$ne:loggedInUser._id}},
            ]
           
        }).select("firstName lastName gender age photoUrl about skills").skip(skip).limit(limit);
        res.send(users);
    }
    catch(err){
        res.status(400).send("Error while feed"+err.message)
    }
    
});


module.exports=userRouter;