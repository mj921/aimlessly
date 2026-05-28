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
    uniform vec4 u_Translation;
    void main() {
      gl_Position = a_Position + u_Translation;
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
  const uTranslation = gl.getUniformLocation(program, 'u_Translation');
  gl.uniform4f(uFragColor, 1, 0, 0, 1);
  gl.uniform4f(uTranslation, 0.5, 0.5, 0, 0);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
};
main();
