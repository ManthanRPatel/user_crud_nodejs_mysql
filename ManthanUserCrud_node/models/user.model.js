// const mysqlConnection = require('../../server')
const mysql = require('mysql');


const SQL = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'manthan_demo_2',
    multipleStatements: true
});

function getUserAwait(){
    return new Promise((resolve,reject)=>{
    let SQLQuery = 'SELECT * FROM `tbl_user`';
        SQL.query( SQLQuery , (err, rows, fields) => { 
            if(err){
                reject({ status:false , message:'No Data'})
            }
            else{
                resolve({ status:true , data : rows });
            }
        })
    })
}

function AddEditUserAwait(params){
    return new Promise((resolve,reject)=>{
        let SQLQuery;

        console.log("AddEditUserAwait ", params )
        if( params.action_type === 'edit' ){
            SQLQuery = "UPDATE tbl_user SET user_name = ? , user_email = ? , user_phone_number = ? WHERE `user_id` = "+ params.user_id;
        }
        else{
            SQLQuery = "INSERT INTO tbl_user (user_name , user_email , user_phone_number) values (?,?,?)";;
        }

        SQL.query( SQLQuery , [params.user_name ,params.user_email, params.user_phone_number ] , (err, rows, fields) => { 
            if(err){
                console.log("err ", err)
                reject({ status:false , message:'Error Occured'})
            }
            else{
                if( params.action_type === 'edit' ){
                    resolve({ status:true , message : 'User updated successfully!!!' });
                }
                else{
                    resolve({ status:true , message : 'User inserted successfully!!!' });
                }
            }
        })
    })
}

function DeleteUserAwait(params){
    return new Promise((resolve,reject)=>{

        let SQLQuery = 'DELETE FROM tbl_user WHERE user_id = ?';

        SQL.query( SQLQuery , [params.user_id] , (err, rows, fields) => { 
            if(err){
                console.log("err" ,err)
                reject({ status:false , message:'Error Occured'})
            }
            else{
                resolve({ status:true , message : 'User deleted successfully !!!' });
            }
        })

    })
}


module.exports = {
    getUserAwait: getUserAwait,
    AddEditUserAwait : AddEditUserAwait,
    DeleteUserAwait : DeleteUserAwait,
}