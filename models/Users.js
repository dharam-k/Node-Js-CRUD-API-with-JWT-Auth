const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
  name:  {type: String, required:true, trim:true},
  email: {type: String, required:true, trim:true},
  password:  {type: String, required:true, trim:true},
  tc:{type: Boolean, required:true},
},
{ timestamps: true}
);

const UsersModel = mongoose.model('users', Users);

module.exports=UsersModel;