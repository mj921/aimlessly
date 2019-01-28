class Bullet {
    constructor (x, y, atk, magicAtk, speed, enemy) {
        this.x = x;
        this.y = y;
        this.atk = atk;
        this.magicAtk = magicAtk;
        this.speed = speed;
        this.enemy = enemy;
        this.r = Config.BulletSize;
        this.isShow = true;
    }

    draw (ctx) {
        if (this.isShow) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    move () {
        this.x += this.speed * (this.enemy.x - this.x) / Math.pow(Math.pow(this.x - this.enemy.x, 2) + Math.pow(this.x - this.enemy.x, 2), 0.5);
        this.y += this.speed * (this.enemy.y - this.y) / Math.pow(Math.pow(this.y - this.enemy.y, 2) + Math.pow(this.y - this.enemy.y, 2), 0.5);
        if (isCollisionCircleAndRect(this.x, this.y, this.r, this.enemy.x, this.enemy.y, this.enemy.x, this.enemy.y + this.enemy.size / 2, this.enemy.x + this.enemy.size / 2, this.enemy.y)) {
            let atk = this.atk - this.enemy.def;
            let magicAtk = this.magicAtk - this.enemy.magicDef;
            atk = atk > 0 ? atk : 0;
            magicAtk = magicAtk > 0 ? magicAtk : 0;
            atk = atk + magicAtk;
            atk = atk > 1 ? atk : 1;
            this.enemy.hp -= atk;
            this.isShow = false;
        }
    }
}