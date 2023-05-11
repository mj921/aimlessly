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
  const {
    el,
    width,
    height,
    originX = 0,
    originY = 0,
    scaleX = 1,
    scaleY = 1,
    rotate = 0,
  } = options;
  if (el) {
    this.canvas = document.getElementById(el);
  } else {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
  }
  this.canvas.width = width;
  this.canvas.height = height;
  this.ctx = this.canvas.getContext('2d');
  this.children = [];
  this.originX = originX;
  this.originY = originY;
  this.scaleX = scaleX;
  this.scaleY = scaleY;
  this.rotate = rotate;
};

/**
 * 添加到场景
 * @param {Sprite} sprite
 */
Scene.prototype.add = function (sprite) {
  this.children.push(sprite);
};
Scene.prototype.render = function () {
  const { ctx, originX, originY, scaleX, scaleY, rotate, children } = this;
  ctx.save();
  ctx.translate(originX, originY);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(rotate);
  if (!children || !Array.isArray(children)) return;
  children.forEach((sprite) => {
    sprite.render();
    const { canvas, x, y, width, height } = sprite;
    ctx.drawImage(canvas, x, y, width, height);
  });
  ctx.restore();
};

/** ---------- Scene end ---------- */

/** ---------- Sprite start ---------- */
/** 精灵 */
const Sprite = function (options) {
  const {
    el,
    width,
    height,
    x,
    y,
    type = Sprite.TYPE.GROUP,
    originX = 0,
    originY = 0,
    scaleX = 1,
    scaleY = 1,
    rotate = 0,
    fillColor = '#000',
    strokeColor = '#000',
  } = options;
  if (el) {
    this.canvas = document.getElementById(el);
  } else {
    this.canvas = document.createElement('canvas');
  }
  this.canvas.width = width;
  this.canvas.height = height;
  this.type = type;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.originX = originX;
  this.originY = originY;
  this.scaleX = scaleX;
  this.scaleY = scaleY;
  this.rotate = rotate;
  this.fillColor = fillColor;
  this.strokeColor = strokeColor;
  this.ctx = this.canvas.getContext('2d');
};
Sprite.TYPE = {
  GROUP: 'group',
  IMG: 'img',
  TEXT: 'text',
  RECT: 'rect',
  ARC: 'arc',
  CIRCLE: 'circle',
};
Sprite.MODE = {
  FILL: 'fill',
  STROKE: 'stroke',
};

Sprite.prototype.render = function () {
  const {
    ctx,
    originX,
    originY,
    scaleX,
    scaleY,
    rotate,
    fillColor,
    strokeColor,
  } = this;
  ctx.save();
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.translate(originX, originY);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(rotate);
  this.draw();
  ctx.restore();
};
Sprite.prototype.move = function ({ x = 0, y = 0 }) {
  this.x += x;
  this.y += y;
};
Sprite.prototype.moveTo = function ({ x = this.x, y = this.y }) {
  this.x = x;
  this.y = y;
};
Sprite.prototype.draw = function () {};
/** ---------- Sprite end ---------- */

/** ---------- Group start ---------- */
/** 组 */
const Group = function (options) {
  Sprite.call(this, { ...options, type: Sprite.TYPE.GROUP });
  this.children = [];
};
extend(Group, Sprite);
Group.prototype.add = function (sprite) {
  this.children.push(sprite);
};
Group.prototype.draw = function () {
  const { ctx, children } = this;
  if (!children || !Array.isArray(children)) return;
  children.forEach(({ canvas, x, y, width, height }) => {
    ctx.drawImage(canvas, x, y, width, height);
  });
};

/** ---------- Group end ---------- */

/** ---------- ImgSprite start ---------- */
/** 组 */
const ImgSprite = function (options) {
  Sprite.call(this, { ...options, type: Sprite.TYPE.IMG });
  const { img } = options;
  const {
    imgX = 0,
    imgY = 0,
    imgHeight = img ? img.width || 0 : 0,
    imgWidth = img ? img.height || 0 : 0,
  } = options;
  this.img = img;
  this.imgX = imgX;
  this.imgY = imgY;
  this.imgHeight = imgHeight;
  this.imgWidth = imgWidth;
};
extend(ImgSprite, Sprite);
ImgSprite.prototype.draw = function () {
  const { ctx, img, width, height, imgX, imgY, imgHeight, imgWidth } = this;
  ctx.drawImage(img, imgX, imgY, imgHeight, imgWidth, 0, 0, width, height);
};

/** ---------- ImgSprite end ---------- */

/** ---------- TextSprite start ---------- */
/** 文本 */
const TextSprite = function (options) {
  Sprite.call(this, { ...options, type: Sprite.TYPE.TEXT });
  const {
    text,
    fontSize,
    fontFamily,
    textAlign = TextSprite.TEXT_ALIGN.CENTER,
    textBaseLine = TextSprite.TEXT_BASE_LINE.MIDDLE,
    mode = Sprite.MODE.FILL,
  } = options;
  this.text = text;
  this.fontSize = fontSize;
  this.fontFamily = fontFamily;
  this.textAlign = textAlign;
  this.textBaseLine = textBaseLine;
  this.mode = mode;
};
extend(TextSprite, Sprite);
/** 文本的对齐方式的属性 */
TextSprite.TEXT_ALIGN = {
  /** 文本居中对齐 */
  CENTER: 'center',
  /** 文本左对齐 */
  LEFT: 'left',
  /** 文本右对齐 */
  RIGHT: 'right',
};
/** 当前文本基线的属性，决定文字垂直方向的对齐方式。 */
TextSprite.TEXT_BASE_LINE = {
  /** 文本基线在文本块的中间 */
  MIDDLE: 'middle',
  /** 文本基线在文本块的顶部 */
  TOP: 'top',
  /** 文本基线在文本块的底部。 */
  BOTTOM: 'bottom',
};
TextSprite.prototype.draw = function () {
  const {
    ctx,
    text,
    width,
    height,
    textAlign,
    textBaseLine,
    fontSize,
    fontFamily,
    mode,
  } = this;
  ctx.font = `${fontSize}px ${fontFamily}`;
  let x = 0;
  let y = 0;
  switch (textAlign) {
    case TextSprite.TEXT_ALIGN.CENTER:
      x = width / 2;
      break;
    case TextSprite.TEXT_ALIGN.RIGHT:
      x = width;
      break;
  }
  ctx.textAlign = textAlign;
  switch (textBaseLine) {
    case TextSprite.TEXT_BASE_LINE.MIDDLE:
      y = height / 2;
      break;
    case TextSprite.TEXT_BASE_LINE.BOTTOM:
      y = height;
      break;
  }
  ctx.textBaseLine = textBaseLine;
  if (mode === Sprite.MODE.FILL) {
    ctx.fillText(text, x, y, width, height);
  } else {
    ctx.strokeText(text, x, y, width, height);
  }
};

/** ---------- TextSprite end ---------- */

/** ---------- RectSprite start ---------- */
/** 矩形 */
const RectSprite = function (options) {
  Sprite.call(this, { ...options, type: Sprite.TYPE.RECT });
  const { mode = Sprite.MODE.FILL } = options;
  this.mode = mode;
};
extend(RectSprite, Sprite);
RectSprite.prototype.draw = function () {
  const { ctx, x, y, width, height, mode } = this;
  if (mode === Sprite.MODE.FILL) {
    ctx.fillRect(text, x, y, width, height);
  } else {
    ctx.strokeRect(text, x, y, width, height);
  }
};

/** ---------- RectSprite end ---------- */

/** ---------- ArcSprite start ---------- */
/**
 * 圆弧
 * @param {boolean} options.closed 是否闭合
 */
const ArcSprite = function (options) {
  const { radius, ...superOptions } = options;
  Sprite.call(this, {
    ...superOptions,
    type: Sprite.TYPE.ARC,
    width: radius * 2,
    height: radius * 2,
  });
  const {
    mode = Sprite.MODE.FILL,
    closed = true,
    startAngle = 0,
    endAngle = Math.PI * 2,
    anticlockwise = true,
  } = options;
  this.mode = mode;
  this.closed = closed;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.anticlockwise = anticlockwise;
};
extend(ArcSprite, Sprite);
ArcSprite.prototype.draw = function () {
  const { ctx, closed, mode, radius, startAngle, endAngle, anticlockwise } =
    this;
  ctx.beginPath();
  const isClosed = Math.abs(endAngle - startAngle) < Math.PI * 2 && closed;
  const x = radius / 2;
  if (isClosed) {
    ctx.moveTo(radius, radius);
  }
  ctx.arc(radius, radius, radius, startAngle, endAngle, anticlockwise);
  if (isClosed) {
    ctx.lineTo(radius, radius);
  }
  if (mode === Sprite.MODE.FILL) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

/** ---------- ArcSprite end ---------- */

/** ---------- CircleSprite start ---------- */
/**
 * 圆
 */
const CircleSprite = function (options) {
  const { radius, ...superOptions } = options;
  Sprite.call(this, {
    ...superOptions,
    type: Sprite.TYPE.CIRCLE,
    width: radius * 2,
    height: radius * 2,
  });
  const { mode = Sprite.MODE.FILL } = options;
  this.mode = mode;
  this.radius = radius;
};
extend(CircleSprite, Sprite);
CircleSprite.prototype.draw = function () {
  const { ctx, mode, radius } = this;
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, Math.PI * 2);
  if (mode === Sprite.MODE.FILL) {
    console.log(this);
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

/** ---------- CircleSprite end ---------- */

/** ---------- Transition start ---------- */

const Transition = {
  animate: function (fn) {
    return function (from, to, duration) {
      let startTime = Date.now();
      let loop = false;
      let callback = null;
      let done = false;
      let cacheResult = from;
      const loopFun = function () {
        if (done) {
          return cacheResult;
        }
        const currentTime = Date.now();
        let process = (currentTime - startTime) / duration;
        if (loop) {
          if (process > 1) {
            process %= 1;
          }
        } else if (process >= 1) {
          process = 1;
          done = true;
        }
        cacheResult = from + (to - from) * fn(process);
        if (done && callback) {
          callback(cacheResult);
        }
        return cacheResult;
      };
      loopFun.loop = function () {
        loop = true;
        return loopFun;
      };
      loopFun.restart = function () {
        startTime = Date.now();
        done = false;
        cacheResult = from;
        return loopFun;
      };
      loopFun.then = function (cb) {
        callback = cb;
        return loopFun;
      };
      return loopFun;
    };
  },
  linter: function (...args) {
    this.animate((x) => x)(...args);
  },
};

/** ---------- Transition end ---------- */

const EaseCanvas = {
  Scene,
  Sprite,
  Group,
  ImgSprite,
  RectSprite,
  TextSprite,
  ArcSprite,
  CircleSprite,
  Transition,
};

window.EaseCanvas = EaseCanvas;
