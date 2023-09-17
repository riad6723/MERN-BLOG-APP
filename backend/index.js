const express=require('express')
const app=express();
const dotenv=require("dotenv")
dotenv.config();
const mongoose=require('mongoose');
const cors = require('cors'); 
const {findRouters} = require('./Routers/findRouters')
const {userRouters} = require('./Routers/userRouters')

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.static('Public'))


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("connected to mongodb"))
  .catch((err)=>console.log(err));


app.use('/api/user',userRouters);
app.use('/api/find',findRouters);



  app.listen("5000",()=>{
    console.log("server running at 5000");
});