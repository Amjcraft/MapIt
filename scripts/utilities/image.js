define(["./canvas"], function (Canvas) {
    var resizeDimensions = function (imagewidth, imageheight, thumbwidth, thumbheight) {
        var w = 0, h = 0, x = 0, y = 0,
            widthratio = imagewidth / thumbwidth,
            heightratio = imageheight / thumbheight,
            maxratio = Math.max(widthratio, heightratio);
        if (maxratio > 1) {
            w = imagewidth / maxratio;
            h = imageheight / maxratio;
        } else {
            w = imagewidth;
            h = imageheight;
        }
        x = (thumbwidth - w) / 2;
        y = (thumbheight - h) / 2;
        return { w: w, h: h, x: x, y: y }
    };

    var createThumbnail = function (objectUrl, width, height) {
        var img = new Image(),
            canvas = Canvas.GetThumbnailCanvas();
        img.src = objectUrl;
        img.onload = function () {
            var dimensions = Util.Image.ResizeDimensions(img.width, img.height, width, height);
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, dimensions.x, dimensions.y, dimensions.w, dimensions.h);
        }
    };

    return {
        ResizeDimensions: function (imagewidth, imageheight, thumbwidth, thumbheight) {
            return resizeDimensions(imagewidth, imageheight, thumbwidth, thumbheight);
        },
        CreateThumbnail: function (canvasContext, width, height) {
            return createThumbnail(canvasContext, width, height);
        }
    }
});
