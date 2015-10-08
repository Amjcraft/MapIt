define(["./canvas"], function (Canvas) {

var _myWorker = new SharedWorker("ImageProcessHandler.js");
_myWorker.port.start();  // called in parent thread



var startSharedWorker = function () {
    _myWorker.port.addEventListener("message", function (e) {
        console.log(e.data);
    }, false);
    _myWorker.port.start();
}


var closeSharedWorker = function () {
    _myWorker.port.close();
}

var createWorkerCallback = function () {
    
}

var callWorker = function (data) {
    _myWorker.port.postMessage(data);
}


return {
    StartSharedWorker: function () {
        return startSharedWorker();
    },
    EndSharedWorker: function () {
        return closeSharedWorker();
    },
    CreateWorkerCallback: function () {
        return createWorkerCallback();
    },
    CallWorker: function (data) {
        return callWorker(data);
    }
}
});
