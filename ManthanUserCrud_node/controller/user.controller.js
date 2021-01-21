// const SQL = require('../../server');
const model = require('../models/user.model')



const getUserData = (req,res) =>{

    AsyncGetUser(req)
    .then(response=>{
        res.send(response)
    })
    .catch(err=>{
        console.log("err",err)
        res.send({status:false,message:'error occurred.'})
    })
}

async function AsyncGetUser(req,res){
    let data = await model.getUserAwait()
    return data;
}

const AddEditUser = (req,res) => {

    let msg = [];
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneformat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let email = req.body.user_email
    let phone_number = req.body.user_phone_number

    if( req.body.action_type === 'edit' ){

        if(!req.body.user_id){
            msg.push('user id is required')
        }
    }
    
    if(!req.body.user_email){
        msg.push('email id is required')
    }else if( !email.match(mailformat)  ){
        msg.push('email id is invalid')
    }

    if(!phone_number){
        msg.push('phone number is required')
    }else if( !phone_number.match(phoneformat)  ){
        msg.push('phone number is invalid')
    }


    if( msg.length > 0 ){
        res.send({status : false , message : msg.join(', ') })
    }
    else{
        AsyncAddEditUser(req.body)
        .then(response=>{
            res.send(response)
        })
        .catch(err=>{
            console.log("err",err)
            res.send({status:false,message:'error occurred.'})
        })
    }
}

async function AsyncAddEditUser( params){
    let data = await model.AddEditUserAwait(params)
    return data;
}


const DeleteUser = (req,res) => {

    if( !isNaN(req.body.user_id) ){
        AsyncDeleteUser(req.body)
        .then(response=>{
            res.send(response)
        })
        .catch(err=>{
            console.log("err",err)
            res.send({status:false,message:'error occurred.'})
        })
    }else{
        res.send({status:false,message:'user id is required.'})
    }
}

async function AsyncDeleteUser(params,res){
    let data = await model.DeleteUserAwait(params)
    return data;
}

module.exports = {
    getUserData : getUserData,
    AddEditUser : AddEditUser,
    DeleteUser : DeleteUser
}