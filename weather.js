// Sections where I can alter information
let SearchVal = document.getElementById('SearchVal');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

let form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (SearchVal.value !== '') {
        searchWeather();
    }
});


// the free (no price) api and the url
const apiKey = "46e4a6feafcb4aa91521e1a30915e7bc";

const api_Url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+apiKey;

// fetch whatever the user input if it exists... status codes
const searchWeather = function () {
    fetch(api_Url + '&q=' + SearchVal.value)
    .then(function (Responsive) {
        return Responsive.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.cod == 200) {
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/64.png';

            temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
            temperature.querySelector('figcaption span').innerText = data.main.temp; 

            // since the temp is in celsius by default... conversion to °F wiil be done
            let celsius = data.main.temp;
            let fahrenheit = (celsius * 9/5) + 32;
            temperature.querySelector('figcaption span').innerText = Math.round(fahrenheit);

            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;

            document.querySelector('.result').style.display = 'block';
        } else {
            main.classList.add('error');
            setTimeout(function () {
                main.classList.remove('error');
            }, 1000);
        }

        SearchVal.value = '';
    });
};


