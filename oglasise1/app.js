const express = require('express');
const og = require('./routes/oglasi');  // Nas ruter (REST API)
const kt = require('./routes/kategorije');  // Nas ruter (REST API)
const kom = require('./routes/komentari');  // Nas ruter (REST API)
const usr = require('./routes/users');  // Nas ruter (REST API)
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/apiO',og);
app.use('/apiK',kt);
app.use('/apiKom',kom);
app.use('/apiUsr',usr);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(80);