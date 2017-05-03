const Promise = require('bluebird');

const sites = require('./sites');

exports.run = () =>
  Promise.all([sites.sse.run(), sites.szse.run()]).then(() => {
    process.exit(0);
  });

if (!module.parent) {
  exports.run();
}
