const AWS = require('aws-sdk');

const bc = require('./index');
const config = require('./config');

const S3 = new AWS.S3();

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

exports.list = (event, context, callback) => {
  S3.listObjectsV2({ Bucket: config.s3.bucket }, makeResponse.bind(null, callback));
};
