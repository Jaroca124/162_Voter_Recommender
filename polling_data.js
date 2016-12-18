var data = [
 {
   "Name": "Cuernavaca Club House",
   "Lat": 37.371601,
   "Long": -122.063835
 },
 {
   "Name": "Mountain View City Hall",
   "Lat": 37.390145,
   "Long": -122.082279
 },
 {
   "Name": "Trinity Methodist Church",
   "Lat": 37.389875,
   "Long": -122.080372
 },
 {
   "Name": "Chinese Church In Christ",
   "Lat": 37.417673,
   "Long": -122.090164
 },
 {
   "Name": "Mtn. View Center For Performing Arts",
   "Lat": 37.390145,
   "Long": -122.082279
 },
 {
   "Name": "Maryce Freelen Place - Community Rm",
   "Lat": 37.398173,
   "Long": -122.10275
 },
 {
   "Name": "The Fountains Housing Complex",
   "Lat": 37.409833,
   "Long": -122.091841
 },
 {
   "Name": "Mountain View Chinese Christian Church",
   "Lat": 37.386284,
   "Long": -122.066178
 },
 {
   "Name": "San Veron Park Apts. - Rec. Room",
   "Lat": 37.403803,
   "Long": -122.074504
 },
 {
   "Name": "The Canata Residence",
   "Lat": 37.412153,
   "Long": -122.102597
 },
 {
   "Name": "Springer School Multi-use Bldg",
   "Lat": 37.371331,
   "Long": -122.094536
 },
 {
   "Name": "Mountain View Community Center",
   "Lat": 37.401026,
   "Long": -122.097745
 },
 {
   "Name": "Park Plaza Apartments - Community Room",
   "Lat": 37.400643,
   "Long": -122.093622
 },
 {
   "Name": "Ymca Mountain View Child Deveolpment Ctr",
   "Lat": 37.403342,
   "Long": -122.08432
 },
 {
   "Name": "Hampton Inn & Suites",
   "Lat": 37.398812,
   "Long": -122.07573
 },
 {
   "Name": "St. Athanasius Church�Hall",
   "Lat": 37.405406,
   "Long": -122.096587
 },
 {
   "Name": "Mountain View F S # 4 - Training Room",
   "Lat": 37.394098,
   "Long": -122.060414
 },
 {
   "Name": "Moffett Mobilehome Park Rec. Room",
   "Lat": 37.400097,
   "Long": -122.073972
 },
 {
   "Name": "Mountain View Fire Station # 01",
   "Lat": 37.394474,
   "Long": -122.083447
 },
 {
   "Name": "Mountain View Academy - Art Room",
   "Lat": 37.393815,
   "Long": -122.084717
 },
 {
   "Name": "Seventh Day Adventist Church",
   "Lat": 37.380098,
   "Long": -122.095244
 },
 {
   "Name": "First Presbyterian Church - Room 103",
   "Lat": 37.374429,
   "Long": -122.086117
 },
 {
   "Name": "Graham Middle School - Multi-purpose",
   "Lat": 37.381962,
   "Long": -122.085482
 },
 {
   "Name": "St. Paul's Lutheran Church - Fell. Hall",
   "Lat": 37.388804,
   "Long": -122.095279
 },
 {
   "Name": "St. Timothy's Episcopal Church",
   "Lat": 37.37263,
   "Long": -122.078328
 },
 {
   "Name": "Landels School",
   "Lat": 37.388373,
   "Long": -122.071319
 },
 {
   "Name": "Moorpark Mobile Park",
   "Lat": 37.381578,
   "Long": -122.065766
 },
 {
   "Name": "Sahara Mobile Village",
   "Lat": 37.378565,
   "Long": -122.069854
 },
 {
   "Name": "Mountain View - Los Altos Board Room",
   "Lat": 37.36092,
   "Long": -122.065019
 },
 {
   "Name": "Sunset Estates MHP",
   "Lat": 37.383185,
   "Long": -122.05941
 },
 {
   "Name": "Mountain View Whisman School District",
   "Lat": 37.403342,
   "Long": -122.08432
 },
 {
   "Name": "Mountain View Fire Station # 03",
   "Lat": 37.40699,
   "Long": -122.094803
 },
 {
   "Name": "Latham Square Apartments",
   "Lat": 37.398833,
   "Long": -122.103826
 },
 {
   "Name": "German School Of Silicon Valley Room 1",
   "Lat": 37.40067,
   "Long": -122.067024
 }
]

var mylat = 0;
var mylng = 0;
var mylocation = new google.maps.LatLng(mylat,mylng);
myOptions = {
    zoom: 15,
    center: mylocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

function initialize() {
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mylat = position.coords.latitude;
            mylng = position.coords.longitude;
            mylat = 37.36087;
            mylng = -122.072531;

            renderMap();
        });   
    }
    else {
        alert("Alert: Geolocation is not supported by your browser!");
    }
}

function renderMap() {
    myposition = new google.maps.LatLng(mylat,mylng);
    map.panTo(myposition);
    marker = new google.maps.Marker({
        position: myposition,
        icon: "mymarkerpic.png",
        title: "My Location"
    });
    marker.setMap(map);
    //Requesting
    myinfo = '<div class="student">' + "Me: HarleyConnell" + "<br> Latitude: " + mylat + " Longitude: " + mylng + "</div>";
    var infowindow = new google.maps.InfoWindow({
        content: myinfo
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    parse(data);
} 

function parse(arr) {
    var i;
    var dist;
    var closest_index;
    var closest_distance;
    
    closest_index = 0;
    
    toUpdate = document.getElementById("content");
    myinfo = '<div class="student">' + "My Location<br>Latitude: " + mylat + " Longitude: " + mylng + "</div>";
    toUpdate.innerHTML += myinfo;

    for(i=0; i < arr.length; i++) {
        peopleposition= new google.maps.LatLng(arr[i].Lat, arr[i].Long);
        newmarker = new google.maps.Marker({
            position: peopleposition
        });
        
        // Calculate Distance to Station
        dist = ((Math.round(calc_distance(arr[i].Lat, arr[i].Long)*100000)) / 100000);
        console.log(dist);
        
        if (i == 0) {
            console.log('first');
            closest_distance = dist;   
        }
        
        if (closest_distance > dist) {
            console.log('new');
            dist = closest_index;
            closest_index = i;
        }
        
        
        personinfo = '<div class="student" onclick="initMap(' + mylat + ', ' + mylng + ', ' + arr[i].Lat + ', ' + arr[i].Long + ')">' + (i + 1) + ". " + arr[i].Name + "<br> Latitude: " + arr[i].Lat + " Longitude: " + arr[i].Long + "<br> Distance from Me: " + ((Math.round(calc_distance(arr[i].Lat, arr[i].Long)*100000)) / 100000) + " mi</div>";
        toUpdate.innerHTML += personinfo;
        infowindow = new google.maps.InfoWindow({
            content: personinfo
        });
        setinfowindow(newmarker, infowindow);
        newmarker.setMap(map);
    }
    
    console.log(arr[closest_index].Lat);
    
}

function setinfowindow(marker, content) {
    google.maps.event.addListener(marker, 'click', function() {
            content.open(map, marker);
        });
}



//Haversine Formula From: http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

function calc_distance(slat, slng) {
        var x1 = mylat - slat;
        var dlat = x1.toRad();
        var x2 = mylng - slng;
        var dlng = x2.toRad();
        var R = 6371; //km constant
        var a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.cos(slat.toRad()) * Math.cos(mylat.toRad()) * Math.sin(dlng/2) * Math.sin(dlng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return (d / 1.6);
}

//////////////////////////////////
// Generate Map Routes
//////////////////////////////////

function initMap(a_lat, a_lng, b_lat, b_lng) {
    console.log('init_map');
    var pointA = new google.maps.LatLng(a_lat, a_lng),
    pointB = new google.maps.LatLng(b_lat, b_lng),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

  // get route from A to B
  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}