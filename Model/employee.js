const mongoose=require('mongoose')

const employeeSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    payroll:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('employeedetails',employeeSchema)