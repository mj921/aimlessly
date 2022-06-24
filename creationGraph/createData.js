const combinationData = require('./combination.json');
const goodsData = require('./goods.json');
const fs = require('fs');

const link = combinationData.reduce((arr, item) => {
  arr.push({
    source: item.origin[0],
    target: item.result,
    type: item.origin[1],
  })
  if (item.origin[0] !== item.origin[1]) {
    arr.push({
      source: item.origin[1],
      target: item.result,
      type: item.origin[0],
    })
  }
  return arr;
}, []);

const data = goodsData;
const colors = ['#d3d3d3', '#808080', '#6a5acd', '#3cb371', '#1e90ff', '#ee82ee', '#ffa500', '#ff6347', '#000000']
const colorSizes = [9, 12, 18, 27, 39, 54, 72, 93, 117];

data.forEach(item => {
  let fromNum = 0;
  let toNum = 0;
  item.symbolSize = link.reduce((size, el) => {
    if (el.source === item.name) {
      fromNum++;
    }
    if (el.target === item.name) {
      toNum++;
    }
    return(el.source === item.name || el.target === item.name) ? size + 1 : size;
  }, 10);
  item.itemStyle = item.itemStyle || {}
  if (item.prop === '最终') {
    item.itemStyle.borderWidth = Math.max(2, Math.floor(item.symbolSize * 0.2));
    item.itemStyle.borderColor = '#000000';
  }
  if (item.prop === '基础') {
    item.itemStyle.borderWidth = Math.max(2, Math.floor(item.symbolSize * 0.2));
    item.itemStyle.borderColor = '#ff0000';
  }
  let i = colorSizes.length - 1;
  while (i > 0 && item.symbolSize <= colorSizes[i]) {
    i--;
  }
  item.itemStyle.color = colors[i];
})

fs.writeFileSync('./data.js', 'const data = ' + JSON.stringify(data));
fs.writeFileSync('./link.js', 'const links = ' + JSON.stringify(link));