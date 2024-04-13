const mongoose = require("mongoose")
const { DB } = require('./variables')
mongoose.connect(DB)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((error) => {
        console.log("Not connected to Database!");
        console.log(error);
    })


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }

})

const User = mongoose.model("User", userSchema)

module.exports = User

