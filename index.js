const express=require("express");
const { connection } = require("./db");
const { dataRouter } = require("./routes/data.routes");
const app=express();
const cors=require("cors");
const { userRouter } = require("./routes/user.routes");
const { projectRouter } = require("./routes/project.routes");
const { todoRouter } = require("./routes/todos.routes");
require("dotenv").config()

const port=process.env.PORT||8080;
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'unloading=()');
    next();
  });

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userRouter)

app.use("/project",projectRouter)

app.use("/data",dataRouter);

app.use("/todo",todoRouter);

app.use("/uploads",express.static("uploads"))


app.listen(port,async()=>{
    try{
        await connection;
        console.log("connected to DB")
    }catch(err){
        console.log("Cannot connected to DB")
        console.log(err);
    }

    console.log(`server is running at port ${port}`)
})