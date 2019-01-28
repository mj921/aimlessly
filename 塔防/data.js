const EnemyData = {
    0: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 0
    },
    1: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 2,
        price: 50,
        img: 1
    },
    2: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 3,
        price: 50,
        img: 2
    },
    3: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 4,
        price: 50,
        img: 3
    },
    4: {
        hp: 50,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 5,
        price: 50,
        img: 4
    },
    5: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 5
    },
    6: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 6
    },
    7: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 7
    },
    8: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 8
    },
    9: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 9
    },
    10: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 10
    },
    11: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 11
    },
    12: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 12
    },
    13: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 13
    },
    14: {
        hp: 100,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 14
    },
    15: {
        hp: 1000,
        atk: 1,
        def: 0,
        magicDef: 0,
        speed: 1,
        price: 50,
        img: 15
    }
}
const TowerData = {
    0: {
        atk: 20,
        magicAtk: 0,
        atkSpeed: 2,
        bulletSpeed: 8,
        range: 100,
        price: 40,
        img: 0
    },
    1: {
        atk: 50,
        magicAtk: 0,
        atkSpeed: 1,
        bulletSpeed: 8,
        range: 100,
        price: 80,
        img: 1
    },
    2: {
        atk: 60,
        magicAtk: 1,
        atkSpeed: 0.5,
        bulletSpeed: 8,
        range: 200,
        price: 100,
        img: 2
    },
    3: {
        atk: 40,
        magicAtk: 1,
        atkSpeed: 2,
        bulletSpeed: 8,
        range: 100,
        price: 120,
        img: 3
    },
    4: {
        atk: 60,
        magicAtk: 1,
        atkSpeed: 2,
        bulletSpeed: 8,
        range: 150,
        price: 150,
        img: 4
    }
}
const MapData = {
    0: {
        map: [
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: [0, 2],
        end: [0, 14],
        enemy: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
        enemyTime: [[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000]],
        money: 100,
        life: 10
    }
}