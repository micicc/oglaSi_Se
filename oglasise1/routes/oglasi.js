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
    naslov: Joi.string().required().trim().max(30),
    opis: Joi.string().required().trim().max(120),
    mesto: Joi.string().trim().required().max(30),
    kategorija_id: Joi.number().required(),
    korisnik_id: Joi.number().required(),
});

const  rtr = express.Router();
rtr.use(express.json());

//citanje svih
rtr.get('/oglasi',((req, res) => {
    pool.query('select * from oglasi_oglas',(err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
}));

//citanje jednog
rtr.get('/oglas/:id', ((req, res) => {
    let query = 'select * from oglasi_oglas where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}));

//dodavanje novog
rtr.post('/oglasi', ((req, res) => {
    let { error } = semaO.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'insert into  oglasi_oglas (naslov, opis, mesto,kategorija_id, korisnik_id, datumDodavanja) values (?,?,?,?,?,?)';
        var today = new Date();
        let formated = mysql.format(query, [req.body.naslov, req.body.opis, req.body.mesto, req.body.kategorija_id, req.body.korisnik_id, today]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_oglas where id = ?';
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
rtr.put('/oglas/:id', (req, res) => {
    let {error} = semaO.validate(req.body)
    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update  oglasi_oglas set naslov=?, opis=?, mesto=?, kategorija_id=?, korisnik_id=?, datumIzmene=? where id=?';
        var today = new Date();
        let formated = mysql.format(query, [req.body.naslov, req.body.opis, req.body.mesto, req.body.kategorija_id, req.body.korisnik_id,today, req.params.id]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_oglas where id = ?';
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
rtr.delete('/oglas/:id', ( req,res)=>{
    let query = 'select * from oglasi_oglas where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows)=>{
        if(err)
            res.status(500).messages(err.sqlMessage);
        else {
            query = 'delete from oglasi_oglas where id = ?';
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