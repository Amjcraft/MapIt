
if (window.File && window.FileList && window.FileReader) {
	Init();
}

//
// initialize
function Init() {

	var uploadInput = $("#uploadInput"),
		filedrag = $("#filedrag"),
		submitbutton = $("#submit");

	// file select
	
	addEventListener('dragover', function (e) {
		e.preventDefault();
		FileDragHover(e);
	}, false );
	
	addEventListener('dragleave', function (e) {
		e.preventDefault();
		FileDragHover(e);
	}, false );
	
	addEventListener('drop', function (e) {
		e.preventDefault();
		uploadInputHandler(e);
	}, false );

	filedrag.css("display", "block");
		
		// remove submit button
	submitbutton.css("display", "none");
	}


// file drag hover
function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}


function uploadInputHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);
	
	$.event.trigger({
		type: "newUpload",
		e: e,
		time: new Date()
	});

}
