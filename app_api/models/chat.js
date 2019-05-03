var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    room: { type: String, required: true },
    nickname: { type: String, required: true },
    message: { type: String, required: true },
    updatedTime: { type: Date, default: Date.now },
});

mongoose.model('Chat', chatSchema);