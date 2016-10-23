const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const mongoose = require('mongoose');

// Use es6 style promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/swagger-rest-api-example');

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});

module.exports = app; // for testing

