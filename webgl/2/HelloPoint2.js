const { gl, canvas } = getWebGLContext('webgl');

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

gl.vertexAttrib1f(aPointSize, 10);
const points = [];

canvas.addEventListener('click', e => {
  const bcr = canvas.getBoundingClientRect();
  const x = ((e.clientX - bcr.left) / canvas.clientWidth) * 2 - 1;
  const y = 1 - ((e.clientY - bcr.top) / canvas.clientHeight) * 2;
  points.push({ x, y });
  gl.clear(gl.COLOR_BUFFER_BIT);
  points.forEach(({ x, y }) => {
    gl.vertexAttrib3f(aPosition, x, y, 0);
    gl.drawArrays(gl.POINTS, 0, 1);
  });
});

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
