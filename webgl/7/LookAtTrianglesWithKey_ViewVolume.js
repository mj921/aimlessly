const { gl, canvas } = getWebGLContext('webgl');

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertexColors = new Float32Array([
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 0.4, 1.0, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1.0, 0.4, 0.4,
    0.0, -0.6, -0.2, 1.0, 0.4, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0,
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
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
    uniform mat4 u_ModalViewMatrix;
    uniform mat4 u_ProjMatrix;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_ProjMatrix * u_ModalViewMatrix * a_Position;
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

  let eyeX = 0.2;
  let eyeY = 0.25;

  const uModalViewMatrix = gl.getUniformLocation(program, 'u_ModalViewMatrix');
  const uProjMatrix = gl.getUniformLocation(program, 'u_ProjMatrix');
  const projMatrix = new Matrix4();
  projMatrix.ortho(-1, 1, -1, 1, 0, 2);
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);
  const draw = () => {
    const modalViewMatrix = new Matrix4();
    modalViewMatrix
      .setLookAt(eyeX, eyeY, 0.25, 0, 0, 0, 0, 1, 0)
      .rotate(-10, 0, 0, 1);

    gl.uniformMatrix4fv(uModalViewMatrix, false, modalViewMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
  };
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      eyeX -= 0.1;
      draw();
    } else if (e.key === 'ArrowRight') {
      eyeX += 0.1;
      draw();
    } else if (e.key === 'ArrowUp') {
      eyeY += 0.1;
      draw();
    } else if (e.key === 'ArrowDown') {
      eyeY -= 0.1;
      draw();
    }
  });

  draw();
};
console.time();
main();
console.timeEnd();
