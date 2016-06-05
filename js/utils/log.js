var Logger = function() {
};

Logger.prototype.error = function(message, location, data) {
    console.log('[ERROR] [' + location + '] ' + message + ' ' + data)

};

Logger.prototype.info = function(message, location, data) {
    console.log('[INFO] [' + location + '] ' + message + ' ' + data)
};