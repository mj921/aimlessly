class Tower {
    constructor (type, x, y) {
        this.towerData = TowerData[type];
        this.atk = this.towerData.atk;
        this.magicAtk = this.towerData.magicAtk;
        this.atkSpeed = this.towerData.atkSpeed;
        this.atkInterval = Math.floor(1000 / this.atkSpeed);
        this.bulletSpeed = this.towerData.bulletSpeed;
        this.range = this.towerData.range;
        this.price = this.towerData.price;
        this.img = this.towerData.img;
        this.x = x;
        this.y = y;
        this.type = type;
        this.atkFlag = true;
        this.showRange = false;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.drawImage(load.getImg("tower"), this.img * 50, 0, 50, 50, this.x - Config.TowerSize / 2, this.y - Config.TowerSize / 2, Config.TowerSize, Config.TowerSize);
        if (this.showRange) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    attack (enemy) {
        return new Bullet(this.x, this.y, this.atk, this.magicAtk, this.bulletSpeed, enemy);
    }

    clone () {
        return new Tower(this.type, this.x, this.y);
    }
}