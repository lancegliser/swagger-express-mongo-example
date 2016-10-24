'use strict';
const Customer = require('../schemas/customer');
const Responses = require('../helpers/responses');

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
  // Transform incoming strings to regexes to run against their field
  let queryParams = Object.keys(request.query).reduce(function(params, key){
    params[key] = new RegExp(request.query[key], 'i');
    return params;
  }, {});
  Customer.find(queryParams, function(err, customers) {
    if (err){
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }

    response.json(customers);
  });
}


/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function getCustomer(request, response) {
  let id = request.swagger.params.id.value;
  Customer.findById(id, function(err, customer){
    if (err){
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!customer){
      response.status(404).send(Responses.getError({message: `Customer ${id} not found.`}));
      return;
    }

    response.json(customer);
  });
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function createCustomer(request, response) {
  Customer.create(request.body, function (err, customer) {
    customer.save(function(err){
      if (err){
        response.status(500).send(Responses.getError({message: err.message}));
        return;
      }

      response.json(customer);
    })
  });
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function updateCustomer(request, response) {
  let id = request.swagger.params.id.value;
  Customer.findById(id, function(err, customer) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!customer) {
      response.status(404).send(Responses.getError({message: `Customer ${id} not found.`}));
      return;
    }
    customer = Object.assign(customer, request.body);
    customer.save(id, function (err, customer) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }

      response.json(customer);
    });
  });
}

/**
 * @param {Object} request: a handle to the request object
 * @param {Object} response: a handle to the response object
 */
function deleteCustomer(request, response){
  let id = request.swagger.params.id.value;
  Customer.findById(id, function(err, customer) {
    if (err) {
      response.status(500).send(Responses.getError({message: err.message}));
      return;
    }
    if (!customer) {
      response.status(404).send(Responses.getError({message:  `Customer ${id} not found.`}));
      return;
    }
    customer.remove(id, function (err, customer) {
      if (err) {
        response.status(500).send(Responses.getError({message: err.message}));
      }

      response.json(Responses.getSuccess({message: `Customer ${id} deleted.`}));
    });
  });
}

