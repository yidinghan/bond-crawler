const AWS = require('aws-sdk');

const config = require('./config').s3;

const S3 = new AWS.S3();

const upload = (filename, body) => {
  const options = {
    Bucket: config.bucket,
    Key: filename,
    Body: body,
  };

  return S3.upload(options).promise();
};

module.exports = upload;
