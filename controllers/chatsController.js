const User = require("../models/user");
const ChatBox = require("../models/ChatBox");
const Chat = require("../models/Chat");
const {mongoose} = require('mongoose');
require("dotenv").config();

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {msg:''};

    errors.msg = err.message;

    return errors;
}


module.exports.get = async (req, res) => {

}

module.exports.getAll = async (req, res) => {
    const email = req.email;
    try{
        const user = User.findOne({email});
        if(user){
            const chatFeed = user.chatFeed;
            res.status(200).send({chatFeed: chatFeed});
        }else{
            res.status(404).send({msg: 'user not found!'});
        }
    }catch (err){
        res.status(400).send({msg: err.message});
    }
}

const createBox = async ({email, title}) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            console.log("user hi NULL Hai");
        }
        const newChatBox = new ChatBox({title});
        await newChatBox.save();
        user.chatFeed.push(newChatBox._id);
        await user.save();
        return newChatBox._id;
    }catch (err) {
        console.log(err.message);
    }
}

module.exports.updateTitle = async (req, res) => {
    const email = req.email;
    let {title, chatBoxId} = req.body;
    if(!chatBoxId){
        chatBoxId = await createBox({email, title});
        res.status(201);
    }else{
        res.status(200);
    }
    const reqChatBox = await ChatBox.findOne({_id: chatBoxId});
    console.log(reqChatBox);
    reqChatBox.title = title;
    await reqChatBox.save();
    res.send(reqChatBox);
}

module.exports.addChat = async (req, res) => {
    const email = req.email;
    let {msg, sender, chatBoxId, title} = req.body;
    if(!chatBoxId){
        chatBoxId = await createBox({email, title});
        res.status(201);
    }else{
        res.status(200);
    }
    const newChat = new Chat({message: msg, sender});
    const reqChatBox = await ChatBox.findOne({_id: chatBoxId});
    reqChatBox.chats.push(newChat);
    await reqChatBox.save();
    res.send(reqChatBox);
};

module.exports.addResponse = async (req, res) => {
    const email = req.email;
    let {resp, sender, chatBoxId, images, updateFeatureObj} = req.body;
    const newChat = new Chat({message: resp, sender});
    const reqChatBox = await ChatBox.findOne({_id: chatBoxId});
    reqChatBox.chats.push(newChat);
    reqChatBox.features = updateFeatureObj;
    reqChatBox.images = images;
    await reqChatBox.save();
    res.status(200).send(reqChatBox);
};

