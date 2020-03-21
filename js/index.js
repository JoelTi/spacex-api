function showMap() {



  var map = tt.map({
    key: 'YGOSC3vaMIRj32nNnQoYktX5D3svhpM2',
    container: 'map',
    style: 'tomtom://vector/1/basic-main',
    center: [8, 51],
    zoom: 4
  });

  var config = {
    key: 'YGOSC3vaMIRj32nNnQoYktX5D3svhpM2',
    style: 'tomtom://vector/1/relative'
  };

  map.on('load', function() {
    map.addTier(new tt.TrafficFlowTilesTier(config));
  });
  map.addControl(new tt.FullscreenControl({
    container: document.querySelector('body')
  }));
  map.addControl(new tt.GeolocateControl({
   positionOptions: {
       enableHighAccuracy: true
   },
   trackUserLocation: true
  }));
  
}

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

function getWeather() {

  $('.weatherDes').html('');
  $('.weatherTemp').html('');
  $('.weatherGevTemp').html('');
  $('.weatherWind').html('');
  $('.weatherVisa').html('');
  $('.weatherPress').html('');

  var cityName = $('#cityName').val();
  var apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=nl&appid=2e01b71c029b8c3583b3b30f67650ee5';

  $.getJSON(apiCall, weatherCallback);

  function weatherCallback(weatherData) {
    var cityName = weatherData.name;
    var country = weatherData.sys.country;

    var description = weatherData.weather[0].description;
    var temp = weatherData.main.temp;
    var gevTemp = weatherData.main.feels_like;
    var windSpeed = weatherData.wind.speed;
    var visibility = weatherData.visibility;
    var pressure = weatherData.main.pressure;

    $('.weatherDes').append(description);
    $('.weatherTemp').append(temp + " °C");
    $('.weatherGevTemp').append(gevTemp + " °C");
    $('.weatherWind').append(windSpeed + " m/s");
    $('.weatherVisa').append(visibility + " m");
    $('.weatherPress').append(pressure + " hPa");
  }
}

window.onload = function() {
  myChart();
  showMap();
  setTimer();
  weatherCallback(weatherData);
}
