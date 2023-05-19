//APLICACIÓN QUE INDICA EL CLIMA ACTUAL EN UNA CIUDAD 

/*
Saurrales, Carolina Ester, 
Comision DWN3CV  Vi 19:00 - 20:50
Materia: Aplicaciones Web Progresivas (PWA)
Docente: RUBINO, Gonzalo  
*/



//*********************************************––>  
//**************** API KEY ********************––>  
//*********************************************––>  
//-	Tener su propia API KEY en Open Weather Map
//-	API ENDPOINT: https://openweathermap.org/api 
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//APIKEY = "cd42b8e699a411398e4be4557b178493"

//APIKEYTT = "c8d06e43e7d7fcf9e43336021c7e55cd"
//APIKEYTT = "b57301e5c2dd10f8d754b3f75297dd40"
//APIKEYTT = "N8ihuGPyPoEI4C2WvQl2MHEVlHWFc8TC"   
//e01743be1e896bd7b6e1a31406bf88ba

//N8ihuGPyPoEI4C2WvQl2MHEVlHWFc8TC
//EEvi9pX5QJZGQAyqDI3j3MvQD4B4AxoM

const APIKEY = "cd42b8e699a411398e4be4557b178493"
const APIKEYTT = "EEvi9pX5QJZGQAyqDI3j3MvQD4B4AxoM"
const inputElement = document.getElementById("iciudad");
const buttonSearch = document.getElementById('buscar');
const resultElement = document.getElementById('resultado');
const mapaElement = document.getElementById("mapa");
const videoElement = document.getElementById("video");
let HTML = '';


//*********************************************––>  
//*********** GUARDO EN LoalStorage ***********––>  
//*********************************************––>  
//-	Guardar la última ubicación buscada con LocalStorage es decir:
//- El usuario busca una ciudad. Guardo el JSON de respuesta en localStorage.
//- Si recargo la app, chequeo que existe el valor en LocalStorage, lo recupero y muestro.

//guarda ultima ciudad buscada
window.addEventListener("beforeunload", function () {
    localStorage.setItem("ultimaCiudad", inputElement.value);
});

//carga ultima ciudad buscada
document.addEventListener("DOMContentLoaded", () => {
    var lsCiudad = (localStorage.getItem("ultimaCiudad"));

    //muestra ultima ciudad buscada
    if (lsCiudad.length != 0) {
        inputElement.value = lsCiudad;
        buttonSearch.click()
    }
    else {
        ` <img src='https://w0.peakpx.com/wallpaper/456/121/HD-wallpaper-weather-rain-sun-overcast-cold-hot.jpg' alt='mapa'>`;
    }
});



//*********************************************––>  
//***********  USR INGRESA PALABRA ************––>  
//*********************************************––>  
//*********************************************––>  
// Permitir al usuario buscar el clima por ciudad, provincia o país

inputElement.addEventListener("click", (e) => {
    inputElement.value = '';
});


//*********************************************––>  
//**************** BUSCAR  ********************––>  
//*********************************************––>  
//- Botón en un HTML
buttonSearch.addEventListener('click', event => {
    event.preventDefault();

    if (!isNaN(inputElement.value)) {
        HTML = `
        <img class="errCiudad mb-2" src='https://coachingsanitario.com/wp-content/uploads/2019/06/ERROR.jpg' alt='error'>                           
        <h3 class="text-white fs-4 text-center mb-5">Debe ingresar una ciudad</h3>
        `;
        mapaElement.style.display='none';
        videoElement.style.display='none';
        resultElement.innerHTML = HTML;
    } else {

    //*********************************************––>  
    //**************** DATOS   ********************––>  
    //*********************************************––>  
    //Que los datos mostrados esten en Grados Celsius ( C ): se utilizó &units=metric
    //- Cuando el usuario hace click en el botón Buscar, uso Fetch para llegar a una API.
    //- Usar Fetch para acceder por GET a la API de  Open Weather Map => URL : API ENDPOINT: https://openweathermap.org/api 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&lang=es&appid=${APIKEY}&units=metric`)


        .then((respuesta) => {
            if (respuesta.ok) {
                return respuesta.json(); // retorno al siguiente then el response como json
            }  
        })


        .then(json => {
            console.log(json);

            imagenesHTML = '<div>';
            imagenesHTML += `                    

            <!-- --------------Mostrar los datos: temperatura máxima, temperatura mínima, humedad, --------- --> 
            <!-- -------------- sensación térmica, presión atmosférica y velocidad de viento. -------------- --> 
            <div class="card-group mb-3 justify-content-center">
                <div class="mb-3 mx-2 p-4 bg-white fs-4 bg-opacity-50 text-white shadow-lg rounded" style="max-width: 30rem;">
                    <div class="card-body text-dark">   
                        <p>
                            <span class="p2">MAX:</span> ${json.main.temp_max}<span>°C</span>
                        </p>
                        <p>
                            <span class="p2">MIN:</span> ${json.main.temp_min}<span>°C</span>
                        </p>   
                        <p>
                            <span class="p1"> S.T:</span> ${json.main.feels_like}<span>°C</span>
                        </p>
                        <p>
                        <span class="p1"> HUMEDAD:</span> ${json.main.humidity}<span>%</span>
                        </p>
                    </div>       
                </div>  

                <div class="mb-3 mx-2 p-3 bg-dark fs-3 bg-opacity-50 text-danger shadow-lg rounded" style="max-width: 30rem;">  
                    <div class="card-body text-dark">
                        <! ––//*********************************************––>  
                        <! ––//**************** GRAFICO ********************––>  
                        <! ––//*********************************************––>  
                        <! ––//Mostrar con un gráfico, como está el clima. ( Ej: nublado, soleado, etc ). ––> 
                        <! ––//Esto queda a criterio de ustedes, puede ser una imagen, una foto, lo que quieran. Solo debe ser claro al usuario que clima hace.––> 
                        <h2 class="fs-1 hh"> <span style="font-weight: 700;color: white;"> ${json.name}</h2></span> 
                        <p class="card-footer-center">
                            <span class="text-white"> ${json.weather[0].description}</span>
                        </p>      
                        <p class="card-footer-center">                          
                            <img class="icon" src='https://openweathermap.org/img/wn/${json.weather[0].icon}.png' alt='icono de clima'>                           
                        </p>  
                    </div>       
                </div>      
                
 
                        
                <div class="mb-3 mx-2 p-4 bg-white fs-4 bg-opacity-50 text-white shadow-lg rounded" style="max-width: 30rem;">
                    <div class="card-body text-dark">                              
                        <p class="card-footer-center">
                            <span class="p2">Presión:</span> ${json.main.pressure}<span>hPa</span>
                        </p>
                        <p class="card-footer-center">
                            <span class="p2">Viento:</span> ${json.wind.speed}<span>Km/h</span>
                        </p>

                        <p class="card-footer-center">
                            <span class="p1">LAT:</span> ${json.coord.lat}<span>°</span>
                        </p>
                        <p class="card-footer-center">
                            <span class="p1"> LON::</span> ${json.coord.lon}<span>°</span>
                        </p>
                    </div>   
                </div>    

            </div>        
            
        `;
            resultElement.innerHTML = imagenesHTML;
            //Guardo latitud y longitud para luego visualizar el mapa correspondiente
            LAT = json.coord.lat;
            LON = json.coord.lon;
            //*********************************************––>  
            //**********  MAPA UBIACION BUSCADA ***********––>  
            //*********************************************––>  
            //La API de Open Weather les va a retornar datos de LAT y LONG que son las coordenadas de geolocalización. 
            //Deben utilizarlas para enviarla a la API de Mapas y mostrarlo la ubicación 
            //-	Mostrar un mapa con la ubicación buscada, TOM TOM: https://developer.tomtom.com/content/map-display-api-explorer 
            let respuesta = `https://api.tomtom.com/map/1/staticimage?key=${APIKEYTT}&zoom=12&center=${LON},${LAT}&format=jpg&layer=basic&style=main&width=1500&height=1120&view=Unified&language=en-GB`;
            imagenesHTML = ` <div class="card bg-dark bg-opacity-50 justify-content-center rounded mapa"><img src='${respuesta}' alt='mapa'></div>`;
            mapaElement.innerHTML=imagenesHTML;
            mapaElement.style.display='block';
 

            //*********************************************––>  
            //********  VIDEO DE ACUERDO AL CLIMA  ********––>  
            //*********************************************––>  
            //No necesita ser dinámico.
            //-	Utilizar Youtube para esto: https://developers.google.com/youtube/iframe_api_reference
            if(videoElement.children.length){
            videoElement.children[0].remove();
            }
            var div=document.createElement('div');
            div.id='player';
            videoElement.append(div);           
            onYouTubeIframeAPIReady(json.weather[0].main);             
            videoElement.style.display='block';
        })

        .catch(err => { console.log(`Hubo un error: ${err}`) })
        .finally(final => {
            // borra el loading
            console.log('ejecuto el finally');
        });


 }
});

