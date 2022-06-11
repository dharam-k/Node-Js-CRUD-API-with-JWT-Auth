const mongoose = require('mongoose');

const DBconnect = async (DATABASE_URL) =>{

    try {
        const DB_OPTION = {
            dbName: "AuthUsers"
        }

       await mongoose.connect(DATABASE_URL, DB_OPTION);
       console.log("DataBase - Connect Successfully");
        
    } catch (error) {
        console.log(error);
    }

}

module.exports= DBconnect;