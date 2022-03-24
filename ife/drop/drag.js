//定义组件构造函数
function Drag() {
  // 公有变量可以写在这里
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.offSetX = 0;
  this.offSetY = 0;
  this.dragFlag = false;
  this.el = null;
  this.settings = { //在构造函数中设置默认配置参数
    id: '', //元素id名
    flag: false //为false时表示是普通拖曳，如果为true，则只能在可视区域中拖曳
  };
}


/**
 * 定义原型方法
 * 初始化并拖放对象
 * 绑定鼠标按下事件和鼠标释放事件
 * @param {object}            option 配置项
 */
Drag.prototype.init = function (opt) {
  const { id, flag = false } = opt;
  this.settings = {
    id,
    flag
  }
  this.el = document.getElementById(id);
  const bcr = this.el.getBoundingClientRect();
  this.offSetX = bcr.x;
  this.offSetY = bcr.y;
  this.width = bcr.width;
  this.height = bcr.height;
  
  function throttle (fn, delay) {
    let flag = true;
    return function (...args) {
      if (flag) {
        flag = false;
        setTimeout(() => {
          flag = true;
        }, delay);
        fn.apply(this, args);
      }
    }
  }
  const move = throttle(this.fnMove.bind(this), 1000 / 60);
  const up = e => {
    this.fnUp(e);
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', up)
  }

  this.el.addEventListener('mousedown', e => {
    this.fnDown(e);
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  })
};

//定义原型方法获取鼠标按下时的位置
Drag.prototype.fnDown = function (ev) {
  this.dragFlag = true;
  this.x = ev.clientX;
  this.y = ev.clientY;
};

//获取拖曳的对象在移动时的位置
Drag.prototype.fnMove = function (ev) {
  if (!this.dragFlag) return;
  //配置参数flag为true时，限制只在可视区中拖曳
  if (this.settings.flag) {
    let x = this.offSetX + ev.clientX - this.x;
    let y = this.offSetY + ev.clientY - this.y;
    const maxX = window.innerWidth - this.width;
    const maxY = window.innerHeight - this.height;
    x = x < 0 ? 0 : x > maxX ? maxX : x;
    y = y < 0 ? 0 : y > maxY ? maxY : y;
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    return;
  };
  this.el.style.left = this.offSetX + ev.clientX - this.x + 'px';
  this.el.style.top = this.offSetY + ev.clientY - this.y + 'px';

}

//释放鼠标时取消鼠标移动和释放事件
Drag.prototype.fnUp = function () {
  if (!this.dragFlag) return;
  this.dragFlag = false;
  const bcr = this.el.getBoundingClientRect();
  this.offSetX = bcr.x;
  this.offSetY = bcr.y;
}

// 你想增加的其他接口