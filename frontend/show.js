const baseURL = 'http://localhost:3000'
const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get('id')
const editForm = document.querySelector('#edit-form')
const cartName = document.querySelector('#name')
const cartImage = document.querySelector('#image_url')

fetch(baseURL + `/cartridges/${id}`)
    .then(response => response.json())
    .then(cartridge => {
        console.log(cartName.value)
        cartName.value = cartridge.name 
        cartImage.value = cartridge.image_url 
    })

editForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    fetch(baseURL + `/cartridges/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cartridge: {
                name: cartName.value,
                image_url: cartImage.value
            }
        })
    })
    .then(window.location.replace('/'))
})

