test = require('tape');
Backbone = require('backbone');
Stackbone = require('..');

var onError = sinon.spy();

test('Stackbone', function (t) {
  t.test('reports errors in model event listeners', function (t) {

    Stackbone.start({
      Backbone: Backbone,
      jQuery: jQuery,
      onError: onError
    });

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

  t.test('can supress thrown errors in model event listeners', function (t) {

    Stackbone.start({
      Backbone: Backbone,
      jQuery: jQuery,
      onError: onError,
      swallowErrors: true
    });

    var model = new Backbone.Model({a: 1});
    model.on('change', function() {
      throw new Error('panic');
    });

    t.plan(1);

    try {
      model.set({a: 2});
      t.ok(onError.called, "onError() called but no exception thrown");
    } catch (err) {
      t.fail("The error was not caught");
    }

    t.end();
  });

  t.end();
});