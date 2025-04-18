require('dotenv').config()
const process = require('process');

const express = require('express')
const app = express()
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL)
const port = 3000

app.get('/', (req, res)=>{
    try{
        sequelize.authenticate().then(()=>{
            console.log('Connection Succesful')
        })
    }catch(error){
        console.log('Something went wrong')
    }
})

app.listen(port, ()=>{
    console.log("Server Started!")
})