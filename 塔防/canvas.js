var baseWidth = window.innerWidth;
var baseHeight = window.innerHeight;

class Canvas {
    constructor () {
        this.canvas = document.createElement("canvas");
        this.canvas.width = baseWidth;
        this.canvas.height = baseHeight;
        this.canvas.style.width = baseWidth + "px";
        this.canvas.style.height = baseHeight + "px";
        this.canvas.style.position = "absolute";
        if (Canvas.canvasNum > 0) {
            this.canvas.style.left = "-1000%";
            this.canvas.style.top = "-1000%";
        } else {
            this.canvas.style.left = "50%";
            this.canvas.style.top = "50%";
            this.canvas.style.marginTop = -baseHeight / 2 + "px";
            this.canvas.style.marginLeft = -baseWidth / 2 + "px";
        }
        Canvas.canvasNum++;
        document.body.appendChild(this.canvas);
    }
    getCtx () {
        return new Ctx(this.canvas);
    }
    addEventListener (eventName, fn, useCapture = false) {
        this.canvas.addEventListener(eventName, fn, useCapture);
    }
    removeEventListener (eventName, fn, useCapture = false) {
        this.canvas.removeEventListener(eventName, fn, useCapture);
    }
}
Canvas.canvasNum = 0;

class Ctx {
    constructor (canvas) {
        if (canvas instanceof Canvas) {
            this.ctx = canvas.canvas.getContext("2d");
        } else {
            this.ctx = canvas.getContext("2d");
        }
        this.defineProperty();
        this.lineWidth = Ctx.scale;
        this.translateX = 0;
        this.translateY = 0;
    }
    clear () {
        this.ctx.clearRect(-this.translateX, -this.translateY, baseWidth, baseHeight);
    }
    clearRect (x, y, width, height) {
        this.ctx.clearRect(x * Ctx.scale, y * Ctx.scale, width * Ctx.scale, height * Ctx.scale);
    }
    rect (x, y, width, height) {
        this.ctx.rect(x * Ctx.scale, y * Ctx.scale, width * Ctx.scale, height * Ctx.scale);
    }
    fillRect (x, y, width, height) {
        this.ctx.fillRect(x * Ctx.scale, y * Ctx.scale, width * Ctx.scale, height * Ctx.scale);
    }
    strokeRect (x, y, width, height) {
        this.ctx.strokeRect(x * Ctx.scale, y * Ctx.scale, width * Ctx.scale, height * Ctx.scale);
    }
    createLinearGradient (x0, y0, x1, y1) {
        return this.ctx.createLinearGradient(x0 * Ctx.scale, y0 * Ctx.scale, x1 * Ctx.scale, y1 * Ctx.scale);
    }
    createPattern (image, repeatType) {
        return this.ctx.createPattern(image, repeatType);
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
        return this.ctx.createRadialGradient(x0 * Ctx.scale, y0 * Ctx.scale, r0 * Ctx.scale, x1 * Ctx.scale, y1 * Ctx.scale, r1 * Ctx.scale);
    }
    fill () {
        this.ctx.fill();
    }
    stroke () {
        this.ctx.stroke();
    }
    beginPath () {
        this.ctx.beginPath();
    }
    moveTo (x, y) {
        this.ctx.moveTo(x * Ctx.scale, y * Ctx.scale);
    }
    closePath () {
        this.closePath();
    }
    lineTo (x, y) {
        this.ctx.lineTo(x * Ctx.scale, y * Ctx.scale);
    }
    clip () {
        this.ctx.clip();
    }
    quadraticCurveTo (cpx, cpy, x, y) {
        this.ctx.quadraticCurveTo(cpx * Ctx.scale, cpy * Ctx.scale, x * Ctx.scale, y * Ctx.scale);
    }
    bezierCurveTo (cp1x, cp1y, cp2x, cp2y, x, y) {
        this.ctx.bezierCurveTo(cp1x * Ctx.scale, cp1y * Ctx.scale, cp2x * Ctx.scale, cp2y * Ctx.scale, x * Ctx.scale, y * Ctx.scale);
    }
    arc (x, y, r, sAngle, eAngle, counterclockwise = false) {
        this.ctx.arc(x * Ctx.scale, y * Ctx.scale, r * Ctx.scale, sAngle, eAngle, counterclockwise);
    }
    arcTo (x1, y1, x2, y2, r) {
        this.arcTo(x1 * Ctx.scale, y1 * Ctx.scale, x2 * Ctx.scale, y2 * Ctx.scale, r * Ctx.scale);
    }
    isPointInPath(x, y) {
        return this.ctx.isPointInPath(x * Ctx.scale, y * Ctx.scale);
    }
    scale (scalewidth, scaleheight) {
        this.ctx.Ctx.scale(Ctx.scalewidth, Ctx.scaleheight);
    }
    rotate (angle) {
        this.ctx.rotate(angle);
    }
    translate (x, y) {
        this.translateX += x * Ctx.scale;
        this.translateY += y * Ctx.scale;
        this.ctx.translate(x * Ctx.scale, y * Ctx.scale);
    }
    transform (a, b, c, d, e, f) {
        this.ctx.transform(a, b, c, d, e * Ctx.scale, f * Ctx.scale);
    }
    setTransform (a, b, c, d, e, f) {
        this.ctx.setTransform(a, b, c, d, e * Ctx.scale, f * Ctx.scale);
    }
    fillText (text, x, y, maxWidth) {
        if (maxWidth) {
            maxWidth = maxWidth * Ctx.scale;
        }
        this.ctx.fillText(text, x * Ctx.scale, y * Ctx.scale, maxWidth);
    }
    strokeText (text, x, y, maxWidth) {
        if (maxWidth) {
            maxWidth = maxWidth * Ctx.scale;
        }
        this.ctx.strokeText(text, x * Ctx.scale, y * Ctx.scale, maxWidth);
    }
    measureText (text) {
        return this.ctx.measureText(text);
    }
    drawImage (img) {
        if (img instanceof Canvas) {
            arguments[0] = img.canvas;
        }
        if (arguments.length === 3) {
            arguments[1] = arguments[1] * Ctx.scale;
            arguments[2] = arguments[2] * Ctx.scale;
            this.ctx.drawImage.apply(this.ctx, arguments);
        } else if (arguments.length === 5) {
            for (let i = 1; i < arguments.length; i++) {
                arguments[i] = arguments[i] * Ctx.scale;
            }
            this.ctx.drawImage.apply(this.ctx, arguments);
        } else if (arguments.length === 9) {
            for (let i = 5; i < arguments.length; i++) {
                arguments[i] = arguments[i] * Ctx.scale;
            }
            this.ctx.drawImage.apply(this.ctx, arguments);
        }
    }
    createImageData (width, height) {
        if (typeof width === "object") {
            return this.ctx.createImageData(width)
        }
        return this.ctx.createImageData(width * Ctx.scale, height * Ctx.scale);
    }
    getImageData (x, y, width, height) {
        return this.ctx.getImageData(x * Ctx.scale, y * Ctx.scale, width * Ctx.scale, height * Ctx.scale);
    }
    putImageData () {
        for (let i = 3; i < arguments.length; i++) {
            arguments[i] = arguments[i] * Ctx.scale;
        }
        this.ctx.putImageData.apply(this.ctx, arguments);
    }
    save () {
        this.ctx.save();
    }
    restore () {
        this.ctx.restore();
    }
    defineProperty () {
        let me = this;
        let params = ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "lineCap", "lineJoin", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation"]
        let paramsScale = ["shadowOffsetX", "shadowOffsetY", "lineWidth"]
        params.forEach(param => {
            Object.defineProperty(this, param, {
                configurable: true,
                enumerable: true,
                set (val) {
                    me.ctx[param] = val;
                },
                get () {
                    return me.ctx[param];
                }
            })
        })
        paramsScale.forEach(param => {
            Object.defineProperty(this, param, {
                configurable: true,
                enumerable: true,
                set (val) {
                    me.ctx[param] = val * Ctx.scale;
                },
                get () {
                    return me.ctx[param];
                }
            })
        })
    }
}
Ctx.scale = Config.CtxScale;