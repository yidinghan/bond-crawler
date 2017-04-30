const template = require('lodash.template');

module.exports = (data = [], payload = {}) => {
  let keys = [];
  if (payload.select) {
    keys = payload.select;
  } else {
    const [head] = data;
    keys = Object.keys(head);
  }

  const headLine = keys.join();
  const tpl = template(keys.map(key => `<%= ${key} %>`).join());

  const csv = [headLine];
  data.forEach((information) => {
    csv.push(tpl(information));
  });

  return csv.join('\n');
};
