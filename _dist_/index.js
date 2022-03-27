/* API things */
const API = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '60b63bce5e9672f29d4dccce37d99535'
const API_IMG = 'http://openweathermap.org/img/wn/'
/* _____________________________________________ */

const form = document.querySelector('form')
const input = document.querySelector('input')
const results = document.querySelector('.results')
let paraAgregar = []

const createCard = (info) =>{
    /* Creando etiquetas */
    const container = document.createElement('div')
    const containerIcon = document.createElement('div')
    const nomCiudad = document.createElement('h1')
    const pais = document.createElement('span')
    const temp = document.createElement('h2')
    const description = document.createElement('p')
    const icon = document.createElement('img')

    /* Agregando estilo a las etiquetas */
    container.className = 'w-fit bg-gradient-to-br from-green-500 to-green-600  shadow-lg rounded-lg p-4 flex flex-col justify-center items-center'
    nomCiudad.className = 'text-lg text-center text-gray-100 font-bold'
    
    temp.className = 'text-xl ml-2 text-center text-gray-100 inline-block mt-4'
    icon.className = 'w-fit text-center inline-block mb-2'
    description.className = 'text-sm text-center text-gray-200 font-medium capitalize'

    /* Agregando info a las etiquetas */
    
    nomCiudad.textContent = `${info.name}, ${info.sys.country}`
    temp.textContent = `${Math.round(info.main.temp - 273.15)} °C`
    icon.src = `${API_IMG}${info.weather[0].icon}.png`
    description.textContent = info.weather[0].description

    /* Metiendo todo al container */
    containerIcon.append(temp, icon)
    container.append(nomCiudad, pais, containerIcon, description )

    results.append(container)
}

const formThings = async (e) =>{
    e.preventDefault()
    let ciudad = input.value
    const info = await fetch(`${API}?q=${ciudad}&appid=${API_KEY}&lang=es`)
    const infoFormated = await info.json()
    
    if(infoFormated.cod == 404){
        input.className += 'border-red-600 bg-red-200'
    } else{
        input.classList.remove('border-red-600')
        input.classList.remove('bg-red-100')
        createCard(infoFormated)
        input.value = ''
    }
}

form.addEventListener( 'submit', formThings )
