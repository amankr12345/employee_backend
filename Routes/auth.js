

const router=require('express').Router()
const CONTROLLER=require('../Controller/controller')
//const verify=require('./authVerify')

router.post('/add',CONTROLLER.addEmployee)
router.post('/login',CONTROLLER.login)
router.get('/get',CONTROLLER.getAllemployee)
router.put('/update/:id',CONTROLLER.updateEmp)
router.delete('/delete/:id',CONTROLLER.delete)

module.exports=router