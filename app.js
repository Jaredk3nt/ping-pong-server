require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routing
app.use('/', routes);

app.listen(3001, () => console.log('Example app listening on port 3001!'));