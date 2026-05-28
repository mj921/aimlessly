/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLTexture} texture
 * @param {number} uSampler
 * @param {HTMLImageElement} img
 * @param {number} num
 */
const loadTexture = (gl, texture, uSampler, img, num) => {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 对纹理对象进行Y轴反转
  gl.activeTexture(gl.TEXTURE0 + num); // 开启0号纹理单元
  gl.bindTexture(gl.TEXTURE_2D, texture); // 向target绑定纹理对象
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 配置纹理参数
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); // 配置纹理图像
  gl.uniform1i(uSampler, num); // 将0号纹理传递给着色器
};

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {number} n
 */
const initTextures = (gl, program, n) => {
  const texture0 = gl.createTexture();
  const texture1 = gl.createTexture();
  const uSmapler0 = gl.getUniformLocation(program, 'u_Sampler0');
  const uSmapler1 = gl.getUniformLocation(program, 'u_Sampler1');
  const img = new Image();
  const img1 = new Image();
  const promises = [
    new Promise(resolve => {
      img.onload = () => {
        loadTexture(gl, texture0, uSmapler0, img, 0);
        resolve();
      };
    }),
    new Promise(resolve => {
      img1.onload = () => {
        loadTexture(gl, texture1, uSmapler1, img1, 1);
        resolve();
      };
    }),
  ];
  Promise.all(promises).then(() => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
  });

  img.src = '../resources/sky.jpg';
  img1.src = '../resources/circle.gif';
};

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const verticesTexCoords = new Float32Array([
    -0.5, 0.5, 0, 1, -0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0, 0.5, 0.5, 1, 1,
  ]);
  const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  const n = 4;
  const verticesTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(aPosition);

  const aTexCoord = gl.getAttribLocation(program, 'a_TexCoord');
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(aTexCoord);
  return n;
};

const main = () => {
  const { gl, canvas } = getWebGLContext('webgl');

  const vertexSource = /*glsl*/ `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `;
  const fragmentSource = /*glsl*/ `
    #ifdef GL_ES
    precision mediump float;
    #endif
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    varying vec2 v_TexCoord;
    void main() {
      vec4 color0 = texture2D(u_Sampler0, v_TexCoord);
      vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
      gl_FragColor = color0 * color1;
    }
  `;

  const program = initShader(gl, vertexSource, fragmentSource);
  console.log(program);
  const n = initVertexBuffer(gl, program);
  gl.clearColor(0, 0, 0, 1);
  initTextures(gl, program, n);
};
main();
