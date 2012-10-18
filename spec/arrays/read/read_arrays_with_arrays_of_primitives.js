describe( 'Proxify - Reading Arrays Containing Arrays of Primitives', function () {

	var subject = {
		items : [
			[1,2,3],
		    ['a','b','c'],
		    [true, true, false]
		]
	};

	var proxy;
	var events;
	var track = false;

	beforeEach( function () {
		events = [];
		proxy = proxify( subject, "lists" );
		proxy._observe( function ( evnt ) {
			console.log( evnt );
			if ( track ) {
				events.push( evnt );
			}
		} );
	} );

	/*
	 ###############################################################
						READING ARRAY ELEMENTS
	 ###############################################################
	 */
	it( 'reading items[0] should generate two events', function () {
		track = true;
		var x = proxy.items[0];
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0",
			"member" : "0"
		} );
	} );

	it( 'reading items[0][0] should generate three events', function () {
		track = true;
		var x = proxy.items[0][0];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0.0",
			"member" : "0"
		} );
	} );

	it( 'reading items[0][1] should generate three events', function () {
		track = true;
		var x = proxy.items[0][1];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0.1",
			"member" : "1"
		} );
	} );

	it( 'reading items[0][2] should generate three events', function () {
		track = true;
		var x = proxy.items[0][2];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.0.2",
			"member" : "2"
		} );
	} );

	it( 'reading items[1] should generate two events', function () {
		track = true;
		var x = proxy.items[1];
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1",
			"member" : "1"
		} );
	} );

	it( 'reading items[1][0] should generate three events', function () {
		track = true;
		var x = proxy.items[1][0];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1.0",
			"member" : "0"
		} );
	} );

	it( 'reading items[1][1] should generate three events', function () {
		track = true;
		var x = proxy.items[1][1];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1.1",
			"member" : "1"
		} );
	} );

	it( 'reading items[1][2] should generate three events', function () {
		track = true;
		var x = proxy.items[1][2];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.1.2",
			"member" : "2"
		} );
	} );

	it( 'reading items[2] should generate two events', function () {
		track = true;
		var x = proxy.items[2];
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2",
			"member" : "2"
		} );
	} );

	it( 'reading items[2][0] should generate three events', function () {
		track = true;
		var x = proxy.items[2][0];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2.0",
			"member" : "0"
		} );
	} );

	it( 'reading items[2][1] should generate three events', function () {
		track = true;
		var x = proxy.items[2][1];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2.1",
			"member" : "1"
		} );
	} );

	it( 'reading items[2][2] should generate three events', function () {
		track = true;
		var x = proxy.items[2][2];
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items",
			"member" : "items"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "lists.items.2.2",
			"member" : "2"
		} );
	} );
} );