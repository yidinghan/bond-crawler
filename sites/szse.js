const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const rq = require('request-promise');
const cheerio = require('cheerio');

const config = require('../config').szse;
const toCsv = require('../to_csv');

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
      // tab1PAGESIZE: 10000,
      tab1PAGESIZE: 5,
      REPORT_ACTION: 'navigate',
    },
    transform: body => cheerio.load(body),
  };

  return rq(opts);
};

const getData = ($body) => {
  const selector = '#REPORTID_tab1 > tr';

  return Array.from($body(selector)).map((tr) => {
    const $tr = cheerio.load(tr);
    return Array.from($tr('td')).map((td) => {
      const $td = cheerio.load(td);
      return $td.text();
    });
  });
};

exports.run = async () => {
  const $body = await getApiData();
  const [, ...data] = getData($body);
  console.log(data);
};
