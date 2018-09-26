require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

app.use(cors())
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3001, () => console.log('Example app listening on port 3001!'));