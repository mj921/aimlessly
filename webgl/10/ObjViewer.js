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
const loadObj = src => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status !== 404) {
        resolve(xhr.responseText);
      }
    };
    xhr.open('GET', src);
    xhr.send();
  });
};
const mqoVertexReg = /(?<=\sV\()(\d+)(?:\s+(\d+)){2,}(?=\))/g;
const mqoColReg = /(?<=\scol\()(\d+(?:\.\d+))(?:\s+(\d+(?:\.\d+))){2,}(?=\))/g;
const mqoMaterialReg = /(?<=\sM\()([^)]+)(?=\))/g;
const readMqo = async src => {
  const res = await loadObj(src);
  const lines = res.split('\n');
  const stack = [];
  const model = {
    objs: [],
    scene: {},
    material: {},
    materialNames: [],
  };
  let obj = null;
  let currentMaterial = null;
  let item = lines.shift();

  while (item) {
    const items = item.replace(/(^[\s\r]+|[\s\r]+$)/g, '').split(/\s+/);
    switch (items[0]) {
      case 'Scene':
      case 'vertex':
      case 'Material':
        stack.unshift(items[0]);
        break;
      case '}':
        const flag = stack.shift();
        break;
      case 'pos':
      case 'lookat':
      case 'head':
      case 'pich':
      case 'ortho':
      case 'zoom2':
      case 'amb':
        model.scene[items[0]] = items.slice(1).map(el => +el);
        break;
      case 'Object':
        if (obj) {
          obj.materials.push(currentMaterial);
          model.objs.push(obj);
        }
        obj = {
          materials: [],
          v: [],
          vn: [],
          vt: [],
        };
        obj.objName = items[1].replace(/['"]/g, '');
        stack.unshift('Object');
        break;
      case 'visible':
      case 'locking':
      case 'shading':
      case 'facet':
      case 'color':
      case 'color_type':
        obj[items[0]] = items.slice(1).map(el => +el);
        break;
      case 'face':
        stack.unshift(items[0]);
        if (currentMaterial) {
          obj.materials.push(currentMaterial);
        }
        currentMaterial = {
          faces: [],
          normals: [],
          textures: [],
          colors: [],
        };
        break;
      default:
        if (stack[0] === 'vertex') {
          obj.v.push(...items.map(el => el / (obj.facet?.[0] || 1)));
        } else if (stack[0] === 'Material') {
          model.materialNames.push(items[0]);
          model.material[items[0]] = {
            name: items[0],
            Kd: (item.match(mqoColReg)?.[0]?.split(/\s+/) || []).map(el => +el),
          };
        } else if (stack[0] === 'face') {
          const faces = (item.match(mqoVertexReg)?.[0]?.split(/\s+/) || []).map(
            el => +el
          );
          const textures = [];
          const normals = [];
          let color = obj.color ?? [1, 0, 0, 1];
          const materialName =
            model.materialNames[+(item.match(mqoMaterialReg) || '-1')];
          if (materialName) {
            color = model.material[materialName]?.Kd;
          }
          currentMaterial.colors.push(...color, ...color);
          if (faces.length > 3) {
            for (let i = 0, len = faces.length - 2; i < len; i++) {
              currentMaterial.faces.push(faces[0], faces[i + 1], faces[i + 2]);
              currentMaterial.textures.push(
                textures[0],
                textures[i + 1],
                textures[i + 2]
              );
              currentMaterial.normals.push(
                normals[0],
                normals[i + 1],
                normals[i + 2]
              );
              currentMaterial.colors.push(...color);
            }
          } else {
            currentMaterial.faces.push(...faces);
            currentMaterial.textures.push(...textures);
            currentMaterial.normals.push(...normals);
            currentMaterial.colors.push(...color);
          }
        }
    }
    item = lines.shift();
  }
  obj.materials.push(currentMaterial);
  model.objs.push(obj);
  return model;
};
const readMtl = async src => {
  const res = await loadObj(src);
  const lines = res.split('\n');
  const mtl = {};
  let currentMtl = null;
  let name = '';
  let item = lines.shift();
  while (item) {
    const items = item.replace(/\r/g, '').split(/\s+/);
    switch (items[0]) {
      case 'newmtl':
        if (currentMtl && name) {
          mtl[name] = currentMtl;
        }
        currentMtl = {};
        name = items[1];
        break;
      case 'Ka':
      case 'Kd':
      case 'Ks':
      case 'Ns':
      case 'Ni':
      case 'd':
      case 'illum':
        currentMtl[items[0]] = items.slice(1).map(el => +el);
        break;
    }
    item = lines.shift();
  }
  if (currentMtl && name) {
    mtl[name] = currentMtl;
  }
  return mtl;
};

const readObj = async src => {
  const basePath = src.replace(/\/[^\/]+\.obj$/, '');
  const res = await loadObj(src);
  const lines = res.split('\n');
  const model = {
    objs: [],
  };
  let obj = null;
  let currentMaterial = null;
  let item = lines.shift();
  while (item) {
    const items = item.replace(/\r/g, '').split(/\s+/);
    switch (items[0]) {
      case 'mtllib':
        model.material = await readMtl(basePath + '/' + items[1]);
        break;
      case 'o':
        if (obj) {
          obj.materials.push(currentMaterial);
          model.objs.push(obj);
        }
        obj = {
          materials: [],
          v: [],
          vn: [],
          vt: [],
        };
        obj.objName = items[1];
        break;
      case 'v':
      case 'vn':
      case 'vnt':
        obj[items[0]].push(...items.slice(1).map(el => +el));
        break;
      case 'usemtl':
        if (currentMaterial) {
          obj.materials.push(currentMaterial);
        }
        currentMaterial = {
          name: items[1],
          faces: [],
          normals: [],
          textures: [],
        };
        break;
      case 'f':
        const faces = [];
        const textures = [];
        const normals = [];
        items.slice(1).forEach(el => {
          const arr = el.split('/');
          if (arr[0]) {
            faces.push(arr[0] - 1);
          }
          if (arr[1]) {
            textures.push(arr[1] - 1);
          }
          if (arr[2]) {
            normals.push(arr[2] - 1);
          }
        });
        if (faces.length > 3) {
          for (let i = 0, len = faces.length - 2; i < len; i++) {
            currentMaterial.faces.push(faces[0], faces[i + 1], faces[i + 2]);
            currentMaterial.textures.push(
              textures[0],
              textures[i + 1],
              textures[i + 2]
            );
            currentMaterial.normals.push(
              normals[0],
              normals[i + 1],
              normals[i + 2]
            );
          }
        } else {
          currentMaterial.faces.push(...faces);
          currentMaterial.textures.push(...textures);
          currentMaterial.normals.push(...normals);
        }
        break;
    }
    item = lines.shift();
  }
  obj.materials.push(currentMaterial);
  model.objs.push(obj);
  return model;
};

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {number[]} vertexsData
 */
const initVertexBuffer = (gl, program, vertexsData, ) => {
  const vertexs = new Float32Array(vertexsData);
  // const colors = new Float32Array([
  //   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  // ]);
  // const normals = new Float32Array([
  //   0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
  //   -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
  //   0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  // ]);
  initArrayBuffer(gl, program, vertexs, 'a_Position', 3, gl.FLOAT);

  // initArrayBuffer(gl, program, colors, 'a_Color', 3, gl.FLOAT);
};

/**
 *
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} program
 * @param {number[]} inditicesData
 */
const initIndicesBuffer = (gl, inditicesData) => {
  const indices = new Uint8Array(inditicesData);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  return indices.length;
};

const main = () => {
  const vertexSource = /*glsl*/ `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform vec3 u_AmbientLight;
    uniform mat4 u_MvpMatrix;
    varying vec4 v_Color;
    void main() {
      gl_Position = u_MvpMatrix * a_Position;
      // vec3 ambient = u_AmbientLight * a_Color.rgb;
      v_Color = vec4(ambient, a_Color.a);
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

  loadObj('../resources/kaeru.mqo').then(res => {
    const doc = new MQODoc();
    doc.parse(res);
    console.log(doc);
  });
  // readObj('../resources/cube.obj').then(modelData => {
  readMqo('../resources/kaeru.mqo').then(modelData => {
    console.log(modelData);
    initVertexBuffer(gl, program, modelData.objs[0].v);
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
    gl.uniform3fv(
      uLightDirection,
      new Vector3([0.5, 3, 4]).normalize().elements
    );
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
      modalMatrix.setRotate(rotateY, 0, 1, 0).rotate(rotateX, 1, 0, 0);
      normalMatrix.setInverseOf(modalMatrix).transpose();
      mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modalMatrix);
      gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);
      gl.uniformMatrix4fv(uNormalMatrix, false, normalMatrix.elements);
      let n = initIndicesBuffer(gl, modelData.objs[0].materials[0].faces);
      gl.uniform4f(
        uColor,
        ...(modelData.material[modelData.objs[0].materials?.[0]?.name]?.Kd || [
          1, 0, 0, 1,
        ])
      );
      gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
      // n = initIndicesBuffer(gl, modelData.objs[0].materials[1].faces);
      // gl.uniform4f(
      //   uColor,
      //   ...(modelData.material[modelData.objs[0].materials?.[1]?.name]?.Kd || [
      //     0, 0, 0, 1,
      //   ]),
      //   1
      // );
      // gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
      // rotateX += Math.PI / 180 * 10
      requestAnimationFrame(loop);
    };
    loop();
  });
};
console.time();
main();
console.timeEnd();
const inddd = new Uint16Array([1, 2, 3]);
console.log(inddd, inddd.type, Uint16Array.name);
