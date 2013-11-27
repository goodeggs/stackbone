(function (root) {
  var Stackbone;

  // Support CommmonJS or global namespace
  if (typeof exports !== 'undefined') {
    Stackbone = exports;
  } else {
    Stackbone = root.Stackbone = {};
  }

  function defaultOnError (err) {
    console.log(err && err.stack);
  }

  Stackbone.start = function (options) {
    var Backbone, jQuery, onError;

    options = options || {};
    Backbone = options.Backbone || root.Backbone;
    jQuery = options.jQuery || root.jQuery;
    onError = options.onError || defaultOnError;

    function interceptErrors (fn) {
      return function() {
        try {
          return fn.apply(this, arguments);
        } catch (err) {
          if(err && !err.intercepted) {
            err.intercepted = true;
            onError(err);
          }
          throw err;
        }
      };
    }

    // Intercept errors in Backbone event listeners
    Backbone.Router.prototype.trigger =
    Backbone.Model.prototype.trigger =
    Backbone.View.prototype.trigger =
    Backbone.Events.trigger = interceptErrors(Backbone.Events.trigger);

    // Intercept errors in jQuery event listeners including ajax
    var OriginalCallbacks = jQuery.Callbacks;
    jQuery.Callbacks = function () {
      var callbacks = OriginalCallbacks.apply(this, arguments);
      callbacks.fireWith = interceptErrors(callbacks.fireWith);
      return callbacks;
    };

    var originalJqueryDispatch = jQuery.event.dispatch;
    jQuery.event.dispatch = interceptErrors(originalJqueryDispatch);
  };
})(this);