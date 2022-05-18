const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const authRoute=require('./Routes/auth')
const cors=require('cors')

const Port=5050
const app=express()
app.get('/',()=>{console.log("esever rounningbon backend")})
app.listen(Port,()=>{
    console.log(`server running on ${Port}`)
})
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{UseNewUrlParser:true},()=>{
    console.log("DB connected")
})

app.use(express.json(),cors())
app.use('/app',authRoute)