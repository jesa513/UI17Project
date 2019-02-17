var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
// var mysql = require('mysql');
var port = process.env.PORT || 1997;
var Crypto = require('crypto');

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send('<h1>Ini Home Page')
})

// app.get('/passwordencrypt', (req,res) => {
//     var hashPassword = Crypto.createHmac('sha256', 'abc123').update(req.query.password).digest('hex');
//     console.log(hashPassword)
//     res.send(`Password anda ${req.query.password} di encrypt menjadi ${hashPassword}`)
// })

   var { authRouter } = require('./routers')
   app.use('/auth', authRouter)

    app.listen(port, () => console.log('API jalan di port ' +port));