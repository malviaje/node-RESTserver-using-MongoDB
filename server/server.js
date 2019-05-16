require('./config/config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');

//instalar npm
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));


//mongo conexion

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log('base de datos ONLINE');

    });

//

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', 3000);
})