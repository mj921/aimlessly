/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
  return n;
};

const main = () => {
  const { gl, canvas } = getWebGLContext('webgl');

  const vertexSource = /*glsl*/ `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`;

  const fragmentSource = /*glsl*/ `
  precision mediump float;
  uniform float u_Width;
  uniform float u_Height;
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 400.0, 0.0, gl_FragCoord.y / 400.0, 1.0);
  }
`;

  const program = initShader(gl, vertexSource, fragmentSource);
  const n = initVertexBuffer(gl, program);
  const uWidth = gl.getUniformLocation(program, 'u_Width');
  const uHeight = gl.getUniformLocation(program, 'u_Height');

  gl.vertexAttrib1f(uWidth, gl.drawingBufferWidth);
  gl.vertexAttrib1f(uHeight, gl.drawingBufferWidth);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
};
main();
