const Employee=require('../Model/employee')
const bcrypt = require('bcryptjs')
//const jwt=require('jsonwebtoken')
const joi=require('@hapi/joi')


exports.addEmployee=async (req,res)=>{

const emailExist=await Employee.findOne({email:req.body.email})

    if(emailExist){
        res.status(400).send("emailAlready exists")
        return;
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

    const user= new Employee({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        payroll:req.body.payroll,
        department:req.body.department
    })

    try{
        //valodation of userinputs
        const registrationSchema=joi.object({
            name:joi.string().min(3).max(255).required(),
            email:joi.string().min(3).max(255).required().email(),
            password:joi.string().min(5).max(12).required(),
            payroll:joi.number().required(),
            department:joi.string().required()
        })
        const {err}=await registrationSchema.validateAsync(req.body)

        if(err){
            res.status(400).send(err.details[0].message)
            return;
        }
        else{
            const saveUser=await user.save()
            res.status(200).send("employee Details  created successfully")
        }

    }
    catch(err){
        res.status(500).send(err)

    }

}

exports.login=async (req,res)=>{
    const user=await Employee.findOne({email:req.body.email})
    if(!user)return res.status(400).send("Incoorect email Id")

    // Checking if user password matches or not
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)

    const validatePassword=await bcrypt.compare(req.body.password,user.password)
    if(!validatePassword) return res.status(400).send("incorrect password")

    try{
        const loginSchema=joi.object({
            email:joi.string().min(3).required().email(),
            password:joi.string().min(5).required()
        })     
    const {err}=await loginSchema.validateAsync(req.body)
    if(err) return res.status(400).send(err.details[0].message)
    else{
        //const token=jwt.sign({id:user._id},process.env.TOKEN_SECRET)
        //res.send(token)
        res.send("logged in")
    }

    }catch(err){
        res.status(500).send(err)

    }
}

exports.getAllemployee=async (req,res)=>{
    const allUser=await Employee.find()
    try{
        res.status(200).send(allUser)

    }catch(err){
        res.status(500).send(err)
    }
}


exports.updateEmp=async (req,res)=>{
    try{
        const updateEmployee=await Employee.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            payroll:req.body.payroll,
            department:req.body.department,
        },{new:true,
            runValidators:true
        })
        res.status(200).send(updateEmployee)
    }catch(err)
    {
        res.status(500).send(err)


    }
    
}

exports.delete=async(req,res)=>{
   try{
     await Employee.findByIdAndDelete(req.params.id)
        res.status(200).send("deleted")
    }catch(err){
        res.status(500).send(err)
    }
}
