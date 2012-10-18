describe( 'Proxify - Reading Arrays Containing Objects', function () {

	var subject = {
		members : [
			{}, {}, {}, {}
			//{ name : "John",   instruments : ['guitar', 'keys', 'vocals']         },
			//{ name : "Paul",   instruments : ['guitar', 'bass', 'keys', 'vocals'] },
			//{ name : "Ringo",  instruments : ['drums', 'vocals']                  },
			//{ name : "George", instruments : ['guitar', 'sitar', 'vocals']        }
		]
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

	/*
	###############################################################
						ASSIGNING ARRAY ELEMENTS
	###############################################################
	*/
	it( 'assigning index 0 should generate two events', function () {
		track = true;
		proxy.members[0] = { name : "John", instruments : ['guitar', 'keys', 'vocals'] };
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1].event ).to.be("assignment");
		expect( events[1].namespace ).to.be("beatles.members.0");
		expect( events[1].member ).to.be(0);
		expect( events[1].oldValue ).to.have.property("_callbacks");
		expect( events[1].oldValue ).to.have.property("_observe");
		expect( events[1].oldValue ).to.have.property("_notify");
		var strippedOldValue = _.extend({}, events[1].oldValue);
		delete strippedOldValue._callbacks;
		delete strippedOldValue._observe;
		delete strippedOldValue._notify;
		expect( strippedOldValue ).to.eql({});
		expect( events[1].newValue ).to.eql({ name : "John", instruments : ['guitar', 'keys', 'vocals'] });
	} );

	it( 'assigning index 1 should generate two events', function () {
		track = true;
		proxy.members[1] = { name : "Paul",   instruments : ['guitar', 'bass', 'keys', 'vocals'] };
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1].event ).to.be("assignment");
		expect( events[1].namespace ).to.be("beatles.members.1");
		expect( events[1].member ).to.be(1);
		expect( events[1].oldValue ).to.have.property("_callbacks");
		expect( events[1].oldValue ).to.have.property("_observe");
		expect( events[1].oldValue ).to.have.property("_notify");
		var strippedOldValue = _.extend({}, events[1].oldValue);
		delete strippedOldValue._callbacks;
		delete strippedOldValue._observe;
		delete strippedOldValue._notify;
		expect( strippedOldValue ).to.eql({});
		expect( events[1].newValue ).to.eql({ name : "Paul",   instruments : ['guitar', 'bass', 'keys', 'vocals'] });
	} );

	it( 'assigning index 2 should generate two events', function () {
		track = true;
		proxy.members[2] = { name : "Ringo",  instruments : ['drums', 'vocals'] };
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1].event ).to.be("assignment");
		expect( events[1].namespace ).to.be("beatles.members.2");
		expect( events[1].member ).to.be(2);
		expect( events[1].oldValue ).to.have.property("_callbacks");
		expect( events[1].oldValue ).to.have.property("_observe");
		expect( events[1].oldValue ).to.have.property("_notify");
		var strippedOldValue = _.extend({}, events[1].oldValue);
		delete strippedOldValue._callbacks;
		delete strippedOldValue._observe;
		delete strippedOldValue._notify;
		expect( strippedOldValue ).to.eql({});
		expect( events[1].newValue ).to.eql({ name : "Ringo",  instruments : ['drums', 'vocals'] });
	} );

	it( 'assigning index 3 should generate two events', function () {
		track = true;
		proxy.members[3] = { name : "George", instruments : ['guitar', 'sitar', 'vocals'] };
		track = false;
		expect( events.length ).to.be( 2 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1].event ).to.be("assignment");
		expect( events[1].namespace ).to.be("beatles.members.3");
		expect( events[1].member ).to.be(3);
		expect( events[1].oldValue ).to.have.property("_callbacks");
		expect( events[1].oldValue ).to.have.property("_observe");
		expect( events[1].oldValue ).to.have.property("_notify");
		var strippedOldValue = _.extend({}, events[1].oldValue);
		delete strippedOldValue._callbacks;
		delete strippedOldValue._observe;
		delete strippedOldValue._notify;
		expect( strippedOldValue ).to.eql({});
		expect( events[1].newValue ).to.eql({ name : "George", instruments : ['guitar', 'sitar', 'vocals'] });
	} );

	/*
	 ###############################################################
					READING NAMES ON ARRAY ELEMENTS
	 ###############################################################
	 */
	/*it( 'reading index 0.name should generate three events', function () {
		track = true;
		var x = proxy.members[0].name;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.name",
			"member" : "name"
		} );
	} );

	it( 'reading index 1.name should generate three events', function () {
		track = true;
		var x = proxy.members[1].name;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.name",
			"member" : "name"
		} );
	} );

	it( 'reading index 2.name should generate three events', function () {
		track = true;
		var x = proxy.members[2].name;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.name",
			"member" : "name"
		} );
	} );

	it( 'reading index 3.name should generate three events', function () {
		track = true;
		var x = proxy.members[3].name;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3",
			"member" : "3"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.name",
			"member" : "name"
		} );
	} );*/

	/*
	 ###############################################################
				READING INSTRUMENTS ON ARRAY ELEMENTS
	 ###############################################################
	 */
	/*it( 'reading index 0.instruments should generate three events', function () {
		track = true;
		var x = proxy.members[0].instruments;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments",
			"member" : "instruments"
		} );
	} );

	it( 'reading index 1.instruments should generate three events', function () {
		track = true;
		var x = proxy.members[1].instruments;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments",
			"member" : "instruments"
		} );
	} );

	it( 'reading index 2.instruments should generate three events', function () {
		track = true;
		var x = proxy.members[2].instruments;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.instruments",
			"member" : "instruments"
		} );
	} );

	it( 'reading index 3.instruments should generate three events', function () {
		track = true;
		var x = proxy.members[3].instruments;
		track = false;
		expect( events.length ).to.be( 3 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3",
			"member" : "3"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments",
			"member" : "instruments"
		} );
	} );*/

	/*
	  ###############################################################
		READING INSTRUMENTS ARRAY ELEMENTS ON MEMBER ARRAY ELEMENTS
	  ###############################################################
	*/
	/*it( 'reading members[0].instruments[0] should generate three events', function () {
		track = true;
		var x = proxy.members[0].instruments[0];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments.0",
			"member" : "0"
		} );
	} );

	it( 'reading members[0].instruments[1] should generate three events', function () {
		track = true;
		var x = proxy.members[0].instruments[1];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments.1",
			"member" : "1"
		} );
	} );

	it( 'reading members[0].instruments[2] should generate three events', function () {
		track = true;
		var x = proxy.members[0].instruments[2];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0",
			"member" : "0"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.0.instruments.2",
			"member" : "2"
		} );
	} );

	it( 'reading members[1].instruments[0] should generate three events', function () {
		track = true;
		var x = proxy.members[1].instruments[0];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments.0",
			"member" : "0"
		} );
	} );

	it( 'reading members[1].instruments[1] should generate three events', function () {
		track = true;
		var x = proxy.members[1].instruments[1];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments.1",
			"member" : "1"
		} );
	} );

	it( 'reading members[1].instruments[2] should generate three events', function () {
		track = true;
		var x = proxy.members[1].instruments[2];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments.2",
			"member" : "2"
		} );
	} );

	it( 'reading members[1].instruments[3] should generate three events', function () {
		track = true;
		var x = proxy.members[1].instruments[3];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1",
			"member" : "1"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.1.instruments.3",
			"member" : "3"
		} );
	} );

	it( 'reading members[2].instruments[0] should generate three events', function () {
		track = true;
		var x = proxy.members[2].instruments[0];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.instruments.0",
			"member" : "0"
		} );
	} );

	it( 'reading members[2].instruments[1] should generate three events', function () {
		track = true;
		var x = proxy.members[2].instruments[1];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2",
			"member" : "2"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.2.instruments.1",
			"member" : "1"
		} );
	} );

	it( 'reading members[3].instruments[0] should generate three events', function () {
		track = true;
		var x = proxy.members[3].instruments[0];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3",
			"member" : "3"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments.0",
			"member" : "0"
		} );
	} );

	it( 'reading members[3].instruments[1] should generate three events', function () {
		track = true;
		var x = proxy.members[3].instruments[1];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3",
			"member" : "3"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments.1",
			"member" : "1"
		} );
	} );

	it( 'reading members[3].instruments[2] should generate three events', function () {
		track = true;
		var x = proxy.members[3].instruments[2];
		track = false;
		expect( events.length ).to.be( 4 );
		expect( events[0] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members",
			"member" : "members"
		} );
		expect( events[1] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3",
			"member" : "3"
		} );
		expect( events[2] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments",
			"member" : "instruments"
		} );
		expect( events[3] ).to.eql( {
			"event" : "read",
			"namespace" : "beatles.members.3.instruments.2",
			"member" : "2"
		} );
	} );*/
} );