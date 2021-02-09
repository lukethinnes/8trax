
const albumList = document.querySelector('.album-list')
const createForm = document.querySelector('#create-form')
const inputName = document.querySelector('#input-name')
const inputImage = document.querySelector('#input-image')
const inputYear = document.querySelector('#input-year')

console.log(createForm)
fetch('http://localhost:3000/cartridges')
    .then(response => response.json())
    .then(cartridges => cartridges.forEach(cartridge => {
        const albumCard = document.createElement('li')
        const albumName = document.createElement('h2')
        const albumImage = document.createElement('img')
        const albumYear = document.createElement('p')
        const editCartridgeForm = createCartridgeForm(`edit-cartridge-${cartridge.id}`, cartridge)
        const deleteButton = document.createElement('button')

        albumName.textContent = cartridge.name
        albumImage.src = cartridge.image_url
        albumYear.textContent = cartridge.year 
        deleteButton.textContent = "Delete Cartridge"

        editCartridgeForm.addEventListener('click', () => {
            window.location.href = `show.html?id=${cartridge.id}`
        })

        albumCard.append(albumName, albumImage, albumYear, deleteButton)
        albumList.appendChild(albumCard)
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetch(`http://localhost:3000/cartridges/${cartridge.id}`, {method: 'DELETE'})
            .then(response => response.json())
        })

    }))
createForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    const image_url = formData.get('image_url')
    const year = formData.get('year')

    fetch(`http://localhost:3000/cartridges/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, image_url, year},
        )
    })
    .then(response => response.json())
    .then(window.location.replace('/'))
})
