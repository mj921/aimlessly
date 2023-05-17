const BaseTable = function ({ ele, column, data }) {
  this.ele = ele;
  this.tableColumn = column;
  this.data = data;
};
BaseTable.prototype.renderTable = function (
  data,
  firstColumn = '商品',
  rowspan = 1
) {
  let before = '';
  this.ele.innerHTML = `<table><thead>${[
    firstColumn,
    firstColumn === '商品' ? '地区' : '商品',
    ...this.tableColumn.slice(2),
  ]
    .map((el) => `<th>${el}</th>`)
    .join('')}</thead><tbody>${data
    .map(({ product, region, sale }) => {
      const firstEl = firstColumn === '商品' ? product : region;
      const currRowspan = before === firstEl ? 0 : rowspan;
      before = firstEl;
      return `<tr>${
        currRowspan === 0 ? '' : `<td rowspan="${currRowspan}">${firstEl}</td>`
      }<td>${firstColumn === '商品' ? region : product}</td>${sale
        .map((item) => '<td>' + item + '</td>')
        .join('')}</tr>`;
    })
    .join('')}</tbody></table>`;
};
