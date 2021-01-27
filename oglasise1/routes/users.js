const express = require('express');
const mysql = require('mysql');
const Joi = require('joi');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    //password: '',
    database: 'oglasise'
});

const semaO = Joi.object().keys( {
    password: Joi.string().required().trim().max(30).min(8),
    username: Joi.string().required().trim().max(30),
    first_name: Joi.string().required().trim().max(30),
    last_name: Joi.string().trim().required().max(30),
    email: Joi.string().required(),
});

const  rtr = express.Router();
rtr.use(express.json());

//citanje svih
rtr.get('/users',((req, res) => {
    pool.query('select * from auth_user',(err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
}));

//citanje jednog
rtr.get('/user/:id', ((req, res) => {
    let query = 'select * from auth_user where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}));

//dodavanje novog
rtr.post('/users', ((req, res) => {
    let { error } = semaO.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'insert into  auth_user (password, username, first_name,last_name,email) values (?,?,?,?,?)';
        let formated = mysql.format(query, [req.body.password, req.body.username, req.body.first_name, req.body.last_name, req.body.email]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from auth_user where id = ?';
                formated = mysql.format(query, [response.insertId])

                pool.query(formated, (err,rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                })
            }
        });
    }
}));

//izmena
rtr.put('/users/:id', (req, res) => {
    let {error} = semaO.validate(req.body)
    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update  auth_user set password=?, username=?, first_name=?, last_name=?, email=? where id=?';
        let formated = mysql.format(query, [req.body.password, req.body.username, req.body.first_name, req.body.last_name, req.body.email, req.params.id]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from auth_user where id = ?';
                formated = mysql.format(query, [req.params.id])

                pool.query(formated, (err,rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows[0]);
                })
            }
        });
    }
});

//brisanje
rtr.delete('/user/:id', ( req,res)=>{
    let query = 'select * from auth_user where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows)=>{
        if(err)
            res.status(500).messages(err.sqlMessage);
        else {
            query = 'delete from auth_user where id = ?';
            formated = mysql.format(query, [req.params.id])

            pool.query(formated, (err,resp) => {
                if(err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            })
        }
    });
})


module.exports = rtr;