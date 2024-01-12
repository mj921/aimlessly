// 目标类
class Target {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp; // 生命值
  }
}

// 技能类
class Skill {
  constructor(name, damage, manaCost, cooldown, type) {
    this.name = name;
    this.damage = damage; // 伤害
    this.manaCost = manaCost; // 法力消耗
    this.cooldown = cooldown; // 冷却时间
    this.onCooldown = false; // 是否在冷却
    this.type = type; // 技能类型:single(单体)或multi(群体)
  }
  // 使用技能
  use() {
    // 检查法力和冷却时间
    if (this.onCooldown || mana < this.manaCost) return;
    // 消耗法力和触发冷却
    mana -= this.manaCost;
    this.onCooldown = true;
    setTimeout(() => {
      this.onCooldown = false;
    }, this.cooldown * 1000);
    // 产生伤害效果
    console.log(`使用技能:${this.name},造成${this.damage}点伤害!`);
  }
  // 使用技能,增加目标参数
  use(target) {
    if (this.onCooldown || mana < this.manaCost) return;
    mana -= this.manaCost;
    this.onCooldown = true;
    setTimeout(() => {
      this.onCooldown = false;
    }, this.cooldown * 1000);

    // 产生作用效果
    console.log(
      `使用技能:${this.name},对${target.name}造成${this.damage}点伤害!`
    );
    target.hp -= this.damage; // 减去生命值
  }

  // 使用群体技能
  useMulti(targets) {
    if (this.onCooldown || mana < this.manaCost) return;
    mana -= this.manaCost;
    this.onCooldown = true;
    setTimeout(() => {
      this.onCooldown = false;
    }, this.cooldown * 1000);

    // 对所有目标造成伤害
    targets.forEach((target) => {
      console.log(
        `使用技能:${this.name},对${target.name}造成${this.damage}点伤害!`
      );
      target.hp -= this.damage;
    });
  }
}

// 法力系统
let mana = 100;

// 技能列表
let skills = [
  new Skill('火球', 20, 10, 3, 'single'), // 伤害20,消耗10法力,冷却3秒
  new Skill('三角冲击', 15, 20, 5, 'multi'), // 群体技能
  new Skill('霜冻', 15, 20, 5, 'single'),
  new Skill('闪电链', 35, 50, 10, 'multi'),
];

// 两个目标
let target1 = new Target('goblin', 100);
let target2 = new Target('orc', 200);

// 战斗逻辑
function fight() {
  skills[0].use(target1); // 使用火球技能攻击goblin
  skills[1].use(target2); // 使用霜冻技能攻击orc
  // 循环使用技能
  for (let i = 0; i < skills.length; i++) {
    skills[i].use();
  }
}

fight();
