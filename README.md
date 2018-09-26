# Ping Pong Server

Backend portion to [ping-pong](https://github.com/Jaredk3nt/ping-pong) a doubles queueing and win record tracking application.

## Route Documentation

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