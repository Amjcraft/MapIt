define( function() {

    var _mainCanvas,
        _thumbCanvas;

    var createDocumentCanvas = function () {
         return document.createElement('canvas');
    };

    var getMainCanvas = function () {
        if (typeof(_mainCanvas) == 'undefined') {
            _mainCanvas = createDocumentCanvas('mainCanvas');
        }
        return _mainCanvas;
    };

    var getThumbnailCanvas = function () {
        if (typeof(_thumbCanvas) == 'undefined') {
            _thumbCanvas = createDocumentCanvas('thumbCanvas');
        }
        return _thumbCanvas;
    }

    return {
        GetMainCanvas: function () {
            return getMainCanvas();
        },
        GetThumbnailCanvas: function () {
        return getThumbnailCanvas();
    }
    }
});