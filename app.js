const express = require('express');
const dotenv = require("dotenv") ;
dotenv.config();
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes.js');
const DBconnect = require('./config/DBCon.js')
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// //Cors Policy for front-end 
app.use(cors())

// DBconnect(DATABASE_URL);

const DB_OPTION = {
    dbName: "AuthUsers"
}
mongoose.connect(DATABASE_URL, DB_OPTION);

app.use(express.json());

app.use('/api/user', UserRoutes)

app.listen(port, () => {
    console.log(`Server working on port : ${port} and Host on http://localhost:${port}`)
})