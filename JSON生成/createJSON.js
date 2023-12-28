// const reg = /\{\{([a-zA-Z]+)(?:\((?:([^,\s]+),)*\s*([^\)]+))?\)\}\}/
const reg = /\{\{([a-zA-Z]+)(?:\(([^\)]*)\))?\}\}/;

const CreateJSONUtil = {
  number: (min, max) =>
    typeof max === 'number'
      ? Math.random() * (max - min) + min
      : Math.random() * min,
  integer: (min, max) => Math.floor(CreateJSONUtil.number(min, max)),
  word: (min, max) => {
    let len = typeof max === 'number' ? CreateJSONUtil.integer(min, max) : min;
    let str = '';
    while (len--) {
      str += String.fromCharCode(CreateJSONUtil.integer(0, 26) + 97);
    }
    return str;
  },
  name: () => {
    const str = CreateJSONUtil.word(3, 7);
    return str[0].toUpperCase() + str.slice(1);
  },
  percentage: (min, max) => CreateJSONUtil.integer(min, max) + '%',
  repeat: (min, max) =>
    typeof max === 'number' ? CreateJSONUtil.integer(min, max) : min,
  email: () => `${CreateJSONUtil.word(5, 12)}@${CreateJSONUtil.word(2, 8)}.com`,
  random: (...list) => {
    return list.length ? list[CreateJSONUtil.integer(list.length)] : '';
  },
  boolean: () => Math.random() < 0.5
};

const execute = (typeName, paramStr) => {
  console.log(typeName, paramStr);
  const params = paramStr
    ? paramStr.split(/\s*,\s*/).map((el) => {
        let item = el.replace(/(^\s*|\s*$)/g, '');
        if (/^\d*.\d*$/.test(item)) {
          return +item;
        }
        return item.replace(/(^["']|["']$)/g, '');
      })
    : [];
  if (CreateJSONUtil[typeName]) {
    return CreateJSONUtil[typeName](...params);
  }
  return '';
};

const createJSON = (jsonObj, index) => {
  if (Array.isArray(jsonObj)) {
    if (jsonObj.length < 2) {
      return [];
    }
    let list = [];
    let repeatNum = 1;
    if (/\{\{repeat\((\d+,\s*)?\d\)\}\}/.test(jsonObj[0])) {
      const [, typeName, paramStr] = jsonObj[0].match(reg);
      repeatNum = execute(typeName, paramStr);
    }
    while (--repeatNum) {
      list.push(createJSON(jsonObj[1]));
    }
    return list;
  } else if (typeof jsonObj === 'string') {
    return jsonObj.replace(/\{\{[^\}]+\}\}/g, ($0) => {
      const [, typeName, paramStr] = $0.match(reg);
      return execute(typeName, paramStr);
    });
  } else {
    let json = {};
    for (let key in jsonObj) {
      if (typeof jsonObj[key] === 'string') {
        json[key] = jsonObj[key].replace(/\{\{[^\}]+\}\}/g, ($0) => {
          console.log($0);
          const [, typeName, paramStr] = $0.match(reg);
          return execute(typeName, paramStr);
        });
      } else if (typeof jsonObj[key] === 'function') {
        json[key] = jsonObj[key].call(json, CreateJSONUtil);
      } else if (typeof jsonObj[key] === 'object') {
        json[key] = createJSON(jsonObj[key]);
      } else {
        json[key] = jsonObj[key];
      }
    }
    return json;
  }
};
