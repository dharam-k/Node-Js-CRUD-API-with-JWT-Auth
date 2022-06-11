const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { createTransport } = require('nodemailer');
const UserModel = require('../models/Users.js');
const transporter = require('../config/Email');

class UserController {
    static UserRegistration = async (req, resp) =>{
        const {name, email, password, confirm_password, tc} = req.body;
        const user = await UserModel.findOne({email:email})

        if(!user){
            if(name && email && password && confirm_password && tc){
                if(password===confirm_password){

                    //hashing password 
                    const salt = await bcrypt.genSalt(10);
                    const HashPass = await bcrypt.hash(password, salt);

                    //define and save data for user model in db
                    const userData = new UserModel({name,email,password : HashPass,tc});
                    await userData.save()

                    const saved_user =  await UserModel.findOne({email:email})

                    //jsonwebtoken
                    const token = jsonwebtoken.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY,{expiresIn: '1d'});

                    //after save in db 
                    resp.status(201).send({'status': "success", "message" : 'user register successfully',  "code" : 100, "token" : token});

                }else{
                    resp.send({'status': "failed", "message" : 'Password and Confirm Password do not match',  "code" : 101});
                }
            }else{
               resp.send({'status': "failed", "message" : 'All fields are required.',  "code" : 102});
            }
        }else{
            resp.send({'status': "failed", "message" : 'user already exists', "code" : 103});

        }
       
    }

    static UserLogin = async (req, resp) =>{
        const {email , password} = req.body;

        if(email && password){
           const user= await UserModel.findOne({email: email});
           if(user){
                const isMatchPass = await bcrypt.compare(password, user.password);
                if(isMatchPass){
                    const token = jsonwebtoken.sign({userID: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '2d'});
                    resp.send({'status': "success", "message" : 'Login Successfully.',"token" : token,  "code" : 104,});
                }else{
                    resp.send({'status': "failed", "message" : 'Email or Password does not match.',  "code" : 105});
                }
           }else{
              resp.send({'status': "failed", "message" : 'User does not exists.',  "code" : 106});
           }
        }else{
           resp.send({'status': "failed", "message" : 'All fields are required.',  "code" : 107});
        }

    }

    static ForgetPassword = async (req, resp)=>{
       const {email} = req.body;
       if(email){
           const UserEmail = await UserModel.findOne({email: email});
           if(UserEmail){
               const SecretKey = UserEmail._id+process.env.JWT_SECRET_KEY;
               const token = jsonwebtoken.sign({UserID :  UserEmail._id}, SecretKey, {expiresIn:'15m'});
               const link = `http://127.0.0.1:3000/api/user/reset-password/${UserEmail._id}/${token}`;
               console.log(link);

               //email 
               let info = await transporter.sendMail({
                   form : process.env.EMAIL_FROM,
                   to : UserEmail.email,
                   subject : "password reset link",
                   html : `<a href="${link}">Click Here</a> for Password Reset.`
               })

               if(info){

                 resp.send({'status': "success", "message" : 'Email has been sent for password reset. Please Check Your email.',  "code" : 111});
               }else{

                resp.send({'status': "failed", "message" : 'Something went wrong.',  "code" : 110});
               }
           }else{
              resp.send({'status': "failed", "message" : 'User does not exists',  "code" : 109});
           }
       }else{
          resp.send({'status': "failed", "message" : 'All Fields are required.',  "code" : 108});
       }
    }

    static ForgetPasswordReset = async (req, resp) =>{
        const {password, confirm_password} = req.body;
        const {id, token} = req.params;
        const user = await UserModel.findById(id);
        const NewSecretKey = user._id+process.env.JWT_SECRET_KEY;
        try {
            jsonwebtoken.verify(token, NewSecretKey);
            if(password && confirm_password){
                if(password===confirm_password){
                    const salt = await bcrypt.genSalt(10);
                    const NewHashPassword = await bcrypt.hash(password, salt);
                    await UserModel.findByIdAndUpdate(user._id, {$set : {
                        password : NewHashPassword
                    }})
                   resp.send({'status': "success", "message" : 'Password has been changed.',  "code" : 114});
                }else{
                   resp.send({'status': "failed", "message" : 'Password and Confirm Password do not match.',  "code" : 113});
                }
            
            }else{
              resp.send({'status': "failed", "message" : 'All Fields are required.',  "code" : 112});
            }            
        } catch (error) {
            
        }
    }

    static UserLogged = async (req, resp) =>{
         resp.send({"user" : req.user});
    }
}



module.exports= UserController;