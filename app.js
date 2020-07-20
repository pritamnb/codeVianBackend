const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv');

console.log(dotenv);

const app = express();

// Import internal app dependencies 
// const keys = require('./config/keys');

// console.log(keys);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Server is runnnig on port ${PORT}`);


