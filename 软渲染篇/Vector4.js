/** 三维向量 */
class Vector4 {
  x = 0;
  y = 0;
  z = 0;
  w = 0;
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  static fromArray(value) {
    return new Vector4(value[0], value[1], value[2], value[3]);
  }
  clone() {
    const { x, y, z, w } = this;
    return new Vector4(x, y, z, w);
  }
  /** 两向量相加 */
  static addVector(v1, v2) {
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }
  /** 两向量相加 */
  addVector(v1, v2) {
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }
  /** 两向量相减 */
  static subVector(v1, v2) {
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }
  /** 两向量相减 */
  subVector(v1, v2) {
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }
  /** 从该向量加上向量v */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }
  /** 从该向量减去向量v */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }
  /** 数乘 */
  multiplyScalar(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    this.w *= n;
    return this;
  }
  /** 将该向量除以标量n。 */
  divideScalar(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    this.w /= n;
    return this;
  }
  /** 模；计算从(0, 0, 0, 0)到(x, y, z, w)的欧几里得长度 */
  length() {
    const { x, y, z, w } = this;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /** 将该向量转换为单位向量 */
  normalize() {
    const len = this.length();
    this.x /= len;
    this.y /= len;
    this.z /= len;
    this.w /= len;
    return this;
  }
  /** 点乘、内积 */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  toVector3() {
    const { x, y, z, w } = this;
    return new Vector3(x / w, y / w, z / w);
  }
  toArray() {
    const { x, y, z, w } = this;
    return [x, y, z, w];
  }
  toMatrialCol() {
    const { x, y, z, w } = this;
    const m = new Matrix(4, 1);
    m.set(x, y, z, w);
    return m;
  }
  applyMatrix4(m) {
    const newM = m.multiplyMatrices(this.toMatrialCol());
    this.x = newM.getByIndex(0, 0);
    this.y = newM.getByIndex(1, 0);
    this.z = newM.getByIndex(2, 0);
    this.w = newM.getByIndex(3, 0);
    return this;
  }
  toString() {
    const { x, y, z, w } = this;
    return `(${x}, ${y}, ${z}, ${w})`;
  }
}
