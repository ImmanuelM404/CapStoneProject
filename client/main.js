

const playerContainer = document.querySelector('#player-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/players`

const playerCallback = ({ data:hooper}) => displayPlayerCard(hooper)
const errCallback = err => console.log(err.response.data)

const getAllHoopers = () => axios.get(baseURL).then(playerCallback).catch(errCallback)
const createPlayerCard = body => axios.post(baseURL, body).then(playerCallback).catch(errCallback)
const deletePlayer = id => axios.delete(`${baseURL}/${id}`).then(playerCallback).catch(errCallback)    
const updatePlayer = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(playerCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createPlayerCard(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createPlayerDiv(player) {
    const playerCard = document.createElement('div')
    playerCard.classList.add('player-card')

    playerCard.innerHTML = `<img alt='player cover' src=${player.imageURL} class="player-cover"/>
    <p class="player-title">${player.title}</p>
    <div class="btns-container">
        <button onclick="updatePlayer(${player.id}, 'minus')">-</button>
        <p class="player-rating">${player.rating} stars</p>
        <button onclick="updatePlayer(${player.id}, 'plus')">+</button>
    </div>
    <button onclick="deletePlayer(${player.id})">delete</button>
    `


    playerContainer.appendChild(playerCard)
}

function displayPlayerCard(arr) {
    playerContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPlayerDiv(arr[i])
    }
}


form.addEventListener('submit', submitHandler)

getAllHoopers()



