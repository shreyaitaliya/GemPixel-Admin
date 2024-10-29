const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const path = require('path');

// const port = 8000;

const db = require('./config/db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/index'));

const port = process.env.PORT || 8000;

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server Start Now On ${port}`);

})