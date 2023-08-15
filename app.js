const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')


const authRoutes = require('./routes/auth')
const userProfileRoutes = require('./routes/userProfile')
const chatRoutes = require('./routes/chat')

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Server Live
const port = process.env.LOCALPORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//DB Connect
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


//routes
app.use(authRoutes)
app.use(userProfileRoutes)
app.use(chatRoutes)
