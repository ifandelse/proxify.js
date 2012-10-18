var wrap = function ( subject, target, memberName, nsAccessor, event ) {
	Object.defineProperty( target, memberName, {
		set : function ( value ) {
			// check if it's not a primitive and wrap it if so
			var oldValue = subject[memberName];
			subject[memberName] = value;
			target._notify( {
				event: event || "assignment",
				namespace: nsAccessor(),
				member:memberName,
				oldValue: oldValue,
				newValue: value
			});
		},
		get : function () {
			target._notify( {
				event: event || typeof subject[memberName] === 'function' ? "invocation" : "read",
				namespace: nsAccessor(),
				member: memberName
			});
			return subject[memberName];
		},
		enumerable : true,
		configurable : true
	} );
};

var behavior = {
	'object' : function ( subject, target, memberName, nsAccessor ) {
		var temp = {};
		temp[memberName] = crawlObject( subject[memberName], nsAccessor );
		wrap( temp, target, memberName, nsAccessor );
		temp[memberName]._observe(target._notify, target);
	},
	'array' : function ( subject, target, memberName, nsAccessor ) {
		var temp = {};
		temp[memberName] = crawlArray( subject[memberName], nsAccessor );
		wrap( temp, target, memberName, nsAccessor );
		temp[memberName]._observe(target._notify, target);
	},
	'function' : function ( subject, target, memberName, nsAccessor ) {
		wrap( subject, target, memberName, nsAccessor );
	},
	'primitive' : function ( subject, target, memberName, nsAccessor ) {
		wrap( subject, target, memberName, nsAccessor );
	}
};

var getMemberType = function ( member ) {
	return typeof member === 'function' ? 'function'
		: _.isArray( member ) ? 'array'
		       : _.isObject( member ) ? 'object' : 'primitive';
};

var crawlObject = function ( subject, nsAccessor ) {
	var _target = _.extend( {}, new Emitter() );
	var member;
	for ( member in subject ) {
		(function(memberName) {
			behavior[getMemberType( subject[memberName] )](
				subject,
				_target,
				memberName,
				function() {
					return nsAccessor() + "." + memberName;
				}
			);
		}(member));
	}
	return _target;
};

//import("arrayCrawler.js");

var proxify = function ( subject, namespace ) {
	if(!namespace) {
		throw new Error("You must provide a namespace to mark the root of the object you are proxifying. And, yes, 'proxifying' is a word. Promise.")
	}
	return crawlObject(
		subject,
		typeof namespace === 'function' ? namespace : function() { return namespace; }
	);
};