const express = require("express")
const app = express()
const bcrypt = require('bcrypt')
const User = require('./mongo')
const cors = require('cors')
const jwt = require("jsonwebtoken");
const { PORT, secretKey } = require('./variables')

app.use(cors({
    origin: ['http://localhost:8001']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})


app.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        const checkEmailExist = await User.findOne({ email })
        if (checkEmailExist) {
            return res.status(400).json({ message: "email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })


        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message })
    }
})


app.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '7d' });
        user.token = token
        await user.save()
        res.status(200).json({ token, userName: user.fullname, message: "Successfully Logined" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})
