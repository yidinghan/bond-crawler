const Promise = require('bluebird');

const sites = require('./sites');

exports.run = () => Promise.all([sites.sse.run(), sites.szse.run()]);

if (!module.parent) {
  exports.run().then(() => {
    console.log('OK');
    process.exit(0);
  });
}
