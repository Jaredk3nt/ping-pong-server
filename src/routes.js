const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const Service = require('./service')(docClient);

router.get('/players', Service.getPlayers);
/*
 * Body: { name: <name> } 
 */
router.post('/players', Service.createPlayer);
router.get('/players/:id', Service.getPlayerById);
/*
 * Body: { didWin: true/false } 
 */
router.put('/players/:id', Service.addGamesToPlayer);
/*
Body: {
	"table": {
		"left": {
			"player1": { "id": "" },
			"player2": { "id": "" }
		},
		"right": {
			"player1": { "id": "" },
			"player2": { "id": "" }
		}
	},
	"winningSide": "right"
}
 */
router.post('/games', Service.addGame);

module.exports = router;