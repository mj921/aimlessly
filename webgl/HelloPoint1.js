const gl = getWebGLContext('webgl');

const vertexSource = `
  void main() {
    gl_Position = vec4(0.5, 0.5, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`;

const fragmentSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

initShader(gl, vertexSource, fragmentSource);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
