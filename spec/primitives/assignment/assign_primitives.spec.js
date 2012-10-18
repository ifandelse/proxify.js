describe( 'Proxify - Assigning Primitives', function () {

	var subject = {
		name : "",
		year : 0,
		president : undefined
	};

	describe( 'When proxying simple object with primitives', function () {

		var proxy;
		var events;

		beforeEach( function () {
			events = [];
			proxy = proxify( subject, "person" );
			proxy._observe( function ( evnt ) {
				events.push( evnt );
			} );
		} );

		it( 'assigning name (string) should generate an event', function () {
			proxy.name = "George Washington";
			expect( events.length ).to.be( 1 );
			expect( events[0] ).to.eql( {
				"event" : "assignment",
				"namespace" : "person.name",
				"member" : "name",
				oldValue : "",
				newValue : "George Washington"
			} );
		} );

		it( 'assigning year (integer) should generate an event', function () {
			proxy.year = 1789;
			expect( events.length ).to.be( 1 );
			expect( events[0] ).to.eql( {
				"event" : "assignment",
				"namespace" : "person.year",
				"member" : "year",
				oldValue : 0,
				newValue : 1789
			} );
		} );

		it( 'assigning president (bool) should generate an event', function () {
			proxy.president = true;
			expect( events.length ).to.be( 1 );
			expect( events[0] ).to.eql( {
				"event" : "assignment",
				"namespace" : "person.president",
				"member" : "president",
				oldValue : undefined,
				newValue : true
			} );
		} );

	} );

} );