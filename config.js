exports.sse = {
  project: 'http://query.sse.com.cn/commonQuery.do',
  select: [
    'AUDIT_NAME',
    'SHORT_NAME',
    'BOND_TYPE',
    'PLAN_ISSUE_AMOUNT',
    'AUDIT_STATUS',
    'PUBLISH_DATE',
  ],
  translate: {
    BOND_NUM: '3883',
    CSRC_CODE: 'a',
    AREA: '地区',
    SHORT_NAME: '承销商/管理人',
    AUDIT_NAME: '债券名称',
    LIST1: '大连万达商业地产股份有限公司',
    PLAN_ISSUE_AMOUNT: '拟发行金额（亿元）',
    LIST2: '中信建投证券股份有限公司,招商证券股份有限公司,华融证券股份有限公司',
    BOND_TYPE: '债券品种',
    AUDIT_STATUS: '项目状态',
    WEN_HAO: '-',
    SEC_NAME: ' ',
    LIST22: '78170345-3,19223854-9,71093501-1',
    PUBLISH_DATE: '2017-04-28',
    LIST11: '74093396-5',
  },
  audit_status_transfer: {
    1: '已受理',
    2: '已反馈',
    3: '已接收反馈意见',
    4: '通过',
    5: '未通过',
    8: '终止',
    9: '中止',
    10: '已回复交易所意见',
  },
};

exports.szse = {
  project: 'http://www.szse.cn/main/ints/xmjdxx/xgm/',
};
