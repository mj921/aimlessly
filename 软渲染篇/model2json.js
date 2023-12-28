const { log } = require('console');
const fs = require('fs');

const lines = fs.readFileSync('african_head.obj').toString().split('\n');
const vList = [];
const vtList = [];
const vnList = [];
const fList = [];
lines.forEach((el) => {
  const arr = el.split(/\s+/);
  if (arr[0] === 'f') {
    fList.push(
      arr.slice(1, 4).map((item) => item.split('/').map((ele) => +ele - 1))
    );
  } else if (arr[0] === 'v') {
    vList.push(arr.slice(1, 4).map((item) => +item));
  } else if (arr[0] === 'vt') {
    vtList.push(arr.slice(1, 4).map((item) => +item));
  } else if (arr[0] === 'vn') {
    vnList.push(arr.slice(1, 4).map((item) => +item));
  }
});
fs.writeFileSync(
  'modelJson.js',
  `const modelJson = ` +
    JSON.stringify({ v: vList, vn: vnList, vt: vtList, f: fList })
);
