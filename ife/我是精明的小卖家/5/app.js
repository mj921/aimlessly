const dataSource = localStorage.getItem('sourceData')
  ? JSON.parse(localStorage.getItem('sourceData'))
  : sourceData;
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
const hashParams = location.search
  .slice(1)
  .split('&')
  .reduce((o, el) => {
    const arr = el.split('=');
    return {
      ...o,
      [arr[0]]: arr[1],
    };
  }, {});
let regionList = hashParams.region
  ? regionOptions.filter((el, i) => hashParams.region[i] === '1')
  : [];
let productList = hashParams.product
  ? productOptions.filter((el, i) => hashParams.product[i] === '1')
  : [];
const parseData = (data) => {
  const list = [];
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < 12; i++) {
    list.push({
      label: tableColumn[i + 2],
      data: [],
    });
  }
  data.forEach(({ region, product, sale }) => {
    for (let i = 0; i < 12; i++) {
      max = Math.max(max, sale[i]);
      min = Math.min(min, sale[i]);
      list[i].data.push({
        label: `${region}-${product}`,
        value: sale[i],
      });
    }
  });
  return {
    list,
    max,
    min,
  };
};

const line = new BaseLine({
  ele: document.getElementById('line'),
  data: parseData(dataSource),
  width: 750,
});
const baseTable = new BaseTable({
  ele: document.getElementById('table'),
  column: tableColumn,
  data: dataSource,
  onValueChange: (val, key) => {
    const [regionKey, productKey, iKey] = key.split('-');
    dataSource.find(
      ({ region, product }) => region === regionKey && product === productKey
    ).sale[iKey] = +val;
    filterData();
    localStorage.setItem('sourceData', JSON.stringify(dataSource));
  },
});
const filterData = () => {
  const list = dataSource.filter(
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
  line.update(parseData(list));
};
const hashChange = () => {
  const regionParam = regionOptions.reduce(
    (s, el) => s + (regionList.includes(el) ? '1' : '0'),
    ''
  );
  const productParam = productOptions.reduce(
    (s, el) => s + (productList.includes(el) ? '1' : '0'),
    ''
  );
  history.pushState(
    { region: regionParam, product: productParam },
    '',
    `${location.href.replace(
      /\?[^?]*$/,
      ''
    )}?region=${regionParam}&product=${productParam}`
  );
};
filterData();
const regionCheckbox = new BaseCheckbox({
  options: regionOptions,
  ele: document.getElementById('regionCheckbox'),
  name: 'region',
  label: '地区',
  defaultValue: [...regionList],
  change: (val) => {
    regionList = val;
    hashChange();
    filterData();
  },
});

const productCheckbox = new BaseCheckbox({
  options: productOptions,
  ele: document.getElementById('productCheckbox'),
  name: 'product',
  label: '商品',
  defaultValue: [...productList],
  change: (val) => {
    productList = val;
    hashChange();
    filterData();
  },
});
window.addEventListener('hashchange', (e) => {
  const params = getHashParams();
});

window.addEventListener('popstate', (e) => {
  const newRegionList = e.state?.region
    ? regionOptions.filter((el, i) => e.state.region[i] === '1')
    : [];
  newRegionList.sort();
  const newProductList = e.state?.product
    ? productOptions.filter((el, i) => e.state.product[i] === '1')
    : [];
  newProductList.sort();
  regionList.sort();
  productList.sort();
  if (regionList.join('') !== newRegionList.join('')) {
    regionCheckbox.render(newRegionList);
    regionList = newRegionList;
    filterData();
  } else if (productList.join('') !== newProductList.join('')) {
    productCheckbox.render(newProductList);
    productList = newProductList;
    filterData();
  }
});
