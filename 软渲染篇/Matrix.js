class Matrix {
  rows;
  cols;
  elements;
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.elements = [];
    for (let i = 0; i < rows; i++) {
      const arr = [];
      for (let j = 0; j < cols; j++) {
        arr.push(i === j ? 1 : 0);
      }
      this.elements.push(arr);
    }
  }
  static identity(size) {
    return new Matrix(size, size);
  }
  fill(value) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] = value;
      }
    }
    return this;
  }
  /** 设置特定位置的值 */
  setByIndex(value, row, col) {
    this.elements[row][col] = value;
  }
  getByIndex(row, col) {
    return this.elements[row]?.[col];
  }
  setRows(value, row) {
    for (let i = 0, len = Math.min(this.cols, value.length); i < len; i++) {
      this.setByIndex(value[i], row, i);
    }
  }
  setCols(value, col) {
    for (let i = 0, len = Math.min(this.rows, value.length); i < len; i++) {
      this.setByIndex(value[i], i, col);
    }
  }
  set(...args) {
    for (
      let i = 0, len = Math.min(args.length, this.rows * this.cols);
      i < len;
      i++
    ) {
      this.elements[Math.floor(i / this.cols)][i % this.cols] = args[i];
    }
    return this;
  }
  /** 转置 */
  transpose() {
    const newElements = [];
    this.transposeIntoArray(newElements);
    this.elements = newElements;
    return this;
  }
  /** 将当前矩阵的转置存入到数组中 */
  transposeIntoArray(array) {
    for (let i = 0; i < this.cols; i++) {
      const arr = [];
      for (let j = 0; j < this.rows; j++) {
        arr.push(this.elements[j][i]);
      }
      array.push(arr);
    }
    return this;
  }
  /** 将当前矩阵乘以矩阵matrix */
  multiply(matrix) {
    if (this.cols !== matrix.rows) {
      throw new Error('第一个矩阵的列数不等于第二个矩阵的行数');
    }
    const elements = [];
    for (let i = 0; i < this.rows; i++) {
      const arr = [];
      for (let j = 0; j < matrix.cols; j++) {
        let n = 0;
        for (let k = 0; k < this.cols; k++) {
          n += this.elements[i][k] * matrix.elements[k][j];
        }
        arr.push(n);
      }
      elements.push(arr);
    }
    this.elements = elements;
    this.cols = matrix.cols;
    return this;
  }
  /** 将当前矩阵乘以矩阵matrix 返回一个新的矩阵 */
  multiplyMatrices(matrix) {
    if (this.cols !== matrix.rows) {
      throw new Error('第一个矩阵的列数不等于第二个矩阵的行数');
    }
    const newMatrix = new Matrix(this.rows, matrix.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let n = 0;
        for (let k = 0; k < this.cols; k++) {
          n += this.elements[i][k] * matrix.elements[k][j];
        }
        newMatrix.setByIndex(n, i, j);
      }
    }
    return newMatrix;
  }
  /** 将矩阵matrix乘以当前矩阵 */
  premultiply(matrix) {
    if (matrix.cols !== this.rows) {
      throw new Error('第一个矩阵的列数不等于第二个矩阵的行数');
    }
    const elements = [];
    for (let i = 0; i < matrix.rows; i++) {
      const arr = [];
      for (let j = 0; j < this.cols; j++) {
        let n = 0;
        for (let k = 0; k < matrix.cols; k++) {
          n += matrix.elements[i][k] * this.elements[k][j];
        }
        arr.push(n);
      }
      elements.push(arr);
    }
    this.elements = elements;
    this.rows = matrix.rows;
    return this;
  }
  /** 将矩阵matrix乘以当前矩阵 返回一个新的矩阵 */
  premultiplyMatrices(matrix) {
    if (this.cols !== matrix.rows) {
      throw new Error('第一个矩阵的列数不等于第二个矩阵的行数');
    }
    const newMatrix = new Matrix(this.rows, matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let n = 0;
        for (let k = 0; k < matrix.cols; k++) {
          n += matrix.elements[i][k] * this.elements[k][j];
        }
        newMatrix.setByIndex(n, i, j);
      }
    }
    return newMatrix;
  }
  /** 当前矩阵所有的元素乘以该缩放值n */
  multiplyScalar(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] *= n;
      }
    }
    return this;
  }
  /** 是否是方阵 */
  isSquareMaterial() {
    return this.rows === this.cols;
  }
  /** 是否是单位方阵 */
  isUnitMaterial() {
    if (this.isSquareMaterial()) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if ((i === j ? 1 : 0) !== this.elements[i][j]) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
  /** 幂运算，只有方阵可以调用 */
  exponentiation(n) {
    if (!this.isSquareMaterial()) {
      throw new Error('不为方阵，无法幂运算');
    }
    if (n < 0 || n !== Math.floor(n)) {
      throw new Error('n必须是零或正整数');
    } else if (n === 0) {
      this.identity();
    } else if (n === 2) {
      this.multiply(this);
    } else if (n > 2) {
      const newMatrix = this.multiplyMatrices(this);
      for (let i = 1; i < n; i++) {
        newMatrix.multiply(this);
      }
      this.elements = newMatrix.elements;
    }
    return this;
  }
  /** 将当前矩阵转为单位矩阵，只有方阵可以调用 */
  identity() {
    if (!this.isSquareMaterial()) {
      throw new Error('不为方阵，转为单位矩阵');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] = i === j ? 1 : 0;
      }
    }
    return this;
  }
  add(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error('不是同型矩阵无法相加');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] += matrix.elements[i][j];
      }
    }
    return this;
  }
  sub(matrix) {
    if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
      throw new Error('不是同型矩阵无法相减');
    }
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] -= matrix.elements[i][j];
      }
    }
    return this;
  }
  clone() {
    const matrix = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        matrix.elements[i][j] = this.elements[i][j];
      }
    }
    return matrix;
  }
  /** 行和行的变换（对换变换） E */
  exchange(i, j) {
    if (i >= 0 || j >= 0 || i < this.rows || j < this.rows) {
      const temp = this.elements[i];
      this.elements[i] = this.elements[j];
      this.elements[j] = temp;
    }
    return this;
  }
  /** 行×常数的变换（倍乘变换） Ei(k) */
  rowScaler(i, k) {
    if (i >= 0 || i < this.rows) {
      for (let j = 0; j < this.cols; j++) {
        this.elements[i][j] *= k;
      }
    }
    return this;
  }
  /** 行×常数再加另一行的变换（倍加变换） 第j行增加第i行的k倍 Eij(k) */
  rowAddScaler(i, j, k) {
    if (i >= 0 || i < this.rows) {
      for (let n = 0; n < this.cols; n++) {
        this.elements[i][n] += this.elements[j][n] * k;
      }
    }
    return this;
  }
  /** 逆矩阵 转增广矩阵→消元法转行最简矩阵 */
  invert() {
    if (!this.isSquareMaterial()) {
      throw new Error('不为方阵，没有逆矩阵');
    }
    const newMatrix = new Matrix(this.rows, this.cols);
    newMatrix.identity();

    let n = 1;
    for (let c = 0; c < this.cols; c++) {
      if (this.elements[c][c] !== 1) {
        // 如果主元是0，则在该行下方的行中，查找该列值不为0的行并交换
        if (this.elements[c][c] === 0) {
          let index = -1;
          for (let j = c + 1; j < this.rows; j++) {
            if (this.elements[j][c] !== 0) {
              index = j;
              break;
            }
          }
          if (index === -1) {
            throw new Error('出现全零行，无可逆矩阵');
          } else {
            this.exchange(c, index);
            newMatrix.exchange(c, index);
          }
        }
        n = this.elements[c][c];
        // 主元转成1 除以当前主元值
        this.rowScaler(c, 1 / n);
        newMatrix.rowScaler(c, 1 / n);
      }
      for (let r = c + 1; r < this.rows; r++) {
        if (this.elements[r][c] !== 0) {
          n = this.elements[r][c];
          let flag = true;
          // 非主元转成0 减去当前列的主元行乘以自身
          this.rowAddScaler(r, c, -n);
          newMatrix.rowAddScaler(r, c, -n);
          for (let i = 0; i < this.elements[r].length; i++) {
            if (this.elements[r][i] !== 0) {
              flag = false;
            }
          }
          if (flag) {
            throw new Error('出现全零行，无可逆矩阵');
          }
        }
      }
    }

    for (let r = this.rows - 2; r >= 0; r--) {
      for (let c = r + 1; c < this.cols; c++) {
        if (this.elements[r][c] !== 0) {
          n = this.elements[r][c];
          let flag = true;
          // 非主元转成0 减去当前列的主元行乘以自身
          this.rowAddScaler(r, c, -n);
          newMatrix.rowAddScaler(r, c, -n);
          for (let i = 0; i < this.elements[r].length; i++) {
            if (this.elements[r][i] !== 0) {
              flag = false;
            }
          }
          if (flag) {
            throw new Error('出现全零行，无可逆矩阵');
          }
        }
      }
    }
    this.elements = newMatrix.elements;
    return this;
  }
}
