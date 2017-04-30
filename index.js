const rq = require('request-promise');
const Promise = require('bluebird');

const sites = require('./sites');

exports.run = async () => {
  await Promise.all([sites.sse.run(), sites.szse.run()]);
  process.exit(0);
};

if (!module.parent) {
  exports.run();
}
