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
    uniform mat4 u_xfromMatrix;
    void main() {
      gl_Position = u_xfromMatrix * a_Position;
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
  const uXfromMatrix = gl.getUniformLocation(program, 'u_xfromMatrix');
  const angle = 90;
  const uSinB = Math.sin((angle * Math.PI) / 180);
  const uCosB = Math.cos((angle * Math.PI) / 180);
  // const xformMatrix = new Float32Array([
  //   uCosB, uSinB, 0, 0,
  //   -uSinB, uCosB, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1,
  // ]);
  // const xformMatrix = new Float32Array([
  //   1, 0, 0, 0,
  //   0, 1.5, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1,
  // ]);
  const xformMatrix = new Matrix4();
  xformMatrix.setRotate(angle, 0, 0, 1);
  gl.uniform4f(uFragColor, 1, 0, 0, 1);
  gl.uniformMatrix4fv(uXfromMatrix, false, xformMatrix.elements);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
};
main();
