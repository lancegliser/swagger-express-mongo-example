'use strict';
// var util = require('util');

module.exports = {
  getAll: getAllCustomers,
  get: getCustomer,
  create: createCustomer,
  update: updateCustomer,
  delete: deleteCustomer
};

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function getAllCustomers(request, response) {
  response.json('TODO');
}


/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function getCustomer(request, response) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = request.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  response.json(hello);
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function createCustomer(request, response) {
  response.json('TODO');
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function updateCustomer(request, response) {
  response.json('TODO');
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function deleteCustomer(request, response) {
  response.json('TODO');
}

