class Matrix4 extends Matrix {
  constructor() {
    super(4, 4);
  }
  /** 将当前矩阵乘以矩阵matrix */
  multiply(matrix) {
    super.multiply(matrix);
    return this;
  }
  /** 将当前矩阵乘以矩阵matrix 返回一个新的矩阵 */
  multiplyMatrices(matrix) {
    return super.multiplyMatrices(matrix);
  }
}
