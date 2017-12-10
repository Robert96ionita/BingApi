const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./src/routes/SecurityRoutes')(app);
require('./src/routes/UserRoutes')(app);

app.listen(PORT, function() {
   console.log("running");
});