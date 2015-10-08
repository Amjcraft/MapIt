var Map = function (id, title, description) {
    this.mapId = id;
    this.mapTitle = title;
	this.mapDescription = description;
};

var Group = function (title, description) {
    this.groupTitle = title;
    this.groupDescription = description;
};

Map.prototype = function () {
    var operator = null,
        operatorSet = false,
        equalsPressed = false,
        lastNumber = null,

        add = function (x, y) {
            return x + y;
        },
        calculate = function (thisObj) {
       
        };

    return {
        
		
    };
} ();

var mapOptions = {
	  center: { lat: 29.231666666666666, lng: -103.33416666666666},
	  zoom: 8
};
		
var _map = new google.maps.Map(document.getElementById('map-canvas'),
	mapOptions);

function MapyMarker(){
	this.markerInstance = '';
	this.lat = '';
	this.lng = '';
	this.title = '';
}

MapyMarker.prototype.create(markerLat, markerLng, title){
	this.lat = markerLat;
	this.lng = markerLng;
	this.title = title;
	this.markerInstance = function createMapMarker() {
		var myLatlng = new google.maps.LatLng(this.lat,this.lng);
		
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: _map,
			title:this.title
		});
		
		return marker;
	}
}

		
function picture(){
	this.id ;
	this.title;
	this.description;
	this.url;
	this.marker = MapyMarker();
}


picture.prototype.coords = function(lat, lng) {
	this.coords['lat'] = lat;
	this.coords['lng'] = lng;
}

picture.prototype.create = function() {
	this.id = '';
	this.title ='';
	this.url = '';
	this.marker = '';
}




 function createMapMarker() {
	var myLatlng = new google.maps.LatLng(this.lat,this.lng);
	
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: _map,
		title:this.title
	});
	
	return marker;

	//marker.setMap(_map);
	
	//google.maps.event.addListener(marker, 'click', function() {
	//	_map.setZoom(12);
	//	_map.setCenter(marker.getPosition());
});


function getInfo() {

//var exifParser = require('../index');

//var buf = require('fs').readFileSync(process.argv[2]);

	var reader = new FileReader();
	reader.onload = function(){
		  var bufferData = reader.result;
		  console.log(bufferData);
		  Parse(bufferData);
	};
	var selected_file =  reader.readAsArrayBuffer(document.getElementById('uploadInput').files[0]);
};

function Parse(bufferData){
	var parser = window.ExifParser.create(bufferData);
	var result = parser.parse();

	var photoLat = result.tags['GPSLatitude'];
	var photoLng = result.tags['GPSLongitude'];

	if(typeof(photoLat) != "undefined" && typeof(photoLat) != "undefined"){
			console.log('good:' + photoLat + ', ' + photoLng);
			var myMapMarker = new MapyMarker(photoLat, photoLng, "Some Title")
			createMapMarker(myMapMarker);
	}
};


Group.prototype = function () {
    var operator = null,
        operatorSet = false,
        equalsPressed = false,
        lastNumber = null,

        add = function (x, y) {
            return x + y;
        },
        calculate = function (thisObj) {
       
        };

    return {
        
		
    };
} ();