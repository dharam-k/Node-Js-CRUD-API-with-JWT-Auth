const jsonwebtoken = require('jsonwebtoken');
const UserModel = require('../models/Users');

var CheckUserAuth = async ( req, resp, next) =>{
    let token;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1];
            const {userID} = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await UserModel.findById(userID).select("-password");
            next();
        } catch (error) {
            console.log(error);
            resp.status(401).send({"status": "failed", "message": "Unauthorized User"});
        }
    }

    if(!token){
        resp.status(401).send({"status": "failed", "message": "Unauthorized User, No Token"});
    }
}

module.exports = CheckUserAuth;