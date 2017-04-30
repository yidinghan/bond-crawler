const Promise = require('bluebird');

const sites = require('./sites');

exports.run = async () => {
  try {
    await Promise.all([sites.sse.run(), sites.szse.run()]);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
};

if (!module.parent) {
  exports.run();
}
