var Emitter = function() {
	this._callbacks = [];
};

Emitter.prototype._observe = function(callback, context) {
	var self = this;
	var def = { fn: callback, context: context };
	self._callbacks.push(def);
	return function() {
		self._callbacks = _.without(self._callbacks, def);
	}
};

Emitter.prototype._notify = function() {
	var args = Array.prototype.slice.call(arguments, 0);
	_.each(this._callbacks, function(def) {
		def.fn.apply(def.context, args);
	});
};