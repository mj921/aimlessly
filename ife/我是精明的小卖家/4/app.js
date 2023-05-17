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
const getHashParams = () =>
  location.hash
    .slice(1)
    .split('&')
    .reduce((o, el) => {
      const arr = el.split('=');
      return {
        ...o,
        [arr[0]]: arr[1],
      };
    }, {});
const hashParams = getHashParams();
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
  const regionHash = regionOptions.reduce(
    (s, el) => s + (regionList.includes(el) ? '1' : '0'),
    ''
  );
  const productHash = productOptions.reduce(
    (s, el) => s + (productList.includes(el) ? '1' : '0'),
    ''
  );
  location.hash = `region=${regionHash}&product=${productHash}`;
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
  const newRegionList = params.region
    ? regionOptions.filter((el, i) => params.region[i] === '1')
    : [];
  newRegionList.sort();
  const newProductList = params.product
    ? productOptions.filter((el, i) => params.product[i] === '1')
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
