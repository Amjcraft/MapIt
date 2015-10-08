$(document).on("newUpload", newUploadHandler);


$(document).ready(function(){
	$('#navNext').click(function(){
		nextPicture();
	});
	
	$('#navPrev').click(function(){
		prevPicture();
	});
});


function newUploadHandler(e) {
	getfiles(e.e);
};

	var validatedFiles = [];
	
	
	function updateSize() {
	  var nBytes = 0,
		  oFiles = document.getElementById("uploadInput").files,
		  nFiles = oFiles.length;
	  for (var nFileId = 0; nFileId < nFiles; nFileId++) {
		nBytes += oFiles[nFileId].size;
	  }
	  var sOutput = nBytes + " bytes";
	  // optional code for multiples approximation
	  for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
		sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
	  }
	  // end of optional code
	  document.getElementById("fileNum").innerHTML = nFiles;
	  document.getElementById("fileSize").innerHTML = sOutput;
		
	} 
	
	
		var mapOptions = {
			  center: { lat: 29.231666666666666, lng: -103.33416666666666},
			  zoom: 8
		};

		var _map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

		
		var markers = [];
		
	/*function addMapMarkers() {
		for (var i = 0; i < markers.length; i++) {
		var currentMarker = markers[i];
		var myLatlng = new google.maps.LatLng(this.lat,this.lng);
			
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: _map,
				title:this.title
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				var canvas = document.createElement('canvas');
				return loadyImage(orginalPictureCollection[currentMarker.pictureID],600, 500, canvas, false, 'Random NAme');
			}(currentMarker));
	  }
  }*/
	
	//google.maps.event.addDomListener(window, 'load', initialize);
	
	$('#thumblist img').data('id')
	
	function MapyMarker(){
		this.markerInstance = '';
		this.lat = '';
		this.lng = '';
		this.title = '';
		this.pictureID = '';
	}

	MapyMarker.prototype.setCoords = function(markerLat, markerLng){
		this.lat = markerLat;
		this.lng = markerLng;
	}

	MapyMarker.prototype.setTitle = function(title){
		this.title = title;
	}

	MapyMarker.prototype.setPictureID = function(picID){
		this.pictureID = picID;
	}
	
	MapyMarker.prototype.setMarkerInstance = function(marker){
		this.markerInstance= marker;
	}
	

	
	MapyMarker.prototype.createInstance = function(){
			var currentMarker = this;
			var myLatlng = new google.maps.LatLng(this.lat,this.lng);
			
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: _map,
				title:this.title
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				var canvas = document.createElement('canvas');
				var myFunc = function loadyImage(){
					//loadModalImage(orginalPictureCollection[currentMarker.pictureID],600, 500, canvas, false, 'Random NAme');
					loadModalImage("jpeg", "Some Random NAme", currentMarker.pictureID);
				};
				
				
				return myFunc;
			}(currentMarker));
			
			/* Zoom click on google map marker
			google.maps.event.addListener(marker, 'click', function() {
				_map.setZoom(Math.ceil(_map.getZoom() * 1.2));
				_map.setCenter(marker.getPosition());
			});
			*/
			markers.push(this);
			this.setMarkerInstance(marker);
	}
	
		
function Media(){
	this.id = '';
	this.title = '';
	this.description = '';
	this.url = '';
	this.marker = '';
}

Media.prototype.setMarker = function(mapyMarkerInstance) {
	this.marker = mapyMarkerInstance;
}

function Picture() {
  Media.call(this); // call super constructor.
}	
	
var pics = []; //Temp pics array will need to create an array obj
var orginalPictureCollection = []; //Temp Orginal Pictures FIle Array. Will need to refactor. Look into rereading buffer array.


// subclass extends superclass
Picture.prototype = Object.create(Media.prototype);
Picture.prototype.constructor = Picture;

	function Parse(bufferData){
	
	var pic = new Picture();
	var parser = window.ExifParser.create(bufferData);
	var result = parser.parse();

	var photoLat = result.tags['GPSLatitude'];
	var photoLng = result.tags['GPSLongitude'];
		
		if(typeof(photoLat) != "undefined" && typeof(photoLat) != "undefined"){
				var mapMarker = new MapyMarker();
				mapMarker.setCoords(photoLat, photoLng);
				mapMarker.setPictureID(addToPictureCollection(pic));
				//mapMarker.setLoadImage(loadImage('file', 'width', 'height', 'canvas', 'isThumb', 'filename'));
				mapMarker.createInstance();
				pic.setMarker = mapMarker;
				
				console.log(mapMarker);
				console.log(pic);
		}
		
	
	/*Object.keys(result.tags).forEach(function(name) {
		console.log(name+': ' + result.tags[name]);
		
	});
	*/
	};
	
	function addToPictureCollection(pic) {
		var picID = 0;
		if (typeof(pic) != 'undefined') {
			pics.push(pic);
			picID = pics.length; //Create obj arrar for pics and method/var for current count
		}
		return picID - 1;
	}
	
	//var s  = document.querySelector('#filedrag');
  var o  = document.querySelector('#imagePane');
  var t  = document.querySelector('#thumbslist');
  //var c  = document.createElement('canvas');
  //var cx = c.getContext('2d');
  var thumbwidth = 100;
  var thumbheight = 100;
  var crop = false;
  var background = 'white';
  var jpeg = false;
  var quality = 0.8;
 
  //r.addEventListener('click', purgethumbs, false);

  function init() {
    if (typeof FileReader !== 'undefined') {
      document.body.classList.add('dragdrop');
      
      o.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t.tagName === 'IMG') {
          while (t.tagName !== 'LI') {
            t = t.parentNode;
          }
          t.parentNode.removeChild(t);
        }
      }, false );
   
    }
  }
	

  function getfiles(ev) {
    o.classList.add('doingit');
    var files = ev.dataTransfer.files,
        url = window.URL || window.webkitURL,
        objURL = url.createObjectURL || false;
	
	fileCount = files.length;
	
	$.each(files, function(index, file){
		var bufferReader = new FileReader();
		//var dataReader = new FileReader();
		bufferReader.onload = function() {
			  var bufferData = bufferReader.result;
			  console.log(bufferData);
			  Parse(bufferData);
		};

		bufferReader.readAsArrayBuffer(file);
		
		 if(objURL) {
		 var canvas = document.createElement('canvas');
		 var canvas2 = document.createElement('canvas');
          loadImage(url.createObjectURL(file),125, 100, canvas, true, file.name);//Return Blob as a GUID Attached
		  cropImage(url.createObjectURL(file), 600, 500, canvas2);
		  
		  
        } else {
          /*var reader = new FileReader();
          reader.readAsDataURL( file );
          reader.onload = function ( ev ) {
            loadImage(ev.target.result,file.name);
          }
		  */
		  console.log('Line 354 Error')
		 }
	});
	
    ev.preventDefault();
  }
  
  
	function cropImage(file, width, height, canvas) {
	var img = new Image();
    img.src = file;
    img.onload = function() {
		var dimensions = resize( img.width, img.height, width, height );
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, dimensions.x, dimensions.y, dimensions.w, dimensions.h);
		orginalPictureCollection.push(canvas.toDataURL("image/jpeg"));
	}
		
	}
  function loadImage(file, width, height, canvas, isThumb, filename) {
    var img = new Image();
    img.src = file;
    img.onload = function() {
      imagetocanvas( this, width, height, canvas, isThumb, filename);
    };
  }
  
 
  
  function imagetocanvas( img, width, height, canvas, isThumb, filname) {
    canvas.width = width;
    canvas.height = height;
    var dimensions = resize( img.width, img.height, width, height );
    /*if ( crop ) {
      c.width = dimensions.w;
      c.height = dimensions.h;
      dimensions.x = 0;
      dimensions.y = 0;
    }
    if ( background !== 'transparent') {
      cx.fillStyle = background;
      cx.fillRect ( 0, 0, thumbwidth, thumbheight );
    }
	*/
    canvas.getContext('2d').drawImage(
      img, dimensions.x, dimensions.y, dimensions.w, dimensions.h
    );
	
	if (isThumb) {
		addtothumbslist( jpeg, quality, filname, canvas );
	} else {
		addToCanvas(jpeg, quality, filname, canvas)
	}
  }
  
  var currentModalItem = '';
  
  function nextPicture(){
	loadModalImage("jpeg", "Random Name", currentModalItem + 1);
  }
	
	function prevPicture(){
	loadModalImage("jpeg", "Random Name", currentModalItem - 1);
  }
  
  function loadModalImage(jpeg, name, picID) {
  
	currentModalItem = picID;
	
    var thumb = new Image();
    thumb.src = orginalPictureCollection[picID];
    var thumbname = name.split('.');
    thumbname = thumbname[0] + '_tn.' + (jpeg ? 'jpg' : thumbname[1]);
    thumb.title = thumbname +' ' + Math.round(orginalPictureCollection[picID].length / 1000 * 100) / 100 + ' KB';
    thumb.setAttribute('data-filename', thumbname);
    var item = document.createElement('li');
    var textlabel = document.createElement('span');
    textlabel.innerHTML = thumb.title;
    item.appendChild(thumb);
    item.appendChild(textlabel);
    $('.modal-inner').html(item);
	$('#myModal').modal('show');
  }
 /* 
   function addToCanvas(jpeg, quality, name, canvas) {
    var thumb = new Image(),
        url = jpeg ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL();
    thumb.src = url;
    var thumbname = name.split('.');
    thumbname = thumbname[0] + '_tn.' + (jpeg ? 'jpg' : thumbname[1]);
    thumb.title = thumbname +' ' + Math.round(url.length / 1000 * 100) / 100 + ' KB';
    thumb.setAttribute('data-filename', thumbname);
    var item = document.createElement('li');
    var textlabel = document.createElement('span');
    textlabel.innerHTML = thumb.title;
    item.appendChild(thumb);
    item.appendChild(textlabel);
    $('.modal-body').html(item);
	$('#myModal').modal('show');
  }
  */
  
  
  function addtothumbslist(jpeg, quality, name, canvas) {
    var thumb = new Image(),
        url = jpeg ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL();
    thumb.src = url;
    var thumbname = name.split('.');
    thumbname = thumbname[0] + '_tn.' + (jpeg ? 'jpg' : thumbname[1]);
    thumb.title = thumbname +' ' + Math.round(url.length / 1000 * 100) / 100 + ' KB';
    thumb.setAttribute('data-filename', thumbname);
    var item = document.createElement('li');
    var textlabel = document.createElement('span');
    textlabel.innerHTML = thumb.title;
    item.appendChild(thumb);
    item.appendChild(textlabel);
    t.appendChild(item);
  }
  
  function purgethumbs() {
    t.innerHTML = '';
	
  }
  
  function zipit() {
    var zip = new JSZip();
    var imgs = o.querySelectorAll('img');
    var allimgs = imgs.length;
    while (allimgs--) {
      zip.file(
        imgs[allimgs].getAttribute('data-filename'),
        imgs[allimgs].src.substr(imgs[allimgs].src.indexOf(',') + 1),
        { base64: true }
      );
    }
    saveAs(
      zip.generate({type: 'blob'}),
      'thumbnails.zip'
    );
  }

  function resize( imagewidth, imageheight, thumbwidth, thumbheight ) {
    var w = 0, h = 0, x = 0, y = 0,
        widthratio  = imagewidth / thumbwidth,
        heightratio = imageheight / thumbheight,
        maxratio    = Math.max( widthratio, heightratio );
    if ( maxratio > 1 ) {
        w = imagewidth / maxratio;
        h = imageheight / maxratio;
    } else {
        w = imagewidth;
        h = imageheight;
    }
    x = ( thumbwidth - w ) / 2;
    y = ( thumbheight - h ) / 2;
    return { w:w, h:h, x:x, y:y };
  }
  init();