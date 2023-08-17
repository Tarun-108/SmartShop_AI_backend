const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    sender: {
        // 0 for User\Human and 1 for AI
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;