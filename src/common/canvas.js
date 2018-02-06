import * as config from "./config";

export function coordinatesFromIndex(index) {
    return {
        x: index % config.axisSize,
        y: Math.floor(index / config.axisSize),
    };
}

export function indexFromCoordinates(pos) {
    return pos.y * config.axisSize + pos.x;
}

export function* bresenham(from, to) {
    const pos = { x: from.x, y: from.y };
    const dx = Math.abs(to.x - from.x);
    const dy = -Math.abs(to.y - from.y);
    const sx = to.x > from.x ? 1 : -1;
    const sy = to.y > from.y ? 1 : -1;
    let err = dx + dy;

    while (true) {
        yield pos;

        if (pos.x === to.x && pos.y === to.y) {
            break;
        }

        let e2 = 2 * err;
        if (e2 > dy) {
            err += dy;
            pos.x += sx;
        }
        if (e2 < dx) {
            err += dx;
            pos.y += sy;
        }
    }
}
