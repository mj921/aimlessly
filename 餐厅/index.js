class Restaurant {
  cash = 0;
  seats = 0;
  staff = [];
  constructor({ cash, seats, staff }) {
    this.cash = cash;
    this.seats = seats;
    this.staff = staff;
  }
  hire(staff) {
    this.staff.push(staff);
  }
  fire(staff) {
    const index = this.staff.indexOf(staff);
    if (index > -1) {
      this.staff.splice(index, 1);
    }
  }
}

class Staff {
  static ID = 0;
  id = 0;
  name = '';
  salary = 0;
  constructor(name, salary) {
    this.id = ++Staff.ID;
    this.name = name;
    this.salary = salary;
  }
  work() {
    console.log('完成一次工作');
  }
}

class Waiter extends Staff {
  static instance;
  constructor(name, salary) {
    if (Waiter.instance) {
      return Waiter.instance;
    }
    super(name, salary);
    Waiter.instance = this;
  }
  work(dish) {
    if (dish instanceof Array) {
      console.log('点菜');
    } else {
      console.log('上菜');
    }
  }
}

class Cook extends Staff {
  static instance;
  constructor(name, salary) {
    if (Cook.instance) {
      return Cook.instance;
    }
    super(name, salary);
    Cook.instance = this;
  }
  work(dish) {
    console.log('烹饪出菜品');
  }
}

class Customer {
  constructor() {}
  orderDishes() {
    console.log('点菜');
  }
  eat() {
    console.log('吃');
  }
}

class Dish {
  name = '';
  cost = 0;
  price = 0;
  constructor(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
  }
}
