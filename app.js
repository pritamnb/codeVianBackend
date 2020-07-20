const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv');


const app = express();

dotenv.config();

// Import internal app dependencies 
const keys = require('./config/keys');


// DB CONNECTION

// Handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype");
    next();
});


// Setup static assests directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Add body-parser 
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => { res.send("App Working.....") });

app.listen(keys.PORT);

console.log(`Your port is ${keys.PORT}`);


