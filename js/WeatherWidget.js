import UIComponent from "./UIComponent.js";


export default class WeatherWidget extends UIComponent{


constructor(config){

super(config);

}




async getWeather(lat, lon){


const response =
await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

);


return response.json();


}







async getCoordinates(city){


const response =
await fetch(

`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`

);



const data =
await response.json();



return data.results?.[0];


}







async getCityName(lat, lon){


const response =
await fetch(

`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ru`

);



const data =
await response.json();



return (

data.address.city

||

data.address.town

||

data.address.village

||

"Ваш город"

);



}








render(){


this.element =
document.createElement("div");



this.element.className="widget";



this.element.innerHTML=`

<div class="widgetHeader">


<h2>
🌤 ${this.title}
</h2>


</div>



<div class="weatherSearch">


<input 
class="cityInput"
placeholder="Введите город">



<button class="searchCity">
Найти
</button>


</div>



<button class="locationBtn">

📍 Определить город

</button>



<p class="weatherInfo">

Определение города...

</p>


`;



this.element
.querySelector(".widgetHeader")
.append(
this.createCloseButton()
);





const input =
this.element.querySelector(".cityInput");



const search =
this.element.querySelector(".searchCity");



const location =
this.element.querySelector(".locationBtn");



const info =
this.element.querySelector(".weatherInfo");







search.onclick = ()=>{


const city =
input.value.trim();



if(city){


this.loadCity(
city,
info
);


}



};







location.onclick = ()=>{


this.loadLocation(info);


};





this.loadLocation(info);



return this.element;


}









async loadLocation(info){



if(!navigator.geolocation){


info.textContent =
"Геолокация недоступна";


return;


}






navigator.geolocation.getCurrentPosition(

async(position)=>{


const lat =
position.coords.latitude;


const lon =
position.coords.longitude;





const city =
await this.getCityName(
lat,
lon
);





const weather =
await this.getWeather(
lat,
lon
);






info.innerHTML =


`

📍 ${city}

<br>

🌡 Температура:
${weather.current_weather.temperature}°C

<br>

💨 Ветер:
${weather.current_weather.windspeed} км/ч

`;



},



()=>{


info.textContent =
"Введите город вручную";


}



);



}









async loadCity(city,info){



try{


info.textContent =
"Загрузка...";



const place =
await this.getCoordinates(city);





if(!place){


info.textContent =
"Город не найден";


return;


}







const weather =
await this.getWeather(

place.latitude,

place.longitude

);





info.innerHTML =


`

📍 ${place.name}

<br>

🌡 Температура:
${weather.current_weather.temperature}°C


<br>

💨 Ветер:
${weather.current_weather.windspeed} км/ч


`;



}


catch{


info.textContent =
"Ошибка загрузки";


}



}



}