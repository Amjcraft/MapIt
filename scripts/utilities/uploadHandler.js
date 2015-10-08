define(["./image", "./canvas", "./webworkers"], function (ImageUtil, CanvasUtil, WorkerUtil) {
    var createManageableImage = function (objectUrl, width, height) {
        var img = new Image(),
            canvas = CanvasUtil.GetMainCanvas();
        img.src = objectUrl;
        img.onload = function () {

            var dimensions = ImageUtil.ResizeDimensions(img.width, img.height, width, height);
           
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, dimensions.x, dimensions.y, dimensions.w, dimensions.h);

            var thumbnail = CanvasUtil.GetThumbnailCanvas();
            dimensions = ImageUtil.ResizeDimensions(img.width, img.height, 100, 60);
            thumbnail.width = 125;
            thumbnail.height = 100;
            var thumbnailctx = thumbnail.getContext("2d");
            thumbnailctx.drawImage(img, dimensions.x, dimensions.y, dimensions.w, dimensions.h);
        }
    };

    var parseFileMetadata = function (files) {
        fileCount = files.length;

        $.each(files, function (index, file) {
            var bufferReader = new FileReader();
            //var dataReader = new FileReader();
            bufferReader.onload = function () {
                var bufferData = bufferReader.result;
                console.log(bufferData);
                //Parse(bufferData);
            };
            bufferReader.readAsArrayBuffer(file);
        })
    };

    var getFiles = function(ev) {
        //o.classList.add('doingit'); Add an Inprocess Loading Function that fires an event when complete 
        var files = ev.dataTransfer.files,
            url = window.URL || window.webkitURL,
            objURL = url.createObjectURL || false;

        fileCount = files.length;
        WorkerUtil.StartSharedWorker();
        $.each(files, function (index, file) {
            //Add Web Worker that takes in the files, creates our manageable image and thumbnail, dose our parsing stuff
            if (objURL) {
                //loadImage(url.createObjectURL(file), 125, 100, canvas, true, file.name);//Return Blob as a GUID Attached
                WorkerUtil.CallWorker(file);
                createManageableImage(url.createObjectURL(file), 600, 500);
               

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
        WorkerUtil.EndSharedWorker();
        ev.preventDefault();
    }

    return {
        GetFiles: function (event) {
            return getFiles(event);
        }
    }
});