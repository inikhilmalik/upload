const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    task: String,
    status: String,
    projectId: String,
    taskDate: String,
    focus:String,
    taskOwner:String
}, {
    versionKey: false
})

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };