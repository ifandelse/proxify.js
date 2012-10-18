describe('Proxify - Reading Primitives', function () {

  var subject = {
    name : "George Washington",
    year : 1789,
    president : true
  };

  describe('When proxying simple object with primitives', function () {

    var proxy;
    var events;

    beforeEach(function () {
      events = [];
      proxy = proxify(subject, "person");
      proxy._observe(function (evnt) {
        events.push(evnt);
      });
    });

    it('reading name (string) should generate an event', function () {
      var x = proxy.name;
      expect(events.length).to.be(1);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "person.name",
        "member" : "name"
      });
    });

    it('reading year (integer) should generate an event', function () {
      var x = proxy.year;
      expect(events.length).to.be(1);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "person.year",
        "member" : "year"
      });
    });

    it('reading president (bool) should generate an event', function () {
      var x = proxy.president;
      expect(events.length).to.be(1);
      expect(events[0]).to.eql({
        "event" : "read",
        "namespace" : "person.president",
        "member" : "president"
      });
    });

  });

});