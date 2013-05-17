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

    try {
      model.set({a: 2});
    } catch (err) {
      // expected, swallow it
    }

    t.ok(onError.called);
    t.end();
  });

  t.end();
});