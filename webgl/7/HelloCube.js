const { gl, canvas } = getWebGLContext('webgl');

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertexColors = new Float32Array([
    -1.0, 1.0, 1.0, 1.0, 0.0, 0.0,
    -1.0, -1.0, 1.0, 0.0, 1.0, 0.0,
    1.0, -1.0, 1.0, 0.0, 0.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 0.0,

    1.0, 1.0, -1.0, 1.0, 0.0, 1.0,
    1.0, -1.0, -1.0, 0.0, 1.0, 1.0,
    -1.0, -1.0, -1.0, 1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0, 0.0, 0.0, 0.0,
  ]);
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    3, 2, 5, 3, 5, 4,
    7, 6, 1, 7, 1, 0,
    7, 0, 3, 7, 3, 4,
    1, 6, 5, 1, 5, 2,
  ])
  const FISZE = vertexColors.BYTES_PER_ELEMENT;
  const vextexColorBuffer = gl.createBuffer();
  const indexBuffer= gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vextexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FISZE * 6, 0);
  gl.enableVertexAttribArray(aPosition);
  const aColor = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FISZE * 6, FISZE * 3);
  gl.enableVertexAttribArray(aColor);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return indices.length;
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
  const n = initVertexBuffer(gl, program);
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.POLYGON_OFFSET_FILL)


  const uMvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  const projMatrix = new Matrix4();
  projMatrix.perspective(30, canvas.width / canvas.height, 1, 100);
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(6, 0, 6, 0, 0, 0, 0, 1, 0);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.polygonOffset(.0, 1.0);
  const modalMatrix = new Matrix4();
  const mvpMatrix = new Matrix4();
  mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

};
console.time();
main();
console.timeEnd();
