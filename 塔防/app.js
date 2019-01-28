var mainCanvas = new Canvas();
var mainCtx = mainCanvas.getCtx();
var mapCanvas = new Canvas();
var mapCtx = mapCanvas.getCtx();
var enemyCanvas = new Canvas();
var enemyCtx = enemyCanvas.getCtx();
var towerSelectCanvas = new Canvas();
var towerSelectCtx = towerSelectCanvas.getCtx();
var towerMoveCanvas = new Canvas();
var towerMoveCtx = towerMoveCanvas.getCtx();
var towersCanvas = new Canvas();
var towersCtx = towersCanvas.getCtx();
var bulletCanvas = new Canvas();
var bulletCtx = bulletCanvas.getCtx();
var infoCanvas = new Canvas();
var infoCtx = infoCanvas.getCtx();
var translateX = 0;
var translateY = 0;
var offsetX = 0;
var offsetY = 0;


var load = new Load();
var map = new GameMap(1);
var towers = [];
for (var i = 0; i < 5; i++) {
    towers.push(new Tower(i, Config.TowerSelectX + 100 * i + 50, Config.TowerSelectY + 50));
}
map.init();
load.add("bg", "./images/bg.png");
load.add("btn", "./images/btn.png");
load.add("bullet", "./images/bullet.png");
load.add("enemy", "./images/enemy.png");
load.add("tower", "./images/tower.png");
var init = () => {
    towerSelectCtx.fillStyle = "rgba(206, 206, 206, 0.7)";
    towerSelectCtx.fillRect(Config.TowerSelectX, Config.TowerSelectY, 500, 100)
    towerMoveCtx.globalAlpha = 0.5;
    towers.forEach(tower => {
        tower.draw(towerSelectCtx);
    })
    let currX;
    let currY;
    let currTower;
    const towersMove = (e) => {
        towerMoveCtx.clear();
        currX = e.offsetX / Ctx.scale;
        currY = e.offsetY / Ctx.scale;
        if (map.isPutDownTower(Math.floor((currX - offsetX) / 100), Math.floor((currY - offsetY) / 100))) {
            currTower.x = Math.floor((currX - offsetX) / 100) * 100 + 50;
            currTower.y = Math.floor((currY - offsetY) / 100) * 100 + 50;
        } else {
            currTower.x = currX - offsetX;
            currTower.y = currY - offsetY;
        }
        currTower.draw(towerMoveCtx);
    }
    const towersUp = (e) => {
        mainCanvas.removeEventListener("mousemove", towersMove);
        mainCanvas.removeEventListener("mouseup", towersUp);
        towerMoveCtx.clear();
        currX = e.offsetX / Ctx.scale;
        currY = e.offsetY / Ctx.scale;
        if (map.isPutDownTower(Math.floor((currX - offsetX) / 100), Math.floor((currY - offsetY) / 100))) {
            currTower.x = Math.floor((currX - offsetX) / 100) * 100 + 50;
            currTower.y = Math.floor((currY - offsetY) / 100) * 100 + 50;
            if (map.money >= currTower.price) {
                map.addTower(currTower.clone());
            }
        }
    }
    const mapMove = (e) => {
        let changeX = e.offsetX / Ctx.scale - currX;
        let changeY = e.offsetY / Ctx.scale - currY;
        currX = e.offsetX / Ctx.scale;
        currY = e.offsetY / Ctx.scale;
        translateX += changeX;
        translateY += changeY;
        offsetX += changeX;
        offsetY += changeY;
    }
    const mapUp = (e) => {
        mainCanvas.removeEventListener("mousemove", mapMove);
        mainCanvas.removeEventListener("mouseup", mapUp);
    }
    mainCanvas.addEventListener("mousedown", (e) => {
        currX = e.offsetX / Ctx.scale;
        currY = e.offsetY / Ctx.scale;
        if (currX >= Config.TowerSelectX && currY >= Config.TowerSelectY && currX <= Config.TowerSelectX + 500 && currY <= Config.TowerSelectY + 100) {
            for (let i = 0; i < towers.length; i++) {
                if (Math.abs(towers[i].x - currX) < 40 && Math.abs(towers[i].y - currY) < 40) {
                    currTower = towers[i].clone();
                    break;
                }
            }
            if (currTower) {
                mainCanvas.addEventListener("mousemove", towersMove);
                mainCanvas.addEventListener("mouseup", towersUp);
            }
        } else {
            mainCanvas.addEventListener("mousemove", mapMove);
            mainCanvas.addEventListener("mouseup", mapUp);
        }
    })
}

var loop = () => {
    mainCtx.clear();
    mapCtx.translate(translateX, translateY)
    enemyCtx.translate(translateX, translateY)
    towersCtx.translate(translateX, translateY)
    bulletCtx.translate(translateX, translateY)
    towerMoveCtx.translate(translateX, translateY)
    translateX = 0;
    translateY = 0;
    map.draw(mapCtx);
    map.loop(enemyCtx, towersCtx, bulletCtx, infoCtx);
    mainCtx.drawImage(mapCanvas, 0, 0);
    mainCtx.drawImage(enemyCanvas, 0, 0);
    mainCtx.drawImage(towerSelectCanvas, 0, 0);
    mainCtx.drawImage(towersCanvas, 0, 0);
    mainCtx.drawImage(bulletCanvas, 0, 0);
    mainCtx.drawImage(towerMoveCanvas, 0, 0);
    mainCtx.drawImage(infoCanvas, 0, 0);
    setTimeout(loop, 1000 / 60);
}


load.load()
.then(() => {
    console.log("加载完成");
    try {
        init();
        loop();
    } catch (e) {
        console.error(e)
    }
    
}).catch(() => {
    console.log("加载失败");
})