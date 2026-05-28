const { gl, canvas } = getWebGLContext('webgl');

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertexColors = new Float32Array([
    0.0, 2.5, -5.0, 0.0, 1.0, 0.0,
    -2.5, -2.5, -5.0, 0.0, 1.0, 0.0,
    2.5, -2.5, -5.0, 0.0, 1.0, 0.0,

    0.0, 3.0, -5.0, 1.0, 1.0, 0.0,
    -3.0, -3.0, -5.0, 1.0, 1.0, 0.0,
    3.0, -3.0, -5.0, 1.0, 1.0, 0.0,
  ]);
  const FISZE = vertexColors.BYTES_PER_ELEMENT;
  const vextexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vextexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FISZE * 6, 0);
  gl.enableVertexAttribArray(aPosition);
  const aColor = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FISZE * 6, FISZE * 3);
  gl.enableVertexAttribArray(aColor);
};

const main = () => {
  const vertexSource = /*glsl*/ `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_MvpMatrix;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_MvpMatrix * a_Position;
      v_Color = a_Color;
    }
  `;

  const fragmentSource = /*glsl*/ `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
    }
  `;

  const program = initShader(gl, vertexSource, fragmentSource);
  initVertexBuffer(gl, program);
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);


  const uMvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  const projMatrix = new Matrix4();
  projMatrix.perspective(30, canvas.width / canvas.height, 1, 100);
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 6, 0, 0, -100, 0, 1, 0);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const modalMatrix = new Matrix4();
  const mvpMatrix = new Matrix4();
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.drawArrays(gl.TRIANGLES, 3, 3);

};
console.time();
main();
console.timeEnd();
