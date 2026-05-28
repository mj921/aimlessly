/**
 *
 * @param {string} id
 * @returns {{gl: WebGL2RenderingContext; canvas: HTMLCanvasElement}}
 */
const getWebGLContext = id => {
  const canvas = document.getElementById(id);
  return { gl: canvas.getContext('webgl2'), canvas };
};

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {string} source 
 * @param {number} shaderType 
 */
const loadShader = (gl, source, shaderType) => {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 * @returns 
 */
const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }
  return program;
}

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 * @returns {WebGLProgram}
 */
const initShader = (gl, vertexSource, fragmentSource) => {
  const vertexShader = loadShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = loadShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);
  return program;
};
