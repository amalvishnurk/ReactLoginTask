const dotenv = require('dotenv')
dotenv.config()

const DB = process.env.DB
const PORT = process.env.PORT
const secretKey = process.env.JWT_SECRET

module.exports = { DB, PORT, secretKey }