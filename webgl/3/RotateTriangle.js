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
    uniform float u_SinB;
    uniform float u_CosB;
    void main() {
      gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
      gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
      gl_Position.z = a_Position.z;
      gl_Position.w = 1.0;
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
  const uSinB = gl.getUniformLocation(program, 'u_SinB');
  const uCosB = gl.getUniformLocation(program, 'u_CosB');
  const angle = 90;
  gl.uniform4f(uFragColor, 1, 0, 0, 1);
  gl.uniform1f(uSinB, Math.sin((angle * Math.PI) / 180));
  gl.uniform1f(uCosB, Math.cos((angle * Math.PI) / 180));

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
};
main();
