var Logger = function() {
	error: function(message, location, data) {
		console.log('[ERROR] [' + location + '] ' + message + ' ' + data)

	},

	info: function(message, location, data) {
		console.log('[ERROR] [' + location + '] ' + message + ' ' + data)
	}
};