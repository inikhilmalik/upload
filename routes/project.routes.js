const express=require("express");
const { ProjectModal } = require("../models/project.model");


const projectRouter=express.Router();

projectRouter.post("/create",async(req,res)=>{
    try{
        const data=new ProjectModal(req.body);
        await data.save();
        res.send("project is added")
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        const data=await ProjectModal.find({adminID:id});
        // console.log(data)
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.get("/single/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        const data=await ProjectModal.find({_id:id});
        console.log(data,"dddd")
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await ProjectModal.findByIdAndUpdate({_id:id},req.body);
        res.send("data is updated")
    }catch(err){
        res.send({"err":err.message})
    }
})

projectRouter.delete("/deleteProject/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await ProjectModal.findByIdAndDelete({_id:id});
        res.send("project is deleted")
    }catch(err){
        res.send({"err":err.message})
    }
  })

module.exports={projectRouter}
