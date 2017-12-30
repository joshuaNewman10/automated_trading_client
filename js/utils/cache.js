var Cache = function() {
};

Cache.prototype.set = function(key, value) {
		window.localStorage.setItem(key, value)

};

Cache.prototype.get = function(key) {
		return window.localStorage.getItem(key)
};