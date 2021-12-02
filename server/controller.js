const hooper = require('./db.json')
require("dotenv").config();

const {CONNECTION_STRING} = process.env 

const Sequelize = require('sequelize')

const sequelize = new Sequelize( CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let globalId = []

module.exports = {
    getCards: (req, res) => res.status(200).send(hooper), 
    deletePlayer: (req, res) => {
        let index = hooper.findIndex(elem => elem.id === +req.params.id)
        hooper.splice(index, 1)
        res.status(200).send(hooper)
    },
    createPlayerCard: (req, res) => {
        let {title, rating, imageURL } = req.body
        let newHooper = {
            id: globalId, 
            title, 
            rating, 
            imageURL
        }
        hooper.unshift(newHooper)
        res.status(200).send(hooper)
        globalId++
    }, 
    updatePlayer: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = hooper.findIndex(elem => +elem.id === +id)

        if (hooper[index].rating === 5 && type === 'plus'){
            res.status(400).send('cannot go above 5')
        } else if (hooper[index].rating === 0 && type === 'minus'){
            res.status(400).send('cannot go below 0')
       
        } else if (type === 'plus'){
            hooper[index].rating++
            res.status(200).send(hooper)
        } else if (type === 'minus'){
            hooper[index].rating--
            res.status(200).send(hooper)
        } else {
            res.sendStatus(400)
        }
    }
}