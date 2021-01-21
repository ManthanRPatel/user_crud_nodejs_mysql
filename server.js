const express = require('express')
const http = require('http')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('./ManthanUserCrud_node/router')
const mysql = require('mysql');


const PORT = process.env.PORT || 5000;

const app = express()


const server = http.createServer(app)


var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(urlencodedParser);
app.use(bodyParser.json());

server.listen(PORT ,()=>{
    console.log("server on :::" , PORT)
})

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'manthan_demo',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err){
        console.log('Connection Established Successfully');
    }
    else{
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    }
})


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin' , 'http://localhost:3000' );
    res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept' );
    next();
});


app.use(router)

module.exports = {
    mysqlConnection : mysqlConnection
}