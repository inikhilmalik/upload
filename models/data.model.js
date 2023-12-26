const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    row: String,
    category: String,
    priority: String,
    activity: String,
    planned: Number,
    startDate: String,
    endDate: String,
    dependOn: String,
    status: String,
    taskOwner: String,
    vendor: String,
    type: String,
    actualDays:Number,
    revisedDays:Number,
    zone:String,
    location:String,
    images: [{ pic: String, action: Boolean }],
    notes:String,
    projectID:String,
    priorityOnDone:String
}, {
    versionKey: false
})

const dataModal = mongoose.model("data", dataSchema);

module.exports = { dataModal };