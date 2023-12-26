const express=require("express");
const { TodoModel } = require("../models/todos.model");


const todoRouter=express.Router();

todoRouter.post("/create",async(req,res)=>{
    try{
        const data=new TodoModel(req.body);
        await data.save();
        res.send("Todo is added")
    }catch(err){
        res.send({"err":err.message})
    }
})

todoRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        const data=await TodoModel.find({projectId:id});
        // console.log(data)
        res.send(data)
    }catch(err){
        res.send({"err":err.message})
    }
})

// todoRouter.get("/single/:id",async(req,res)=>{
//     const {id}=req.params
//     console.log(id)
//     try{
//         const data=await ProjectModal.find({_id:id});
//         console.log(data,"dddd")
//         res.send(data)
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

todoRouter.patch("/updateTodo/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await TodoModel.findByIdAndUpdate({_id:id},req.body);
        res.send("todo is updated")
    }catch(err){
        res.send({"err":err.message})
    }
})

todoRouter.delete("/deleteTodo/:id",async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        await TodoModel.findByIdAndDelete({_id:id});
        res.send("todo is deleted")
    }catch(err){
        res.send({"err":err.message})
    }
  })

module.exports={todoRouter}
