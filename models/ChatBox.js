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
        default: "https://res.cloudinary.com/dauxdhnsr/image/upload/v1692447079/grid/default_grid.jpg"
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

const ChatBox = mongoose.model('chatbox', ChatBoxSchema);

module.exports = ChatBox;