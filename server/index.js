
const express = require('express')
const app = express()
const cors = require('cors')

// const express = require('express')
// const cors = require('cors')

// const app = express()

app.use(express.json())
app.use(cors())


const {getCards, deletePlayer, createPlayerCard, updatePlayer} = require('./controller.js')



app.get(`/api/players`, getCards)
app.delete(`/api/players/:id`, deletePlayer)
app.post(`/api/players`, createPlayerCard)
app.put(`/api/players/:id`, updatePlayer)

app.listen(4004, () => console.log(`Server running on 4004`))

