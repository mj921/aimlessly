/** ---------- Util start ---------- */

const extend = function (subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType; // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
};

/** ---------- Util end ---------- */

/** ---------- Scene start ---------- */
/** 场景 */
const Scene = function (options) {
  const { el, width, height } = options;
  if (el) {
    this.canvas = document.getElementById(el);
  } else {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
  }
  this.width = width;
  this.height = height;
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext('2d');
  this.imageData = this.ctx.createImageData(width, height);
};

/**
 * 添加到场景
 * @param {Sprite} sprite
 */
Scene.prototype.add = function ({ x, y, color = [0, 0, 0, 255] }) {
  const index = 4 * Math.floor(x) + 4 * this.width * Math.floor(y);
  for (let i = 0; i < 4; i++) {
    this.imageData.data[index + i] = color[i];
  }
};
Scene.prototype.render = function () {
  this.ctx.putImageData(this.imageData, 0, 0);
};

window.Scene = Scene;
