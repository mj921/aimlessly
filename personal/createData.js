const data = require('./personalData.js');
const link = require('./link.js');
const fs = require('fs');

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
  if (toNum === 0) {
    item.itemStyle.borderWidth = 2;
    item.itemStyle.color = '#000000';
    item.itemStyle.borderColor = '#000000';
  }
  if (item.flag) {
    item.itemStyle.borderWidth = 2;
    item.itemStyle.borderColor = '#ff00ff';
  }
  if (item.symbolSize > 20) {
    item.itemStyle.color = '#ff0000';
  } else if (item.symbolSize > 15) {
    item.itemStyle.color = '#ff00ff';
    if (item.flag) {
      item.itemStyle.borderColor = '#00ff00';
    }
  } else if (item.symbolSize > 13) {
    item.itemStyle.color = '#00ff00';
  }
})

fs.writeFileSync('./data.js', 'const data = ' + JSON.stringify(data));