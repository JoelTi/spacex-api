// function showMap() {
//   var map = tt.map({
//     key: '2W0tot7r2PRIPMIkrBmPYXDPrC24AfKj',
//     container: 'map',
//     style: 'tomtom://vector/1/basic-main',
//     center: [8, 51],
//     zoom: 4
//   });
//
//   var config = {
//     key: '2W0tot7r2PRIPMIkrBmPYXDPrC24AfKj',
//     style: 'tomtom://vector/1/relative'
//   };
//
//   map.on('load', function() {
//     map.addTier(new tt.TrafficFlowTilesTier(config));
//   });
//   map.addControl(new tt.GeolocateControl({
//    positionOptions: {
//      enableHighAccuracy: true
//    },
//     trackUserLocation: true
//   }));
//
// }

function setTimer() {
  var time = document.getElementsByTagName('time')[0],
    seconds = 19, minutes = 32, hours = 1,
    t;

  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
    }

    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
  }

  function timer() {
    t = setTimeout(add, 1000);
  }

  timer();
}

function myChart() {
  let myChart = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 10;
  Chart.defaults.global.defaultFontColor = '#777';

  let massPopChart = new Chart(myChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
      labels:['1 mnd','','3 mnd','','','6 mnd','','','9 mnd','','','12 mnd' ],
      datasets:[{
        data:[
          17,
          32,
          37,
          42,
          45,
          50,
          62,
          69,
          74,
          88,
          90,
          95
        ],
        backgroundColor:'#fff',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 0,
        borderColor:'#fff',
      }]
    },
    options:{
      aspectRatio: 1.2, //pas deze aan voor de verhouding
      responsive: true,
      showLines: false,
      title:{
        display:false
      },
      label:{
        display:false
      },
      legend:{
        display:false,
      },
      layout:{
        padding:{
          left:0,
          right:0,
          bottom:0,
          top:40
        }
      },
      tooltips:{
        enabled:true,
        xPadding: 20,
        yPadding: 10
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            color: "#fff"
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            autoSkip: false,
            maxTicksLimit: 4,
            stepSize: 3,
            fontColor: "white",
          }
        }],
        yAxes: [{
          gridLines: {
            borderDash: [8, 10],
            color: "#fff"
          },
          ticks: {
              beginAtZero: true,
              max: 100,
              min: 0,
              stepSize: 50,
              fontColor: "white",
              callback: function(value, index, values) {
                    return value + " %     ";
              }
          }
        }]
      }
    }
  });
}

// function getWeather() {
//
//   $('.weatherDes').html('');
//   $('.weatherTemp').html('');
//   $('.weatherGevTemp').html('');
//   $('.weatherWind').html('');
//   $('.weatherVisa').html('');
//   $('.weatherPress').html('');
//
//   var cityName = $('#cityName').val();
//   var apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=nl&appid=2e01b71c029b8c3583b3b30f67650ee5';
//
//   $.getJSON(apiCall, weatherCallback);
//
//   function weatherCallback(weatherData) {
//     var cityName = weatherData.name;
//     var country = weatherData.sys.country;
//
//     var description = weatherData.weather[0].description;
//     var temp = weatherData.main.temp;
//     var gevTemp = weatherData.main.feels_like;
//     var windSpeed = weatherData.wind.speed;
//     var visibility = weatherData.visibility;
//     var pressure = weatherData.main.pressure;
//
//     $('.weatherDes').append(description);
//     $('.weatherTemp').append(temp + " °C");
//     $('.weatherGevTemp').append(gevTemp + " °C");
//     $('.weatherWind').append(windSpeed + " m/s");
//     $('.weatherVisa').append(visibility + " m");
//     $('.weatherPress').append(pressure + " hPa");
//   }
// }


function getAPIdata() {
	var cityName = document.getElementById('cityName').value;
	var request = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=nl&appid=2e01b71c029b8c3583b3b30f67650ee5';

  // var button =  document.getElementById('btn-weergeven');
  // console.log(button);
  // button.addEventListener("click",function(){
  //   onAPIError(error);
  // });

	fetch(request)
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

	.then(function(response) {
		onAPISucces(response);
	})

	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
  var description = response.weather[0].description;
  var temp = response.main.temp;
  var gevTemp = response.main.feels_like;
  var windSpeed = response.wind.speed;
  var visibility = response.visibility;
  var pressure = response.main.pressure;

  var weatherDes = document.getElementById('weatherDes');
	weatherDes.innerHTML = description;
  var weatherTemp = document.getElementById('weatherTemp');
	weatherTemp.innerHTML = (temp + " °C");
  var weatherGevTemp = document.getElementById('weatherGevTemp');
	weatherGevTemp.innerHTML = (gevTemp + " °C");
  var weatherWind = document.getElementById('weatherWind');
	weatherWind.innerHTML = (windSpeed + " m/s");
  var weatherVisa = document.getElementById('weatherVisa');
	weatherVisa.innerHTML = (visibility + " m");
  var weatherPress = document.getElementById('weatherPress');
	weatherPress.innerHTML = (pressure + " hPa");
}

function onAPIError(error) {
	console.error('Fetch request failed', error);

  document.getElementById('btn-weergeven').classList.add('btn-animation');
  setTimeout(function(){ document.getElementById('btn-weergeven').classList.remove('btn-animation'); }, 2000);

  var weatherDes = document.getElementById('weatherDes');
	weatherDes.innerHTML = "";
  var weatherTemp = document.getElementById('weatherTemp');
	weatherTemp.innerHTML = "";
  var weatherGevTemp = document.getElementById('weatherGevTemp');
	weatherGevTemp.innerHTML = "";
  var weatherWind = document.getElementById('weatherWind');
	weatherWind.innerHTML = "";
  var weatherVisa = document.getElementById('weatherVisa');
	weatherVisa.innerHTML = "";
  var weatherPress = document.getElementById('weatherPress');
	weatherPress.innerHTML = "";
}


function showMapBox() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiMTYwNzE5MjEiLCJhIjoiY2s4azE5dTRlMDEzOTNubms3eGFrNG5oZiJ9.1Ay5wHAcfjYWywQ3b2m51g';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/16071921/ck8k3ogui2j421imhhosx0q22',
				center: [50, 50],
				zoom: 1.5,
    });

    var size = 200;


    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function() {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        // called once before every frame where the icon will be used
        render: function() {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 3) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
            context.fill();

            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2
            );
            context.fillStyle = 'rgba(255, 100, 100, 1)';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            map.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        }
    };

    map.on('load', function() {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2.5 });

        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                          'description':
                          '<strong>Landingsplek beschikbaar!</strong><br /><p>Landingsplek met de volgende coordinaten long:70.58, lat:41.92 is klaar om te landen. Een veilige terugreis!</p> '

                          },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [50.88, 38.92]
                        }
                    }
                ]
            }
        });
        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        });
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'points', function(e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'points', function() {
        map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'points', function() {
        map.getCanvas().style.cursor = '';
        });

				map.addControl(
					new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					mapboxgl: mapboxgl
					}),
          'top-left'
				);
				map.addControl(
					new mapboxgl.NavigationControl()
				);
				map.addControl(
					new mapboxgl.GeolocateControl({
						positionOptions: {
						enableHighAccuracy: true
						},
						trackUserLocation: true
					})
				);
    });


    // Weerinformatie verschillende steden
    var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'New York',
    coordinates: [-73.9808, 40.7648]
  },
  {
    name: 'Tokyo',
    coordinates: [139.6917, 35.689506]
  },
  {
    name: 'Jakarta',
    coordinates: [106.8270734, -6.1747565]
  },
  {
    name: 'Karachi',
    coordinates: [67.05, 24.8666667]
  },
  {
    name: 'Seoul',
    coordinates: [126.941893, 37.547895]
  },
  {
    name: 'Delhi',
    coordinates: [77.2153959, 28.6269628]
  },
  {
    name: 'Shanghai',
    coordinates: [121.4696539, 31.2315708]
  },
  {
    name: 'Manilla',
    coordinates: [18.133396, 59.323263]
  },
  {
    name: 'Kiev',
    coordinates: [30.5234, 50.4501]
  },
  {
    name: 'Astana',
    coordinates: [71.4240419, 51.1772557]
  },
  {
    name: 'Moskow',
    coordinates: [37.60946, 55.7615902]
  },
  {
    name: 'Tripoli',
    coordinates: [13.1890869, 32.8934258]
  },
  {
    name: 'Rome',
    coordinates: [12.4935467, 41.8892943]
  },
  {
    name: 'Rio de Janeiro',
    coordinates: [-43.2399357, -22.894872]
  },
  {
    name: 'Sidney',
    coordinates: [151.2061827, -33.8727496]
  },
  {
    name: 'Kinshasa',
    coordinates: [15.315, -4.3297222]
  },
];

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '2e01b71c029b8c3583b3b30f67650ee5';

map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(

 'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.2
        }
      });
    }
  );
}
}


window.onload = function() {
  myChart();
  // showMap();
  showMapBox();
  setTimer();
}
