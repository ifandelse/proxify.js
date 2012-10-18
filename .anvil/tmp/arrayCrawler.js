var crawlArray = function( subject, nsAccessor ) {
	var _target = Object.create(new Emitter());
	var crawlItem = function(item, idx){
		behavior[getMemberType( item )](
			subject,
			_target,
			idx,
			function() {
				return nsAccessor() + "." + idx;
			}
		);
	};
	var notifyLengthChange = function(oldLen, newLen) {
		_target._notify({
			event     : "change",
			namespace : nsAccessor() + ".length",
			member    : "length",
			oldValue  : oldLen,
			newValue  : newLen
		});
	};
	_.extend( _target, {
		push: function(item) {
			var oldLen = subject.length;
			subject.push(item);
			var len = subject.length - 1;
			crawlItem(item, len);
			_target._notify({
				event     : "push",
				namespace : nsAccessor() + "." + len,
				member    : len,
				value     : item
			});
			notifyLengthChange(oldLen, subject.length);
		},
		pop: function() {
			var oldLen = subject.length;
			subject.pop();
			var len = subject.length;
			var item = _target[len];
			delete _target[len];
			_target._notify({
				event     : "pop",
				namespace : nsAccessor() + "." + len,
				member    : len,
				value     : item
			});
			notifyLengthChange(oldLen, subject.length);
		}
	});
	_.each(subject, crawlItem);
	wrap( subject, _target, 'length', function() {
		return nsAccessor() + ".length";
	});
	return _target;
};