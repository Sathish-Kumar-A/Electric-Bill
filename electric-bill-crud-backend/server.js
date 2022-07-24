const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const Router = require("./routes");
dotenv.config();
const { MONGO_URI: url, PORT } = process.env;


app.use(cors());
app.use(express.json());
app.use("/",Router)

mongoose.connect(url).then(() => { 
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    })
}).catch(err => { 
    console.log("Error connecting to database: ", err);
}); 
