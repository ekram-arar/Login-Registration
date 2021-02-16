const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 8000;
require('./config/mongoose.config');
require('dotenv').config();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
require('./routes/user.routes')(app);
app.listen(port, () => {
 console.log(`Welcome to the mern auth tutorial! Server is running on ${port}`)
});