const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");

const requestsRouter = express.Router();

requestsRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type" });
        }

        const toUser = await user.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingConnectionRequest) {
            return res.status(409).json({ message: "Connection already exists" });
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.status(200).json({
            message: "Connection Request sent successfully",
            data,
        });

    } catch (err) {
        
        res.status(500).json({ error: "Server error: " + err.message });
    }
});


requestsRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Status not allowed"
            });
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        
        if (!connectionRequest) {
            return res.status(400).json({
                message: "Connection request not found"
            });
        }

        if (status === "accepted") {
            // Check if there's already a mutual connection request
            const mutualRequest = await ConnectionRequestModel.findOne({
                fromUserId: loggedInUser._id,
                toUserId: connectionRequest.fromUserId,
                status: "interested"
            });

            if (mutualRequest) {
                // Both users have shown interest, establish connection
                connectionRequest.status = "connected";
                mutualRequest.status = "connected";
                
                await Promise.all([
                    connectionRequest.save(),
                    mutualRequest.save()
                ]);

                res.json({
                    message: "Connection established successfully!",
                    status: "connected"
                });
            } else {
                // Create a mutual request from the current user
                const mutualConnectionRequest = new ConnectionRequestModel({
                    fromUserId: loggedInUser._id,
                    toUserId: connectionRequest.fromUserId,
                    status: "interested"
                });

                await mutualConnectionRequest.save();
                
                res.json({
                    message: "Connection request sent back. Waiting for mutual acceptance.",
                    status: "pending_mutual"
                });
            }
        } else {
            // Rejected - just update the status
            connectionRequest.status = status;
            await connectionRequest.save();
            
            res.json({
                message: "Connection request rejected",
                status: "rejected"
            });
        }

    } catch (err) {
        console.error('Error reviewing connection request:', err);
        res.status(500).json({ error: "Server error: " + err.message });
    }
});


module.exports = requestsRouter;
