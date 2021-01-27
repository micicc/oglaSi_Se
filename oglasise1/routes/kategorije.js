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
    naziv: Joi.string().required().trim().max(40),
});

const  rtr = express.Router();
rtr.use(express.json());

//citanje svih
rtr.get('/kategorije',((req, res) => {
    pool.query('select * from oglasi_kategorija',(err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
}));

//citanje jednog
rtr.get('/kategorija/:id', ((req, res) => {
    let query = 'select * from oglasi_kategorija where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}));

//dodavanje novog
rtr.post('/kategorije', ((req, res) => {
    let { error } = semaO.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'insert into  oglasi_kategorija (naziv) values (?)';
        let formated = mysql.format(query, [req.body.naziv]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_kategorija where id = ?';
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
rtr.put('/kategorije/:id', (req, res) => {
    let {error} = semaO.validate(req.body)
    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update  oglasi_kategorija set naziv=? where id=?';
        let formated = mysql.format(query, [req.body.naziv, req.params.id]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_kategorija where id = ?';
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
rtr.delete('/kategorija/:id', ( req,res)=>{
    let query = 'select * from oglasi_kategorija where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows)=>{
        if(err)
            res.status(500).messages(err.sqlMessage);
        else {
            query = 'delete from oglasi_kategorija where id = ?';
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