import express from "express";
const router = express.Router();

import Message from "../models/message.js";

// create or add new messages
router.post('/', async(req , res) =>{
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

// get messages
router.get("/:conversationId" , async(req , res) =>{
    try{
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        res.status(200).json(messages);
    }catch(err){
        res.json(500).json(err);
    }
} )

export default router;