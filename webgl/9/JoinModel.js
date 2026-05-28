const { gl, canvas } = getWebGLContext('webgl');

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {Float32Array} srcData
 * @param {string} name
 * @param {number} size
 * @param {number} type
 */
const initArrayBuffer = (gl, program, srcData, name, size, type) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, name);
  gl.vertexAttribPointer(attribute, size, type, false, 0, 0);
  gl.enableVertexAttribArray(attribute);
};

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const vertexs = new Float32Array([
    -1.0, 6.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 6.0, 1.0, 1.0, 6.0,
    -1.0, 1.0, 0.0, -1.0, -1.0, 0.0, -1.0, -1.0, 6.0, -1.0, -1.0, 6.0, -1.0,
    -1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 6.0, 1.0, 1.0, 6.0, 1.0, 1.0, 0.0,
    1.0, 1.0, 0.0, -1.0, 1.0, 6.0, -1.0, -1.0, 6.0, -1.0, -1.0, 6.0, 1.0, 1.0,
    6.0, 1.0, 1.0, 6.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, -1.0,
    1.0, 0.0, 1.0,
  ]);
  const colors = new Float32Array([
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ]);
  const indices = new Uint8Array([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ]);
  const normals = new Float32Array([
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ]);
  console.log(normals.length);
  initArrayBuffer(gl, program, vertexs, 'a_Position', 3, gl.FLOAT);

  initArrayBuffer(gl, program, colors, 'a_Color', 3, gl.FLOAT);

  initArrayBuffer(gl, program, normals, 'a_Normal', 3, gl.FLOAT);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return indices.length;
};

const main = () => {
  const vertexSource = /*glsl*/ `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    attribute vec4 a_Normal;
    uniform vec3 u_AmbientLight;
    uniform vec3 u_LightColor;
    uniform vec3 u_LightDirection;
    uniform mat4 u_MvpMatrix;
    uniform mat4 u_NormalMatrix;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_MvpMatrix * a_Position;
      vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));
      float nDotL = max(dot(normal, u_LightDirection), 0.0);
      vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
      vec3 ambient = u_AmbientLight * a_Color.rgb;
      v_Color = vec4(diffuse + ambient, a_Color.a);
    }
  `;

  const fragmentSource = /*glsl*/ `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec4 v_Color;
    void main() {
      gl_FragColor = v_Color;
      // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
  viewMatrix.setLookAt(0, 0, 40, 0, 0, 0, 0, 1, 0);

  const uLightColor = gl.getUniformLocation(program, 'u_LightColor');
  const uLightDirection = gl.getUniformLocation(program, 'u_LightDirection');
  const uAmbientLight = gl.getUniformLocation(program, 'u_AmbientLight');
  const uNormalMatrix = gl.getUniformLocation(program, 'u_NormalMatrix');

  gl.uniform3f(uLightColor, 1, 1, 1);
  gl.uniform3fv(uLightDirection, new Vector3([0.5, 3, 4]).normalize().elements);
  gl.uniform3f(uAmbientLight, 0.2, 0.2, 0.2);
  gl.polygonOffset(0.0, 1.0);
  const modalMatrix = new Matrix4();
  const mvpMatrix = new Matrix4();
  const normalMatrix = new Matrix4();
  const modalMatrix2 = new Matrix4();
  let rotateX = 0;
  let rotateY = 0;
  const angleStep = 2;
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowDown':
        if (rotateX > -135) {
          rotateX -= angleStep;
        }
        break;
      case 'ArrowUp':
        if (rotateX < 135) {
          rotateX += angleStep;
        }
        break;
      case 'ArrowRight':
        rotateY = (rotateY + angleStep) % 360;
        break;
      case 'ArrowLeft':
        rotateY = (rotateY - angleStep) % 360;
        break;
    }
  });
  const loop = () => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    modalMatrix2.setTranslate(0, 6, 0).rotate(rotateX, 1, 0, 0);
    modalMatrix.setTranslate(0, -9, 0).rotate(rotateY, 0, 1, 0);
    normalMatrix.setInverseOf(modalMatrix).transpose();
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
    gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(uNormalMatrix, false, normalMatrix.elements);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

    modalMatrix.multiply(modalMatrix2);
    normalMatrix.setInverseOf(modalMatrix).transpose();
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
    gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(uNormalMatrix, false, normalMatrix.elements);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
    // rotateX += Math.PI / 180 * 10
    requestAnimationFrame(loop);
  };
  loop();
};
console.time();
main();
console.timeEnd();
