describe( 'Proxify - Assigning Arrays Containing Primitives', function () {

	describe( 'Arrays Containing Strings', function () {
		var subject = {
			names : ['G', 'R', 'P', 'J']
		};

		var proxy;
		var events;
		var track = false;

		beforeEach( function () {
			events = [];
			proxy = proxify( subject, "beatles" );
			proxy._observe( function ( evnt ) {
				console.log( evnt );
				if ( track ) {
					events.push( evnt );
				}
			} );
		} );

		it( 'assigning index 0 should generate two events', function () {
			track = true;
			var x = proxy.names[0] = 'George';
			track = false;
			expect( events.length ).to.be( 2 );
			expect( events[0] ).to.eql( {
				"event"     : "read",
				"namespace" : "beatles.names",
				"member"    : "names"
			} );
			expect( events[1] ).to.eql( {
				"event"     : "assignment",
				"namespace" : "beatles.names.0",
				"member"    : "0",
				"oldValue"  : "G",
				"newValue"  : "George"
			} );
		} );

		it( 'assigning index 1 should generate two events', function () {
			track = true;
			var x = proxy.names[1] = 'Ringo';
			track = false;
			expect( events.length ).to.be( 2 );
			expect( events[0] ).to.eql( {
				"event"     : "read",
				"namespace" : "beatles.names",
				"member"    : "names"
			} );
			expect( events[1] ).to.eql( {
				"event"     : "assignment",
				"namespace" : "beatles.names.1",
				"member"    : "1",
				"oldValue"  : "R",
				"newValue"  : "Ringo"
			} );
		} );

		it( 'assigning index 2 should generate two events', function () {
			track = true;
			var x = proxy.names[2] = 'Paul';
			track = false;
			expect( events.length ).to.be( 2 );
			expect( events[0] ).to.eql( {
				"event"     : "read",
				"namespace" : "beatles.names",
				"member"    : "names"
			} );
			expect( events[1] ).to.eql( {
				"event"     : "assignment",
				"namespace" : "beatles.names.2",
				"member"    : "2",
				"oldValue"  : "P",
				"newValue"  : "Paul"
			} );
		} );

		it( 'assigning index 3 should generate two events', function () {
			track = true;
			var x = proxy.names[3] = 'John';
			track = false;
			expect( events.length ).to.be( 2 );
			expect( events[0] ).to.eql( {
				"event"     : "read",
				"namespace" : "beatles.names",
				"member"    : "names"
			} );
			expect( events[1] ).to.eql( {
				"event"     : "assignment",
				"namespace" : "beatles.names.3",
				"member"    : "3",
				"oldValue"  : "J",
				"newValue"  : "John"
			} );
		} );
	} );

} );