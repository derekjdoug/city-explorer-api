'use strict';

function handleError(error, request, response) {
  response.status(500).send(`Uh oh. Server error during API call: ${error.customMessage}`);
}

module.exports = handleError;
