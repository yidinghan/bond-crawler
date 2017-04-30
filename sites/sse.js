const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const rq = require('request-promise');

const config = require('../config').sse;
const toCsv = require('../to_csv');

const getApiData = () => {
  const opts = {
    uri: config.project,
    qs: {
      jsonCallBack: 'jsonpCallback39996',
      sqlId: 'COMMON_SSE_ZCZZQXMLB',
      bond_type: '0',
      // 'pageHelp.pageSize': 10,
      // isPagination: 'true',
    },
    headers: {
      Referer: 'http://bond.sse.com.cn/bridge/information/',
    },
    transform: body => JSON.parse(/{.*}/.exec(body)[0]),
  };

  return rq(opts);
};

exports.run = async () => {
  const { result } = await getApiData();

  result.forEach((information) => {
    const { AUDIT_STATUS, SHORT_NAME } = information;

    information.AUDIT_STATUS = config.audit_status_transfer[AUDIT_STATUS];
    information.SHORT_NAME = SHORT_NAME.replace(/,/g, ';');
    // hard code
    // cuz only request this kind of type in api
    information.BOND_TYPE = '小公募';
  });

  const csv = toCsv(result, {
    select: config.select,
    translate: config.translate,
  });

  await fs.writeFileAsync('sse.csv', csv);

  return 0;
};
