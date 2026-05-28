const { gl, canvas } = getWebGLContext('webgl');

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertexs = new Float32Array([
    -1.0, 1.0, 1.0, 
    -1.0, -1.0, 1.0, 
    1.0, -1.0, 1.0, 
    1.0, 1.0, 1.0, 
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0, 
    -1.0, -1.0, -1.0, 
    -1.0, 1.0, -1.0, 
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0, 
    -1.0, -1.0, 1.0, 
    -1.0, 1.0, 1.0, 
    1.0, 1.0, 1.0, 
    1.0, -1.0, 1.0, 
    1.0, -1.0, -1.0, 
    1.0, 1.0, -1.0, 
    -1.0, 1.0, -1.0, 
    -1.0, 1.0, 1.0, 
    1.0, 1.0, 1.0, 
    1.0, 1.0, -1.0, 
    -1.0, -1.0, 1.0, 
    -1.0, -1.0, -1.0, 
    1.0, -1.0, -1.0, 
    1.0, -1.0, 1.0,
  ]);
  const colors = new Float32Array([
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    0.4,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
    0.4,
    1.0,
    1.0,
  ]);
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ]);
  const vextexBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vextexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
  const aColor = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
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
  gl.enable(gl.POLYGON_OFFSET_FILL);

  const uMvpMatrix = gl.getUniformLocation(program, 'u_MvpMatrix');
  const projMatrix = new Matrix4();
  projMatrix.perspective(30, canvas.width / canvas.height, 1, 100);
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(6, 0, 6, 0, 0, 0, 0, 1, 0);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.polygonOffset(0.0, 1.0);
  const modalMatrix = new Matrix4();
  const mvpMatrix = new Matrix4();
  let rotateX = 0;
  let rotateZ = 0;

  const loop = () => {
    modalMatrix.setRotate(rotateX, 1, 0, 0).rotate(rotateZ, 0, 0, 1);
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
    gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    rotateX += Math.PI / 180;
    rotateZ += Math.PI / 180;
    requestAnimationFrame(loop);
  };
  loop();
};
console.time();
main();
console.timeEnd();
