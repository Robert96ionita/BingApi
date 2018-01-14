const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Key, Access-Control-Allow-Origin");
    next();
});

require('./src/routes/SecurityRoutes')(app);
require('./src/routes/UserRoutes')(app);

app.listen(PORT, function() {
   console.log("running");
});