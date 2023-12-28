const fs = require('fs');

const buff = fs.readFileSync('african_head_diffuse.tga');

const readUIntLE = (input, offset, byteLength, noAssert) => {
  offset = offset | 0;
  byteLength = byteLength | 0;

  var val = input[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += input[offset + i] * mul;
  }

  return val;
};

const tga = {
  idLength: readUIntLE(buff, 0, 1),
  colorMapType: readUIntLE(buff, 1, 1),
  imageType: readUIntLE(buff, 2, 1),
  colorMapOrigin: readUIntLE(buff, 3, 2),
  colorMapLength: readUIntLE(buff, 5, 2),
  colorMapDepth: readUIntLE(buff, 7, 1),
  imageXOrigin: readUIntLE(buff, 8, 2),
  imageYOrigin: readUIntLE(buff, 10, 2),
  imageWidth: readUIntLE(buff, 12, 2),
  imageHeight: readUIntLE(buff, 14, 2),
  imageDepth: readUIntLE(buff, 16, 1),
  descriptor: readUIntLE(buff, 17, 1),
  alphaDepth: this.descriptor & 0x0f,
  leftToRight: (this.descriptor & 0x10) === 0,
  topToBottom: (this.descriptor & 0x20) > 0,
  interleave: this.descriptor & 0xc0,
};

console.log(tga);
