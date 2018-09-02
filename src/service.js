const uuid = require('uuid/v4');

function Service(dynamo) {
    const tableName = 'PingPongPlayers';

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
            const awsres = await dynamo.put({
                TableName: tableName,
                Item: {
                    name,
                    id: uuid(),
                    games: 0,
                    wins: 0
                }
            }).promise();
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }

    const getPlayerById = async (req, res, next) => {
        const { params: { id } } = req;
        console.log(id);
        try {
            const awsres = await dynamo.query({
                TableName: tableName,
                ExpressionAttributeValues: {
                    ":id": id
                }, 
                KeyConditionExpression: "id = :id", 
            }).promise();
            res.status(200).json(awsres.Items);
        } catch (err) {
            console.log(err.message);
            res.status(500).send();
        }
    }

    const addGamesToPlayer = async (req, res, next) =>  {
        const { params: { id }, body: { didWin } } = req;
        res.status(200).json({
            message: `updated ${id}`,
        });
    }

    const addgame = async (req, res, next) => {
        const { body: { table, winningSide } } = req;
        res.status(200).send();
    }

    return {
        getPlayers,
        getPlayerById,
        createPlayer,
        addGamesToPlayer
    }
}

module.exports = Service;