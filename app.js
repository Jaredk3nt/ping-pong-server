require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routes');

app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => console.log('Example app listening on port 3000!'));