const jwt = require('express-jwt');


function verifyJWTToken ( req,res,next ){

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1]; 
        req.token = bearerToken;

        // jwt({
        //     secret: 'shhhhhhared-secret',
        //     algorithms: ['HS256'],
        // })
        next();
    }
    else {
        res.send({ status : false , message : 'Unauthenticated Access!!!' });
    }
}

module.exports = {
    verifyJWTToken : verifyJWTToken
}  