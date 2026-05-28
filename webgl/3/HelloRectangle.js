/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertices = new Float32Array([
    -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5,
  ]);
  const n = 4;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
  return n;
};

const main = () => {
  const { gl } = getWebGLContext('webgl');

  const vertexSource = /*glsl*/ `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
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
  const uFragColor = gl.getUniformLocation(program, 'u_FragColor');
  gl.uniform4f(uFragColor, 1, 0, 0, 1);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
};
main();
