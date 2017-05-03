const sites = require('./sites');

const run = () =>
  Promise.all([sites.sse.run(), sites.szse.run()]).catch(console.error).then(() => {
    process.exit(0);
  });

if (!module.parent) {
  run();
}
