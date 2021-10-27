const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Components
const connectDb = require('./db/auth');
connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(require('./routes/auth'));

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

app.listen(port, () => console.log(
    `server listening on the port: ${port}`)
);