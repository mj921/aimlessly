class Shader {
  varying_intensity = new Vector3();
  lightDir;
  viewport;
  projection;
  modelView;
  constructor(lightDir, viewport, projection, modelView) {
    this.lightDir = lightDir;
    this.viewport = viewport;
    this.projection = projection;
    this.modelView = modelView;
  }
  vertex(iface, nthvert) {
    const faces = modelJson.f[iface];
    const vv = modelJson.v[faces[nthvert][0]];
    const v = new Vector4(vv[0], -vv[1], vv[2], 1);
    const normal = Vector3.fromArray(
      modelJson.vn[faces[nthvert][2]]
    ).normalize();
    this.varying_intensity.raw(Math.max(0, normal.dot(this.lightDir)), nthvert);
    return v.applyMatrix4(
      this.viewport.clone().multiply(this.projection).multiply(this.modelView)
    );
  }
  fragment(bar) {
    let intensity = this.varying_intensity.dot(bar);
    if (intensity > 0.85) intensity = 1;
    else if (intensity > 0.6) intensity = 0.8;
    else if (intensity > 0.45) intensity = 0.6;
    else if (intensity > 0.3) intensity = 0.45;
    else if (intensity > 0.15) intensity = 0.3;
    else intensity = 0;
    return {
      color: [
        Math.round(255 * intensity),
        Math.round(155 * intensity),
        // Math.round(255 * intensity),
        0,
        255,
      ],
      discard: false,
    };
  }
}
