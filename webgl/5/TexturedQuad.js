/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program
 * @param {number} n 
 */
const initTextures = (gl, program, n) => {
  const texture = gl.createTexture();
  const uSmapler = gl.getUniformLocation(program, 'u_Sampler');
  const img = new Image();
  img.onload = () => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 对纹理对象进行Y轴反转
    gl.activeTexture(gl.TEXTURE0); // 开启0号纹理单元
    gl.bindTexture(gl.TEXTURE_2D, texture); // 向target绑定纹理对象
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img); // 配置纹理图像
    gl.uniform1i(uSmapler, 0); // 将0号纹理传递给着色器

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
  }
  img.src = '../resources/sky.jpg';
}

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 */
const initVertexBuffer = (gl, program) => {
  const verticesTexCoords = new Float32Array([
    -0.5, 0.5, -0.3, 1.7, 
    -0.5, -0.5, -0.3, -0.2,
    0.5, -0.5, 1.7, -0.2,
    0.5, 0.5, 1.7, 1.7,
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
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
  `;

  const program = initShader(gl, vertexSource, fragmentSource);
  console.log(program);
  const n = initVertexBuffer(gl, program);
  gl.clearColor(0, 0, 0, 1);
  initTextures(gl, program, n);
};
main();