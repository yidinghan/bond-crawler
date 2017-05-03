const bc = require('./index');

exports.update = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'successfully!',
    }),
  };

  return bc.run().nodeify(err => callback(err, response));
};
