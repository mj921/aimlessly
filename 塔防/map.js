class GameMap {
    constructor (lv) {
        this.lv = lv || 1;
        this.mapData = MapData[this.lv - 1];
        this.data = this.mapData.map;
        this.mapPathData = this.data.map(row => {
            return row.map(item => {
                return true;
            })
        })
        this.money = this.mapData.money;
        this.life = this.mapData.life;
        this.startP = this.mapData.start;
        this.data[this.startP[0]][this.startP[1]] = -1;
        this.endP = this.mapData.end;
        this.data[this.endP[0]][this.endP[1]] = 9;
        this.path = [];
        this.enemy = this.mapData.enemy.map((wave, i) => {
            return wave.map((enemy, j) => {
                let e = new Enemy(enemy, this.startP[1] * Config.MapSize + Config.MapSize / 2, this.startP[0] * Config.MapSize + Config.MapSize / 2, 3);
                e.pathIndex = 0;
                e.showTime = this.mapData.enemyTime[i][j];
                e.showFlag = false;
                return e;
            })
        });
        this.showEnemy = [];
        this.time = 0;
        this.wave = 0;
        this.tower = [];
        this.bullet = [];
    }
    draw (ctx) {
        ctx.clear();
        this.data.forEach((row, j) => {
            row.forEach((item, i) => {
                if (item === 1 || item === 2) {
                    ctx.drawImage(load.getImg("bg"), i * Config.MapSize, j * Config.MapSize, Config.MapSize, Config.MapSize);
                }
            })
        })
    }
    isPutDownTower (x, y) {
        return x >= 0 && y >= 0 && x < this.data[0].length && y < this.data.length && this.data[y][x] === 1;
    }
    createPath () {
        this.path = [];
        this.path.push(this.startP);
        let p = [].concat(this.startP);
        this.mapPathData[this.startP[0]][this.startP[1]] = false;
        let n = 0;
        while(this.data[p[0]][p[1]] !== 9 && n < 1000) {
            n++;
            if (p[0] - 1 >= 0 && this.data[p[0] - 1][p[1]] !== 1 && this.mapPathData[p[0] - 1][p[1]]) {
                p = [p[0] - 1, p[1]];
            } else if (p[0] + 1 < this.data.length && this.data[p[0] + 1][p[1]] !== 1 && this.mapPathData[p[0] + 1][p[1]]) {
                p = [p[0] + 1, p[1]];
            } else if (p[1] - 1 >= 0 && this.data[p[0]][p[1] - 1] !== 1 && this.mapPathData[p[0]][p[1] - 1]) {
                p = [p[0], p[1] - 1];
            } else if (p[1] + 1 < this.data[0].length && this.data[p[0]][p[1] + 1] !== 1 && this.mapPathData[p[0]][p[1] + 1]) {
                p = [p[0], p[1] + 1];
            }
            this.mapPathData[p[0]][p[1]] = false;
            this.path.push([p[0], p[1]])
        }
    }
    init () {
        this.createPath();
    }
    moveEnemy () {
        for (let i = 0; i < this.showEnemy.length;) {
            let enemy = this.showEnemy[i];
            enemy.move();
            if (enemy.isReachTarget()) {
                if (enemy.pathIndex === this.path.length - 1) {
                    enemy.stop();
                    this.life -= enemy.atk;
                    this.showEnemy.splice(i, 1);
                } else {
                    enemy.pathIndex++;
                    let d;
                    if (this.path[enemy.pathIndex][0] - this.path[enemy.pathIndex - 1][0] > 0) {
                        d = 3;
                    } else if (this.path[enemy.pathIndex][0] - this.path[enemy.pathIndex - 1][0] < 0) {
                        d = 1;
                    } else if (this.path[enemy.pathIndex][1] - this.path[enemy.pathIndex - 1][1] > 0) {
                        d = 2;
                    } else if (this.path[enemy.pathIndex][1] - this.path[enemy.pathIndex - 1][1] < 0) {
                        d = 0;
                    }
                    enemy.setDirection(d);
                    enemy.setTarget(this.path[enemy.pathIndex]);
                    i++;
                }
            } else {
                i++;
            }
        }
    }
    drawEnemy (ctx) {
        this.showEnemy.forEach(enemy => {
            enemy.draw(ctx);
        })
    }
    addTower (tower) {
        this.tower.push(tower);
        this.money -= tower.price;
        this.data[(tower.y - 50) / 100][(tower.x - 50) / 100] = 2;
    }
    drawTower (ctx) {
        this.tower.forEach(tower => {
            tower.draw(ctx);
        })
    }
    moveBullet (ctx) {
        this.bullet.forEach(bullet => {
            bullet.move();
        })
    }
    drawBullet (ctx) {
        this.bullet.forEach(bullet => {
            bullet.draw(ctx);
        })
    }
    atkEnemy () {
        this.tower.forEach(tower => {
            if (tower.atkFlag) {
                for (let i = 0; i < this.showEnemy.length; i++) {
                    if (isCollisionCircleAndRect(tower.x, tower.y, tower.range, this.showEnemy[i].x, this.showEnemy[i].y, this.showEnemy[i].x, this.showEnemy[i].y + this.showEnemy[i].size / 2, this.showEnemy[i].x + this.showEnemy[i].size / 2, this.showEnemy[i].y)) {
                        tower.atkFlag = false;
                        this.bullet.push(tower.attack(this.showEnemy[i]));
                        setTimeout(() => {
                            tower.atkFlag = true;
                        }, tower.atkInterval);
                        break;
                    }
                }
            }
        });
    }
    removeBullet () {
        for (let i = 0; i < this.bullet.length;) {
            if (this.bullet[i].isShow) {
                i++;
            } else {
                this.bullet.splice(i, 1);
            }
        }
    }
    removeEnemy () {
        for (let i = 0; i < this.showEnemy.length;) {
            if (this.showEnemy[i].hp > 0) {
                i++;
            } else {
                this.money += this.showEnemy[i].price;
                this.showEnemy.splice(i, 1);
            }
        }
    }
    drawInfo (ctx) {
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(206, 206, 206, 0.7)";
        ctx.fillRect(Config.InfoX, Config.InfoY, 500, 100)
        ctx.fillStyle = "#000";
        ctx.font = "64px";
        ctx.fillText(`金钱：${this.money}`, Config.InfoX + 20, 20);
        ctx.fillText(`生命：${this.life}`, Config.InfoX + 220, 20);
    }
    loop (enemyCtx, towerCtx, bulletCtx, infoCtx) {
        enemyCtx.clear();
        towerCtx.clear();
        bulletCtx.clear();
        infoCtx.clear();
        this.time += 1000 / 60;
        for (let i = 0; i <= this.wave; i++) {
            this.enemy[i].forEach(enemy => {
                if (enemy.showTime <= this.time && !enemy.showFlag) {
                    this.showEnemy.push(enemy);
                    enemy.showFlag = true;
                    enemy.setTarget(this.path[enemy.pathIndex]);
                }
            })
        }
        this.moveEnemy();
        this.removeEnemy();
        this.drawEnemy(enemyCtx);
        this.drawTower(towerCtx);
        this.atkEnemy();
        this.moveBullet()
        this.removeBullet();
        this.drawBullet(bulletCtx);
        this.drawInfo(infoCtx);
    }
}