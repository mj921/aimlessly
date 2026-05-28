let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['木棍'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
  { name: '木棍', power: 5 },
  { name: '匕首', power: 30 },
  { name: '钉锤', power: 50 },
  { name: '剑', power: 100 },
];
const monsters = [
  {
    name: '史莱姆',
    level: 2,
    health: 15,
  },
  {
    name: '尖牙野兽',
    level: 8,
    health: 60,
  },
  {
    name: '龙',
    level: 20,
    health: 300,
  },
];
const locations = [
  {
    name: 'town square',
    'button text': ['去商店', '去山洞', '与巨龙战斗'],
    'button functions': [goStore, goCave, fightDragon],
    text: '你在小镇广场。你看到一个招牌上面写着“商店”。',
  },
  {
    name: 'store',
    'button text': [
      '购买10HP（10金币）',
      '购买武器（30金币）',
      '去小镇广场',
    ],
    'button functions': [buyHealth, buyWeapon, goTown],
    text: '您进入商店。',
  },
  {
    name: 'cave',
    'button text': ['打史莱姆', '打尖牙野兽', '去小镇广场'],
    'button functions': [fightSlime, fightBeast, goTown],
    text: '您进入山洞。你看到了一些怪物。',
  },
  {
    name: 'fight',
    'button text': ['攻击', '闪避', '逃跑'],
    'button functions': [attack, dodge, goTown],
    text: '你正在与怪物战斗。',
  },
  {
    name: 'kill monster',
    'button text': [
      '去小镇广场',
      '去小镇广场',
      '去小镇广场',
    ],
    'button functions': [goTown, goTown, easterEgg],
    text: '怪物死前大喊“啊！”。 你获得了经验和金币。',
  },
  {
    name: 'lose',
    'button text': ['重玩？', '重玩？', '重玩？'],
    'button functions': [restart, restart, restart],
    text: '你死了。 &#x2620;',
  },
  {
    name: 'win',
    'button text': ['重玩？', '重玩？', '重玩？'],
    'button functions': [restart, restart, restart],
    text: '你打败了巨龙！ 你赢得了这个游戏！ &#x1F389;',
  },
  {
    name: 'easter egg',
    'button text': ['2', '8', '去小镇广场?'],
    'button functions': [pickTwo, pickEight, goTown],
    text: '你发现了一个秘密游戏。在上面选一个数字。将在0和10之间随机选择十个数字。如果你选择的数字与其中一个随机数匹配，你就赢了！',
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = '你没有足够的金币购买HP。';
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = '你获得了' + newWeapon + '.';
      inventory.push(newWeapon);
      text.innerText += '你的库存中有：' + inventory;
    } else {
      text.innerText = '你没有足够的金币购物武器。';
      button2.innerText = '出售武器（15金币）';
      button2.onclick = sellWeapon;
    }
  } else {
    text.innerText = '你已经有了最强的武器！';
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = '你出售了' + currentWeapon + '。';
    text.innerText += '你的库存中有:：' + inventory;
  } else {
    text.innerText = "不能出售你唯一的武器!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + '攻击。';
  text.innerText +=
    '你使用' + weapons[currentWeapon].name + '攻击。';
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += '你未命中。';
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += '你的 ' + inventory.pop() + ' 损坏了。';
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = '你躲避了' + monsters[fighting].name + '的攻击';
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ['木棍'];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = '你选择 ' + guess + '. 这是你的随机数:\n';
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + '\n';
  }
  if (numbers.includes(guess)) {
    text.innerText += '正确! 你赢得了20金币!';
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += '错误! 你失去了10生命!';
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
