const rq = require('request-promise');
const fs = require('fs');

const config = require('../config');
const toCsv = require('../to_csv');

const getApiData = () => {
  const opts = {
    url: config.url,
    qs: {
      jsonCallBack: 'jsonpCallback39996',
      sqlId: 'COMMON_SSE_ZCZZQXMLB',
      bond_type: '0',
    },
    headers: {
      Referer: 'http://bond.sse.com.cn/bridge/information/',
    },
  };

  return rq(opts);
};

exports.run = async () => {
  const { result } = await getApiData();

  const csv = toCsv(result);

  await fs.writeFile('../sse.csv', csv);

  return 0;
};
