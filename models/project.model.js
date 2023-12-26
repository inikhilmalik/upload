const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectName: String,
     vendorName: [],
    adminID:String
}, {
    versionKey: false
})

const ProjectModal = mongoose.model("project", projectSchema);

module.exports = { ProjectModal };