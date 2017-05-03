const AWS = require('aws-sdk');
const Promise = require('bluebird');

const config = require('./config').s3;

AWS.config.setPromisesDependency(Promise);
const S3 = new AWS.S3();

const upload = (filename, body) => {
  const options = {
    Bucket: config.bucket,
    Key: filename,
    Body: body,
    ACL: 'public-read',
  };

  return S3.upload(options).promise();
};

const list = () => {
  const options = {
    Bucket: config.bucket,
    EncodingType: 'url',
  };

  return S3.listObjectsV2(options).promise().tap(({ Contents }) => {
    Contents.forEach((content) => {
      content.Url = `https://${config.bucket}.s3.amazonaws.com/${content.Key}`;
    });
  });
};

module.exports = {
  S3,
  upload,
  list,
};
