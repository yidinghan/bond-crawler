const rq = require('request-promise');
const Promise = require('bluebird');

const sites = require('./sites');

exports.run = async () => {
  await Promise.all([sites.sse.run(), sites.szse.run()]);
};

if (!module.parent) {
  exports.run();
}
