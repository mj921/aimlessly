const BaseBar = function ({
  ele,
  data,
  width = 500,
  height = 400,
  left = 50,
  top = 50,
  bottom = 50,
  right = 50,
  type = 'canvas',
}) {
  this.ele = ele;
  this.data = data;
  this.width = width;
  this.height = height;
  this.left = left;
  this.top = top;
  this.bottom = bottom;
  this.right = right;
  this.colors = new Array(9)
    .fill(1)
    .map(() => '#' + Math.random().toString(16).slice(2, 8));
  this.type = type;
  if (type === 'svg') {
    this.svg = document.createElement('svg');
    this.svg.setAttribute('width', width);
    this.svg.setAttribute('height', height);
  } else {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.ele.appendChild(this.canvas);
  }
};

BaseBar.prototype.render = function () {
  if (this.type === 'svg') {
    this.renderSvg();
  } else {
    this.renderCanvas();
  }
};
BaseBar.prototype.renderCanvas = function () {
  const splitNum = 5;
  const { width, height, left, top, bottom, right, colors, ctx } = this;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(width - right, height - bottom);
  ctx.lineTo(left, height - bottom);
  ctx.lineTo(left, top);
  ctx.stroke();
  const unit =
    Math.pow(10, `${this.data.max}`.replace(/\.\d*$/, '').length - 1) * 2;
  const max = Math.ceil(this.data.max / unit) * unit;
  const splitUnit = max / splitNum;
  const barNum = (this.data.list[0].data.length + 1) * this.data.list.length;
  const size = (width - left - right) / barNum;
  for (let i = 0; i < splitNum; i++) {
    ctx.beginPath();
    ctx.moveTo(
      left - 5,
      height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
    );
    ctx.lineTo(
      left,
      height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
    );
    ctx.stroke();
    ctx.beginPath();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(
      `${splitUnit * (i + 1)}`,
      left - 10,
      Math.round(
        height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
      )
    );
  }
  this.data.list.forEach(({ label, data }, i) => {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(
      label,
      Math.round(left + (i + 0.5) * (data.length + 1) * size),
      height - bottom + 20
    );
    data.forEach(({ value }, j) => {
      ctx.beginPath();
      ctx.fillStyle = colors[j];
      ctx.fillRect(
        left + (i * (data.length + 1) + (j + 1)) * size,
        top + (height - top - bottom) * (1 - value / max),
        size,
        ((height - top - bottom) * value) / max
      );
    });
  });
};

BaseBar.prototype.renderSvg = function () {
  const splitNum = 5;
  const { width, height, left, top, bottom, right, colors, svg } = this;
  svg.innerHTML = '';
  const xAxis = document.createElement('line');
  xAxis.setAttribute('x1', left);
  xAxis.setAttribute('y1', height - bottom);
  xAxis.setAttribute('x2', width - right);
  xAxis.setAttribute('y2', height - bottom);
  xAxis.setAttribute('style', 'stroke: #000');
  svg.appendChild(xAxis);
  const yAxis = document.createElement('line');
  yAxis.setAttribute('x1', left);
  yAxis.setAttribute('y1', height - bottom);
  yAxis.setAttribute('x2', left);
  yAxis.setAttribute('y2', top);
  yAxis.setAttribute('style', 'stroke: #000');
  svg.appendChild(yAxis);
  const unit =
    Math.pow(10, `${this.data.max}`.replace(/\.\d*$/, '').length - 1) * 2;
  const max = Math.ceil(this.data.max / unit) * unit;
  const splitUnit = max / splitNum;
  const barNum = (this.data.list[0].data.length + 1) * this.data.list.length;
  const size = (width - left - right) / barNum;
  for (let i = 0; i < splitNum; i++) {
    const line = document.createElement('line');
    line.setAttribute('x1', left - 5);
    line.setAttribute(
      'y1',
      height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
    );
    line.setAttribute('x2', left);
    line.setAttribute(
      'y2',
      height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
    );
    line.setAttribute('style', 'stroke: #000');
    svg.appendChild(line);
    const text = document.createElement('text');
    text.innerText = splitUnit * (i + 1);
    text.setAttribute('x', left - 10);
    text.setAttribute(
      'y',
      height - bottom - ((height - bottom - top) / splitNum) * (i + 1)
    );
    text.setAttribute('style', 'text-anchor: end;dominant-baseline: middle;');
    svg.appendChild(text);
  }
  this.data.list.forEach(({ label, data }, i) => {
    const text = document.createElement('text');
    text.innerText = label;
    text.setAttribute('x', left + (i + 0.5) * (data.length + 1) * size);
    text.setAttribute('y', height - bottom + 20);
    text.setAttribute(
      'style',
      'text-anchor: middle;dominant-baseline: middle;'
    );
    svg.appendChild(text);
    data.forEach(({ value }, j) => {
      const rect = document.createElement('rect');
      rect.setAttribute('x', left + (i * (data.length + 1) + (j + 1)) * size);
      rect.setAttribute('y', top + (height - top - bottom) * (1 - value / max));
      rect.setAttribute('width', size);
      rect.setAttribute('height', ((height - top - bottom) * value) / max);
      rect.setAttribute('style', 'fill: ' + colors[j]);
      svg.appendChild(rect);
    });
  });
  this.ele.innerHTML = svg.outerHTML;
};

BaseBar.prototype.update = function (data) {
  this.data = data;
  this.render();
};
