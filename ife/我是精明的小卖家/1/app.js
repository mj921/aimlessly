const regionOptions = ['华东', '华南', '华北'];
const productOptions = ['手机', '笔记本', '智能音箱'];
const tableColumn = [
  '商品',
  '地区',
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];
let regionList = [];
let productList = [];
const baseTable = new BaseTable({
  ele: document.getElementById('table'),
  column: tableColumn,
  data: sourceData,
});
const filterData = () => {
  const list = sourceData.filter(
    (el) =>
      (productList.length === 0 || productList.includes(el.product)) &&
      (regionList.length === 0 || regionList.includes(el.region))
  );
  list.sort((a, b) =>
    (regionList.length === 1 ? a.region > b.region : a.product > b.product)
      ? 1
      : -1
  );
  const rowspan =
    (regionList.length === 1 ? productList.length : regionList.length) || 3;
  baseTable.renderTable(
    list,
    regionList.length === 1 ? '地区' : '商品',
    rowspan
  );
};
filterData();
new BaseCheckbox({
  options: regionOptions,
  ele: document.getElementById('regionCheckbox'),
  name: 'region',
  label: '地区',
  change: (val) => {
    regionList = val;
    filterData();
  },
});

new BaseCheckbox({
  options: productOptions,
  ele: document.getElementById('productCheckbox'),
  name: 'product',
  label: '商品',
  change: (val) => {
    productList = val;
    filterData();
  },
});
