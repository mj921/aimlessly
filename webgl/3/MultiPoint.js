const x1 = -0.9;
const x2 = -0.5;
const x3 = 0.97;
const x4 = 0.1;
const y1 = -0.9;
const y2 = 0.7;
const y3 = -0.8;
const y4 = 0.5;

const points = [1.2, 0.7, 0, 0.8, 0, -0.3464, 0.7, 0.4, -0.3464];
// for (let i = 0, len = 200; i <= len; i += 1) {
//   const dx1 = ((x2 - x1) * i) / len + x1;
//   const dx2 = ((x3 - x2) * i) / len + x2;
//   const dx3 = ((x4 - x3) * i) / len + x3;
//   const dx11 = ((dx2 - dx1) * i) / len + dx1;
//   const dx12 = ((dx3 - dx2) * i) / len + dx2;
//   const dx = ((dx12 - dx11) * i) / len + dx11;
//   const dy1 = ((y2 - y1) * i) / len + y1;
//   const dy2 = ((y3 - y2) * i) / len + y2;
//   const dy3 = ((y4 - y3) * i) / len + y3;
//   const dy11 = ((dy2 - dy1) * i) / len + dy1;
//   const dy12 = ((dy3 - dy2) * i) / len + dy2;
//   const dy = ((dy12 - dy11) * i) / len + dy11;
//   points.push(dx, dy);
// }

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertices = new Float32Array(points);
  const n = points.length / 3;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
  return n;
};

const main = () => {
  const { gl, canvas } = getWebGLContext('webgl');

  const vertexSource = /*glsl*/ `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

  const fragmentSource = /*glsl*/ `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

  const program = initShader(gl, vertexSource, fragmentSource);
  const n = initVertexBuffer(gl, program);
  const aPointSize = gl.getAttribLocation(program, 'a_PointSize');
  const uFragColor = gl.getUniformLocation(program, 'u_FragColor');

  gl.vertexAttrib1f(aPointSize, 10);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINE_LOOP, 0, n);
};
main();
