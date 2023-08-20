const {mongoose} = require('mongoose');

const ChatBoxSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    }],
    summary: {
        type: String,
        default: ""
    },
    images: {
        type: String,
        default: ""
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const ChatBox = mongoose.model('chatbox', ChatBoxSchema);

module.exports = ChatBox;