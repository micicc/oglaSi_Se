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
    ocena: Joi.number().required().min(1).max(5),
    tekst: Joi.string().required().trim().max(120),
    korisnik_id: Joi.number().required(),
    oglas_id: Joi.number().required(),

});

const  rtr = express.Router();
rtr.use(express.json());

//citanje svih
rtr.get('/komentari',((req, res) => {
    pool.query('select * from oglasi_komentar',(err, rows)=>{
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
}));

//citanje jednog
rtr.get('/komentar/:id', ((req, res) => {
    let query = 'select * from oglasi_komentar where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
}));

//dodavanje novog
rtr.post('/komentari', ((req, res) => {
    let { error } = semaO.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'insert into  oglasi_komentar (ocena, tekst, korisnik_id, oglas_id, datumDodavanja) values (?,?,?,?,?)';
        var today = new Date();
        let formated = mysql.format(query, [req.body.ocena, req.body.tekst,  req.body.korisnik_id, req.body.oglas_id, today]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_komentar where id = ?';
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
rtr.put('/komentar/:id', (req, res) => {
    let {error} = semaO.validate(req.body)
    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'update  oglasi_komentar set ocena=?, tekst=?, korisnik_id=?, oglas_id=?, datumIzmene=?, where id=?';
        var today = new Date();
        let formated = mysql.format(query, [req.body.ocena, req.body.tekst, req.body.korisnik_id, req.body.oglas_id,today, req.params.id]);

        pool.query(formated, (err,response)=>{
            if(err)
                res.status(500).messages(err.sqlMessage);
            else {
                query = 'select * from oglasi_komentar where id = ?';
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
rtr.delete('/komentar/:id', ( req,res)=>{
    let query = 'select * from oglasi_komentar where id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err,rows)=>{
        if(err)
            res.status(500).messages(err.sqlMessage);
        else {
            query = 'delete from oglasi_komentar where id = ?';
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