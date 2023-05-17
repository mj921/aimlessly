const BaseTable = function ({ ele, column, data, onValueChange = () => {} }) {
  this.ele = ele;
  this.tableColumn = column;
  this.data = data;
  this.onValueChange = onValueChange;
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
        .map(
          (item, i) =>
            `<td data-key="td-${`${region}-${product}-${i}`}"><span data-key="${`${region}-${product}-${i}`}">${item}</span></td>`
        )
        .join('')}</tr>`;
    })
    .join('')}</tbody></table>`;
  const spans = this.ele.querySelectorAll('span');
  spans.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = e.target.dataset.key;
      const td = this.ele.querySelector(`[data-key=td-${key}]`);
      const div = document.createElement('div');
      div.style.height = '22px';
      const ipt = document.createElement('input');
      ipt.value = e.target.innerText;
      ipt.style.width = '80px';
      ipt.style.height = '16px';
      ipt.addEventListener('blur', (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
      });
      const outsitClick = () => {
        cancel();
        window.removeEventListener('click', outsitClick);
      };
      window.addEventListener('click', outsitClick);
      const cancel = () => {
        td.removeChild(div);
        el.style.display = 'inline';
      };
      const confirm = () => {
        el.innerText = ipt.value.replace(/[^\d]/g, '');
        this.onValueChange(el.innerText, key);
        cancel();
      };
      ipt.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      ipt.addEventListener('keyup', (e) => {
        switch (e.code) {
          case 'Enter':
            confirm();
            break;
          case 'Escape':
            cancel();
            break;
        }
      });
      const confirmBtn = document.createElement('button');
      confirmBtn.style.height = '22px';
      el.style.display = 'none';
      confirmBtn.innerText = '确定';
      confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        confirm();
      });
      const cancelBtn = document.createElement('button');
      cancelBtn.style.height = '22px';
      cancelBtn.innerText = '取消';
      cancelBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cancel();
      });
      div.appendChild(ipt);
      div.appendChild(confirmBtn);
      div.appendChild(cancelBtn);
      td.appendChild(div);
    });
  });
};
