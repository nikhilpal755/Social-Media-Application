import express from "express";
const router = express.Router();

import Conversation from "../models/conversation.js"

// new conversations
router.post('/', async(req, res) =>{

    const newConversation = new Conversation({
        members: [req.body.senderId , req.body.receiverId]
    })

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
})



// get conversations of a user
router.get("/:userid" , async(req, res) =>{
    try{
        const conversations = await Conversation.find({
            members : {$in : [req.params.userid]}
        })
        res.status(200).json(conversations);

    }
    catch(err){
        res.status(500).json(err);
    }

})



// get conversations includes two userId
router.get("/find/:firstUserId/:secondUserId" , async(req, res) =>{
    try{
        const conversations = await Conversation.find({
            members : {$all : [req.params.firstUserId , req.params.secondUserId]}
        })
        res.status(200).json(conversations);

    }catch(err){
        res.status(500).json(err);
    }
})


//delete conversation
router.delete("/:id", async(req,res) =>{

    try{
        const deletedConversation = await Conversation.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedConversation)

    }catch(err){
        res.status(500).json(err);
    }

})

export default router;