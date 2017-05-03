const bc = require('./index');

module.exports.updateFiles = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  return bc.run().nodeify(err => callback(err, response));
};
