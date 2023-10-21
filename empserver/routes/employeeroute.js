
const express=require("express")
const getemployees =require("../queries.js")

const route=express.Router()

//register or Post

route.get('/register',getemployees)



module.exports={
    route
}