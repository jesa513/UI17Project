var Crypto = require('crypto');
var conn = require('../database');
var transporter = require('../helpers/pengirimemail');

module.exports = {
    register: (req,res) => {
        var {nama, perusahaan, alamat, telepon, email, username, password} = req.body;
        var sql = `select username from customer where username='${username}'`
        conn.query(sql, (err,results) => {
            if(err){
                throw err
            }
            if(results.length > 0) {
                res.send ({status: 'error', message: 'Username has been taken!'})
            }
            else {
                var hashPassword = Crypto.createHmac ( "sha256", "abc123").update(password).digest("hex")
                var dataUser = {
                    nama,
                    perusahaan,
                    alamat,
                    telepon,
                    username,
                    email,
                    password : hashPassword,
                    status: 'Unverified'
                }
    
                sql = `INSERT into customer SET ?`
                conn.query(sql,dataUser, (err1,results1) =>{
                    if(err1) {
                        throw err1
                        // res.semd({status : 'error', message: 'System Error'});
                        // res.end();
                    }
                    var linkVerification = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`
                    var mailOptions = {
                        from : 'Go Office <jsetiadi512@gmail.com>',
                        to : email,
                        subject : 'Please verification your email',
                        html:`Please CLick link below for verification your email : <a href= "${linkVerification}">Verify Me</a>`
                    }
    
                    transporter.sendMail(mailOptions, (err2, res2) => {
                        if (err2) {
                            console.log(err2)
                            throw err2
                        }
                        else {
                            console.log('Success!')
                            res.send({ username, email, status:"Unverified"})
                        }
                    })
                })
            }
        })
    },
    
    // adminregister: (req,res) => {
    //     var {username, email, password} = req.body;
    //     var sql = `select username from admin where username='${username}'`
    //     conn.query(sql, (err,results) => {
    //         if(err){
    //             throw err
    //         }
    //         if(results.length > 0) {
    //             res.send ({status: 'error', message: 'Username has been taken!'})
    //         }
    //         else {
    //             var hashPassword = Crypto.createHmac ( "sha256", "abc123").update(password).digest("hex")
    //             var dataAdmin = {
    //                 username,
    //                 email,
    //                 password : hashPassword
    //             }
    //             sql = `INSERT into admin SET ?`
    //             conn.query(sql,dataAdmin, (err1,results1) =>{
    //                 if(err1) throw err1;
    //                 res.send(result);
                    
    //             })
    //         }
    //     })
    // },

    adminregister: (req,res) => {
       var dataAdmin = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
       }
    //    sql = `INSERT into admin SET ?`
    //    conn.query(sql,dataAdmin, (err1,results1) =>{
    //     if(err1) throw err1;
    //    }

    var sql = 'insert into admin set ? ;' 
    db.query(sql, dataAdmin, (err, result) => {
        
            if(err) throw err;
            console.log(result);
            res.send(result)
        // })

    })
    },

    verified:(req,res)=>{
        var {username, password} = req.body
        var sql = `SELECT * from customer 
                WHERE username='${username}'
                and password='${password}'`;
        conn.query(sql,(err,results) => {
            if(err) 
                throw err
                if(results.length > 0) {
                    sql = `UPDATE customer set status='Verified' WHERE id =${results[0].id}`;
                    conn.query(sql,(err1,results1) => {
                if(err1) throw err1;
                
                res.send({
                    username,
                    email: results[0].email,
                    role: results[0].role,
                    status: 'Verified',
                    
                })
                    })
                }
                else {
                    throw 'User not exist!'
                }
        })


    }
}

 