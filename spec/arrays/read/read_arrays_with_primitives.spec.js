describe('Proxify - Arrays Containing Primitives', function () {

  describe('Arrays Containing Strings', function(){
    var subject = {
      names: ['George', 'Ringo', 'Paul', 'John']
    };

    var proxy;
    var events;
    var track = false;

    beforeEach(function () {
      events = [];
      proxy = proxify(subject, "beatles");
      proxy._observe(function (evnt) {
        console.log(evnt);
        if(track)
          events.push(evnt);
      });
    });

    it('reading index 0 should generate two events', function () {
      track = true;
      var x = proxy.names[0];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names",
        "member" : "names"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names.0",
        "member" : "0"
      });
    });

    it('reading index 1 should generate an event', function () {
      track = true;
      var x = proxy.names[1];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names",
        "member" : "names"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names.1",
        "member" : "1"
      });
    });

    it('reading index 2 should generate an event', function () {
      track = true;
      var x = proxy.names[2];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names",
        "member" : "names"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "beatles.names.2",
        "member" : "2"
      });
    });
  });

  describe('Arrays Containing Floats', function(){
    var subject = {
      numbers: [134.456,456.32104,7890.55544477789]
    };

    var proxy;
    var events;
    var track = false;

    beforeEach(function () {
      events = [];
      proxy = proxify(subject, "test");
      proxy._observe(function (evnt) {
        console.log(evnt);
        if(track)
          events.push(evnt);
      });
    });

    it('reading index 0 should generate two events', function () {
      track = true;
      var x = proxy.numbers[0];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.0",
        "member" : "0"
      });
    });

    it('reading index 1 should generate an event', function () {
      track = true;
      var x = proxy.numbers[1];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.1",
        "member" : "1"
      });
    });

    it('reading index 2 should generate an event', function () {
      track = true;
      var x = proxy.numbers[2];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.2",
        "member" : "2"
      });
    });
  });

  describe('Arrays Containing Booleans', function(){
    var subject = {
      values: [true, true, false]
    };

    var proxy;
    var events;
    var track = false;

    beforeEach(function () {
      events = [];
      proxy = proxify(subject, "test");
      proxy._observe(function (evnt) {
        console.log(evnt);
        if(track)
          events.push(evnt);
      });
    });

    it('reading index 0 should generate two events', function () {
      track = true;
      var x = proxy.values[0];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.values",
        "member" : "values"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.values.0",
        "member" : "0"
      });
    });

    it('reading index 1 should generate an event', function () {
      track = true;
      var x = proxy.values[1];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.values",
        "member" : "values"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.values.1",
        "member" : "1"
      });
    });

    it('reading index 2 should generate an event', function () {
      track = true;
      var x = proxy.values[2];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.values",
        "member" : "values"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.values.2",
        "member" : "2"
      });
    });
  });

  describe('Arrays Containing Integers', function(){
    var subject = {
      numbers: [134,456,7890]
    };

    var proxy;
    var events;
    var track = false;

    beforeEach(function () {
      events = [];
      proxy = proxify(subject, "test");
      proxy._observe(function (evnt) {
        console.log(evnt);
        if(track)
          events.push(evnt);
      });
    });

    it('reading index 0 should generate two events', function () {
      track = true;
      var x = proxy.numbers[0];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.0",
        "member" : "0"
      });
    });

    it('reading index 1 should generate an event', function () {
      track = true;
      var x = proxy.numbers[1];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.1",
        "member" : "1"
      });
    });

    it('reading index 2 should generate an event', function () {
      track = true;
      var x = proxy.numbers[2];
      track = false;
      expect(events.length).to.be(2);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers",
        "member" : "numbers"
      });
      expect(events[1]).to.eql({
        "event" : "read",
        "namespace" : "test.numbers.2",
        "member" : "2"
      });
    });
  });

});