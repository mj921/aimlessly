/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const verticeSizes = new Float32Array([
    0, 0.5, 10, 1, 0, 0, 
    -0.5, -0.5, 20, 0, 1, 0, 
    0.5, -0.5, 30, 0, 0, 1,
  ]);
  const FSIZE = verticeSizes.BYTES_PER_ELEMENT;
  console.log(FSIZE);
  const n = 3;
  const vertexSizeBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticeSizes, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(aPosition);

  const aPointSize = gl.getAttribLocation(program, 'a_PointSize');
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2);
  gl.enableVertexAttribArray(aPointSize);

  const aColor = gl.getAttribLocation(program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(aColor);
  return n;
};

const main = () => {
  const { gl, canvas } = getWebGLContext('webgl');

  const vertexSource = /*glsl*/ `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
      v_Color = a_Color;
    }
  `;

  const fragmentSource = /*glsl*/ `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
    }
  `;

  const program = initShader(gl, vertexSource, fragmentSource);
  const n = initVertexBuffer(gl, program);
  const aPointSize = gl.getAttribLocation(program, 'a_PointSize');

  gl.vertexAttrib1f(aPointSize, 10);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
};
main();
