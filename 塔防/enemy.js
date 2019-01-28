class Enemy {
    constructor (type, x, y, direction) {
        this.enemyData = EnemyData[type];
        this.hp = this.enemyData.hp;
        this.maxHp = this.enemyData.hp;
        this.atk = this.enemyData.atk;
        this.def = this.enemyData.def;
        this.magicDef = this.enemyData.magicDef;
        this.speed = this.enemyData.speed;
        this.img = this.enemyData.img;
        this.price = this.enemyData.price;
        this.status = 0;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.target = [];
        this.moveFlag = true;
        this.size = Config.EnemySize;
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.drawImage(load.getImg("enemy"), this.img * this.size, this.status * this.size, this.size, this.size, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    setTarget (target) {
        this.target = target;
    }
    setDirection (direction) {
        this.direction = direction;
    }

    isReachTarget () {
        switch (this.direction) {
            case 0:
                return this.x <= this.target[1] * 100 + 50;
            case 1:
                return this.y <= this.target[0] * 100 + 50;
            case 2:
                return this.x >= this.target[1] * 100 + 50;
            case 3:
                return this.y >= this.target[0] * 100 + 50;
            default:
                return false;
        }
    }
    move () {
        if (this.moveFlag) {
            switch (this.direction) {
                case 0:
                    this.x -= this.speed;
                    break;
                case 1:
                    this.y -= this.speed;
                    break;
                case 2:
                    this.x += this.speed;
                    break;
                case 3:
                    this.y += this.speed;
                    break;
            }
        }
    }

    stop () {
        this.moveFlag = false;
    }
}