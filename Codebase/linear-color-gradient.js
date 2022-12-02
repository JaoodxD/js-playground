const createGradient = (colors) => (x) => {
    let color = [];
    colors.forEach(e => color[e[1]] = e[0]);

    const getColor = (rgb, x) => {
        rgb = ['r', 'g', 'b'].indexOf(rgb);
        if (!colors.length)
            return 0;
        if (colors.find(e => e[1] == x)) return [...colors].reverse().find(e => e[1] == x)[0][rgb];
        let { x1 = colors[colors.length - 1] } = { x1: [...colors].find(r => r[1] >= x) };
        let { x0 = colors[0] } = { x0: [...colors].reverse().find(r => r[1] <= x) };
        let y0 = x0[0][rgb];
        let y1 = x1[0][rgb];
        x1 = x1[1];
        x0 = x0[1];
        if (x0 == x1) return y0;
        let a1 = (y1 - y0) / (x1 - x0);
        let b1 = y0 - a1 * x0;
        return a1 * x + b1;

    };
    return [getColor('r', x), getColor('g', x), getColor('b', x)];
};

const getColor = createGradient([
    [[0, 204, 0], 0],
    [[255, 255, 0], 0.25],
    [[253, 119, 119], 0.5],
    [[181, 35, 24], 0.75],
    [[134, 1, 1], 1]
]);

for (let i = 0; i <= 1; i += 0.1) {
    let newColor = getColor(i).reduce((color, channel) => color + (~~channel).toString(16).padStart(2, '0'), "#");
    console.log({ newColor });
}
