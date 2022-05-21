'use strict';

function handleError(error, request, response) {
  console.log(error);
  response.status(500).send(`Uh oh. Server error during API call: ${error.customMessage}`);
}

module.exports = handleError;
