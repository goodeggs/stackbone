test = require('tape');
Backbone = require('backbone');
Stackbone = require('..');

var onError = sinon.spy();
Stackbone.start({
  Backbone: Backbone,
  jQuery: jQuery,
  onError: onError
});

test('Stackbone', function (t) {
  t.test('reports errors in model event listeners', function (t) {
    var model = new Backbone.Model({a: 1});
    model.on('change', function() {
      throw new Error('panic');
    });

    t.plan(2);

    try {
      model.set({a: 2});
    } catch (err) {
      t.equal(err.message, 'panic', "error thrown");
    }

    t.ok(onError.called, "onError() called");
    t.end();
  });

  t.end();
});