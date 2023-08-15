const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
<<<<<<< HEAD
const cors = require("cors");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const authRoutes = require('./routes/auth')
const userProfileRoutes = require('./routes/userProfile')
const cookieParser = require('cookie-parser')
const chalk = require("chalk");
=======
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors")


const authRoutes = require('./routes/auth')
const userProfileRoutes = require('./routes/userProfile')
const cookieParser = require('cookie-parser')
>>>>>>> 310fcf92aa97dc667c7ba7ea6acb0bbe18106477

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
<<<<<<< HEAD
app.use(cors());
=======
>>>>>>> 310fcf92aa97dc667c7ba7ea6acb0bbe18106477

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
<<<<<<< HEAD
app.use('*', (req, res, next) => {
    console.log(chalk.red(req.method), chalk.blue(req.baseUrl));
    next();
})


=======
>>>>>>> 310fcf92aa97dc667c7ba7ea6acb0bbe18106477
app.use(authRoutes)
app.use(userProfileRoutes)


<<<<<<< HEAD

=======
>>>>>>> 310fcf92aa97dc667c7ba7ea6acb0bbe18106477
//cookies
// app.get('/set-cookies', (req, res) => {
//     // res.setHeader('Set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, {maxAge: 1000*60*60*24, httpOnly: true});
//     res.send('You got a cookie!');
// })
//
// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     console.log(cookies.newUser);
//     res.json(cookies);
// })

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.AUTH_DB_URI, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
//
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("auth").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
