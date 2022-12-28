const changeLocation = document.getElementById('change-location')
const card = document.getElementById('card')
const details = document.getElementById('details')
const weatherIcon = document.getElementById('weather-icon')
const overlay = document.getElementById('overlay')
const error = document.getElementById("error")

changeLocation.city.focus()

//getWeather
const getWeather = async (city)=>{
    const data = await getData(city)

    return data
}

function loader(state){
    if(state){
        overlay.classList.remove("d-none")
    }
    else{
        overlay.classList.add("d-none")
    }
}

function updateWeather(data){
    if(data.name){ 
    error.innerHTML = `Thank you for using our service !`
    error.classList.remove("text-danger")
    error.classList.add("text-info")

    details.innerHTML = `
    <h5 class="mb-3">${data.name}, ${data.sys.country}</h5>
    <p class="mb-3">${data.weather[0].main}</p>
    <div class="display-4 mb-3">
      <span>${Math.round(data.main.temp)}</span>
      <span>&deg;C</span>
    </div>`

    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` 

    }else
    {
        error.innerHTML = `No information was found for your request !`
        error.classList.add("text-danger")
        details.innerHTML = `
        <h5 class="mb-3">City Name</h5>
          <p class="mb-3">Weather</p>
          <div class="display-4 mb-3">
            <span>TEMP</span>
            <span>&deg;C</span>
          </div>
        </div>`

    }
}

//getLocation
changeLocation.addEventListener("submit", (e)=>{
    e.preventDefault()
    const cityName = changeLocation.city.value

    if(cityName.length){
        getWeather(cityName).then(data => {
            updateWeather(data)
            console.log(data);
        }).catch("So'rov mavjud emas")
    }

    changeLocation.reset()
})

