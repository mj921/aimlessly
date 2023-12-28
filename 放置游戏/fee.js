class Fee {
    constructor (arr) {
        if (arr && arr instanceof Array && arr.length > 0) {
            arr = arr.map(n => {
                if (typeof n === "number") {
                    if (n < 0) {
                        n = 0;
                    } else if (n > 999) {
                        n = 999;
                    }
                    return n;
                }
                if (typeof n === "string") {
                    n = n.replace(/[^0-9]/g, "")
                    n = +n;
                    if (n < 0) {
                        n = 0;
                    } else if (n > 999) {
                        n = 999;
                    }
                    return n;
                } else {
                    return 0;
                }
            });
            arr = this.removeEndZero(arr);
            if (arr.length === 0) {
                this.arr = [0];
                this.len = 1;
            } else {
                this.arr = [...arr];
                this.len = arr.length;
            }
        } else {
            this.arr = [0];
            this.len = 1;
        }
    }
    // 如果最后一项为 0 则删除 直到最后一项不为 0 或 数组为空
    removeEndZero (arr) {
        let i = arr.length - 1;
        for (; i >= 0; i--) {
            if (arr[i] > 0) {
                break;
            }
        }
        return arr.slice(0, i + 1);
    }
    // 加
    add (fee) {
        if (fee.constructor !== Fee) {
            return this.clone();
        }
        let arr = [];
        let arr1 = [];
        if (this.len > fee.len) {
            arr = [...this.arr];
            arr1 = [...fee.arr];
        } else {
            arr = [...fee.arr];
            arr1 = [...this.arr];
        }
        let carry = 0;
        let i;
        for (i = 0; i < arr1.length; i++) {
            let n = arr[i] + arr1[i] + carry;
            if (n > 999) {
                n %= 1000;
                carry = 1;
            } else {
                carry = 0;
            }
            arr[i] = n;
        }
        while (carry === 1 && i < arr.length) {
            arr[i]++;
            if (arr[i] > 999) {
                n = 0;
                carry = 1;
            } else {
                carry = 0;
            }
        }
        if (carry === 1) {
            arr.push(1);
        }
        return new Fee(arr);
    }
    // 减
    sub (fee) {
        if (fee.constructor !== Fee) {
            return this.clone();
        }
        if (this.compare(fee) === 1) {
            let carry = 0;
            let arr = [];
            for (let i = 0; i < fee.len; i++) {
                if (this.arr[i] < fee.arr[i] + carry) {
                    arr[i] = 1000 + this.arr[i] - fee.arr[i] - carry;
                    carry = 1;
                } else {
                    arr[i] = this.arr[i] - fee.arr[i] - carry;
                    carry = 0;
                }
            }
            arr = this.removeEndZero(arr);
            if (arr.length === 0) {
                return new Fee([0]);
            } else {
                return new Fee(arr);
            }
        } else {
            return new Fee([0]);
        }
    }
    // 乘
    mult (n) {
        if (typeof n === "number") {
            n += "";
        }
        if (typeof n === "string") {
            n = n.replace(/[^0-9]/g, "");
            if (!/^1[0]{3,}$/.test(n)) {
                if (n.length > 6) {
                    let a = (n + "").split("").reverse();
                    let a1 = [];
                    for (let i = 0; i < a.length - 3; i += 3) {
                        a1.push(+(a[i + 2] + a[i + 1] + a[i]));
                    }
                    if (a.length % 3 !== 0) {
                        a1.push(+a.slice(-a.length % 3))
                    }
                    n = new Fee(a1);
                } else {
                    n = +n;
                }
            }
        } else if (n.constructor !== Fee) {
            return this.clone();
        }
        if (n.constructor === Fee) {
            let f = new Fee([0]);
            for (let i = 0; i < n.len; i++) {
                let str = "";
                for (let j = 0; j < i * 3; j++) {
                    str += "0";
                }
                f = f.add(this.mult(n.arr[i]).mult("1" + str));
            }
            return f.clone();
        } else if (typeof n === "number") {
            let carry = 0;
            let arr = [];
            let num = 0;
            for (let i = 0; i < this.len; i++) {
                num = this.arr[i] * n + carry;
                arr[i] = num % 1000;
                carry = Math.floor(num / 1000);
            }
            while (carry > 0) {
                arr.push(carry % 1000);
                carry = Math.floor(carry / 1000);
            }
            return new Fee(arr);
        } else {
            n = n.length - 1;
            let f;
            if (n % 3 === 0) {
                f = this.clone()
            } else {
                f = this.mult(Math.pow(10, n % 3));
            }
            n = Math.floor(n / 3);
            for (let i = 0; i < n; i++) {
                f.arr.unshift([0]);
            }
            return f.clone();
        }
    }
    // 比大小 fee > this -1, fee < this 1, 相等 0
    compare (fee) {
        if (fee.constructor !== Fee) {
            return 1;
        }
        if (fee.len > this.len) {
            return -1;
        }
        if (fee.len === this.len) {
            for (let i = this.len - 1; i >= 0; i--) {
                if (fee.arr[i] > this.arr[i]) {
                    return -1;
                }
                if (fee.arr[i] < this.arr[i]) {
                    return 1
                }
            }
            return 0;
        }
        return 1;
    }
    // 克隆
    clone () {
        return new Fee(this.arr);
    }
    toString (flag) {
        if (flag) {
            if (this.len > 1) {
                return (this.arr[this.len - 1] + (this.arr[this.len - 2] === 0 ? "" : "." + ("00" + this.arr[this.len - 2]).slice(-3).replace(/[0]+$/, ""))) + Fee.typeList[this.len - 2];
            } else {
                return this.arr[0];
            }
        }
        return [...this.arr].reverse().map((n, i) => {
            n += "";
            if (i !== 0) {
                n = ("00" + n).slice(-3);
            }
            return n;
        }).join(",");
    }
}
Fee.typeList = ["K", "M", "B", "T", 
    "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", 
    "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz", 
    "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ", "KK", "LL", "MM", 
    "NN", "OO", "PP", "QQ", "RR", "SS", "TT", "UU", "VV", "WW", "XX", "YY", "ZZ"];