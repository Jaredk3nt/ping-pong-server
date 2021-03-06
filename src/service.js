const uuid = require('uuid/v4');

function Service(dynamo) {
    const tableName = 'ping-pong-players';

    const getPlayers = async (req, res, next) => {
        try {
            const awsres = await dynamo.scan({
                TableName: tableName,
            }).promise();
            res.status(200).json(awsres.Items);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }

    const createPlayer = async (req, res, next) => {
        const { body: { name } } = req;
        try {
            const newPlayer = {
                name,
                id: uuid(),
                games: 0,
                wins: 0
            }
            const awsres = await dynamo.put({
                TableName: tableName,
                Item: newPlayer
            }).promise();
            res.status(200).json(newPlayer);
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }

    const getPlayerById = async (req, res, next) => {
        const { params: { id } } = req;
        try {
            const awsres = await dynamo.get({
                TableName: tableName,
                Key: { id }
            }).promise();
            res.status(200).json(awsres.Item);
        } catch (err) {
            console.log(err.message);
            res.status(500).send();
        }
    }

    const addGamesToPlayer = async (req, res, next) =>  {
        const { params: { id }, body: { didWin } } = req;
        try {
            await updatePlayer(id, didWin);
            res.status(200).json({
                message: `updated ${id}`,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send();
        }
    }

    const addGame = async (req, res, next) => {
        const { body: { table, winningSide }, body } = req;
        try {
            await updatePlayer(table.left.player1, winningSide === 'left');
            await updatePlayer(table.left.player2, winningSide === 'left');
            await updatePlayer(table.right.player1, winningSide === 'right');
            await updatePlayer(table.right.player2, winningSide === 'right');
            res.status(200).json({
                message: `Added game to database`,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json(err);
        }
        res.status(200).send();
    }

    const updatePlayer = async (id, didWin) => {
        const awsres = await dynamo.update({
            TableName: tableName,
            Key: { id },
            ExpressionAttributeNames: {
                "#G": "games", 
                "#W": "wins"
            }, 
            ExpressionAttributeValues: {
                ":g": 1, 
                ":w": didWin ? 1 : 0
            },
            UpdateExpression: "ADD #G :g, #W :w" 
        }).promise();
        return awsres;
    }

    return {
        getPlayers,
        getPlayerById,
        createPlayer,
        addGamesToPlayer,
        addGame
    }
}

module.exports = Service;