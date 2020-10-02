const coupon = require('../model/coupon')
const mongoose = require('mongoose')
const { body, check } = require("express-validator/check");
const { validationResult } = require("express-validator/check");

//addnewcoupon API

const addnewcoupon = async function(req, res) {
    let data = await coupon.findOne({coupon_name : req.body.coupon_name})
    if(data){
        res.send({status : 200, text : "this coupon name already exists", data: result})
    } else{
    let coupondata = new coupon(req.body)
    let result =  await coupondata.save()
    if(result){
        res.send({status : 200, text : "your coupon add succesfully", data: result})
    }
}

}


const getallcoupon = async function(req,res){
    let result =  await coupon.find()
    if(result.length !==0){
        res.send({status : 200, data : result , text :"get all data succesfully!" })
    } else{
        res.send({status : 400, status : result , text :"currently no coupon code unable in database!!" })
    }
}

const deletecoupon = async function(req, res){
    let result = await coupon.remove({_id : req.body._id})
    if(result){
        res.send({status :200})
    }
} 


const getcoupondetails = async function(req, res){
    let result = await coupon.findOne({_id : req.body._id})
    if(result){
        res.send({status:200,data:result})
    }
}

module.exports = {
    addnewcoupon,
    getallcoupon,
    deletecoupon,
    getcoupondetails
  };