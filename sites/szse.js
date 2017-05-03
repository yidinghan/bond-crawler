const rq = require('request-promise');
const cheerio = require('cheerio');
const zipObject = require('lodash.zipobject');
const iconv = require('iconv-lite');

const config = require('../config').szse;
const toCsv = require('../to_csv');
const upload = require('../upload');

const getApiData = () => {
  const opts = {
    method: 'POST',
    uri: config.project,
    form: {
      ACTIONID: 7,
      AJAX: 'AJAX-TRUE',
      CATALOGID: 'xmjdxx',
      TABKEY: 'tab1',
      selectZqlb: 0,
      tab1PAGENO: 1,
      // tab1PAGECOUNT: 34,
      // tab1RECORDCOUNT: 340,
      tab1PAGESIZE: 10000,
      REPORT_ACTION: 'navigate',
    },
    transform: (body) => {
      const utf8String = iconv.decode(body, 'gb2312');

      return cheerio.load(utf8String);
    },
    timeout: 20 * 1000,
    encoding: null,
  };

  return rq(opts);
};

const getData = ($body) => {
  const selector = '#REPORTID_tab1 > tr';

  return Array.from($body(selector))
    .map((tr) => {
      const $tr = cheerio.load(tr);
      const informationArray = Array.from($tr('td'))
        .map((td) => {
          const $td = cheerio.load(td);
          return $td.text();
        })
        .slice(1);

      return zipObject(config.select, informationArray);
    })
    .slice(1);
};

const formatData = data =>
  data.map((information) => {
    const { short_name } = information;

    information.short_name = short_name.replace(/,/g, ';');
    // hard code
    // cuz only request this kind of type in api
    information.bond_type = '小公募';

    return information;
  });

exports.run = () =>
  getApiData()
    .then(($body) => {
      const data = formatData(getData($body));

      const csv = toCsv(data, {
        select: config.select,
        translate: config.translate,
      });

      return upload('szse.csv', csv);
    });
