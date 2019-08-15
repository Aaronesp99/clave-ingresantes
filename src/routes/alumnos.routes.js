const express = require('express')
const router = express.Router();
const mysql = require('../database');

router.get("/",(req,res)=>{
    try {
        mysql.query("SELECT * FROM alumnos WHERE perIngreso = '20192'",function(err,result,fields){
            if (err) throw err;
            res.json(result)
        })
    } catch (error) {
        res.json(error)
    }
})
module.exports = router