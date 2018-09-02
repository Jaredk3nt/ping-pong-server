const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const Service = require('./service')(docClient);

router.get('/players', Service.getPlayers);
router.post('/players', Service.createPlayer);
router.get('/players/:id', Service.getPlayerById);
router.put('/players/:id', Service.addGamesToPlayer);
router.put('/games', Service.addGame);

module.exports = router;