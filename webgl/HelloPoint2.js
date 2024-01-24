const gl = getWebGLContext('webgl');

const vertexSource = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

const fragmentSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const program = initShader(gl, vertexSource, fragmentSource);
const aPosition = gl.getAttribLocation(program, 'a_Position');
const aPointSize = gl.getAttribLocation(program, 'a_PointSize');
console.log(aPosition);
console.log(aPointSize);

gl.vertexAttrib3f(aPosition, 0, 0, 0);
gl.vertexAttrib1f(aPointSize, 20);
console.log(aPosition);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
