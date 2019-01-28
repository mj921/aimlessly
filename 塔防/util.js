// 计算两点之间的距离
const distanceBetweenTwoPoints = (x1, y1, x2, y2) => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

// 计算点(x, y)到经过两点(x1, y1)和(x2, y2)的直线的距离
const distanceFromPointToLine = (x, y, x1, y1, x2, y2) => {
    let a = y2 - y1;
    let b = x1 - x2;
    let c = y1 * x2 - y2 * x1;
    return Math.abs((a * x + b * y + c) / Math.sqrt(a * a + b * b));
}

// 圆与矩形碰撞检测
// 圆心(x, y), 半径r, 矩形中心(x0, y0), 矩形上边中心(x1, y1), 矩形右边中心(x2, y2)
const isCollisionCircleAndRect = (x, y, r, x0, y0, x1, y1, x2, y2) => {
    let w1 = distanceBetweenTwoPoints(x0, y0, x2, y2);
    let h1 = distanceBetweenTwoPoints(x0, y0, x1, y1);
    let w2 = distanceFromPointToLine(x, y, x0, y0, x1, y1);
    let h2 = distanceFromPointToLine(x, y, x0, y0, x2, y2);
    if (w2 > w1 + r) {
        return false;
    }
    if (h2 > h1 + r) {
        return false;
    }
    if (w2 <= w1) {
        return true;
    }
    if (h2 <= h1) {
        return true;
    }
    return (w2 - w1) * (w2 - w1) + (h2 - h1) * (h2 - h1) <= r * r;
}