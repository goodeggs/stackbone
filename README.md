Stackbone
=========

Uncaught exception logging with stack traces for Backbone apps.  Works by intercepting, logging, and rethrowing errors at common Backbone stack roots.

[![browser support](https://ci.testling.com/goodeggs/stackbone.png)](https://ci.testling.com/goodeggs/stackbone)

    Stackbone = require('stackbone'); // optional

    Stackbone.start({
      Backbone: Backbone
      jQuery: jQuery
      onError: function (err) {
        // ... log the error ...
      }
    });

Hacking
-------

    npm install && npm test

