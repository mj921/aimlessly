/** 二维向量 */
class Vector2 {
  x = 0;
  y = 0;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static fromArray(value) {
    return new Vector2(value[0], value[1]);
  }
  /** 两向量相加 */
  static addVector(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  /** 两向量相加 */
  addVector(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  /** 两向量相减 */
  static subVector(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  /** 两向量相减 */
  subVector(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  /** 从该向量加上向量v */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /** 从该向量减去向量v */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  /** 数乘 */
  multiplyScalar(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  /** 将该向量除以标量n。 */
  divideScalar(n) {
    this.x /= n;
    this.y /= n;
    return this;
  }
  /** 模；计算从(0, 0)到(x, y)的欧几里得长度 */
  length() {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }
  /** 将该向量转换为单位向量 */
  normalize() {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    return this;
  }
  /** 点乘、内积 (||a||²+||c||²-||c-a||²)/2 两个同向线段的长度的积 点乘为0是两向量垂直 */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /** 叉乘 平行四边形面积 */
  cross(v) {
    const { x, y } = this;
    return x * v.y - y * v.x;
  }
  toVector3(z = 1) {
    return new Vector3(this.x, this.y, z);
  }
  /** 计算该向量相对于x轴正方向的弧度角度 */
  angle() {
    return Math.acos(new Vector2(1, 0).dot(this) / this.length());
  }
  /** 以弧度返回该向量与向量v之间的角度。 */
  angleTo(v) {
    return Math.acos(v.clone().dot(this) / this.length() / v.length());
  }
  clone() {
    return new Vector2(this.x, this.y);
  }
  toString() {
    const { x, y } = this;
    return `(${x}, ${y})`;
  }
}

window.Vector2 = Vector2;
