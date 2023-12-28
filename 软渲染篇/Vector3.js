/** 三维向量 */
class Vector3 {
  x = 0;
  y = 0;
  z = 0;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static fromArray(value) {
    return new Vector3(value[0], value[1], value[2]);
  }
  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
  /** 两向量相加 */
  static addVector(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }
  /** 数乘 */
  static multiplyScalar(v, n) {
    return new Vector3(v.x * n, v.y * n, v.z * n);
  }
  /** 叉乘 */
  static cross(v, v1) {
    const { x, y, z } = v;
    return new Vector3(
      y * v1.z - z * v1.y,
      z * v1.x - x * v1.z,
      x * v.y - y * v1.x
    );
  }
  /** 两向量相加 */
  addVector(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }
  /** 两向量相减 */
  static subVector(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }
  /** 两向量相减 */
  subVector(v1, v2) {
    return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }
  /** 从该向量加上向量v */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  /** 从该向量减去向量v */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  /** 数乘 */
  multiplyScalar(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }
  /** 将该向量除以标量n。 */
  divideScalar(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }
  /** 模；计算从(0, 0, 0)到(x, y, z)的欧几里得长度 */
  length() {
    const { x, y, z } = this;
    return Math.sqrt(x * x + y * y + z * z);
  }
  /** 将该向量转换为单位向量 */
  normalize() {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
  }
  /** 点乘、内积 */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /** 叉乘 */
  cross(v) {
    const { x, y, z } = this;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  }
  toVector2() {
    const { x, y, z } = this;
    return new Vector2(x / z, y / z);
  }
  toVector4(w = 1) {
    return new Vector4(this.x, this.y, this.z, w);
  }
  toMatrialCol() {
    const { x, y, z } = this;
    const m = new Matrix(3, 1);
    m.set(x, y, z);
    return m;
  }
  toMatrialRow() {
    const { x, y, z } = this;
    const m = new Matrix(1, 3);
    m.set(x, y, z);
    return m;
  }
  raw(value, i) {
    this[i === 0 ? 'x' : i === 1 ? 'y' : 'z'] = value;
  }
  toArray() {
    return [this.x, this.y, this.z];
  }
  toString() {
    const { x, y, z } = this;
    return `(${x}, ${y}, ${z})`;
  }
}

window.Vector3 = Vector3;
