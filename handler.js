const bc = require('./index');
const { list } = require('./s3');

const makeResponse = (callback, error, result) => {
  const statusCode = (error && error.statusCode) || 200;
  const body = {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result),
  };

  callback(error, body);
};

exports.update = (event, context, callback) => bc.run().nodeify(makeResponse.bind(null, callback));

exports.list = (event, context, callback) => list().nodeify(makeResponse.bind(null, callback));
