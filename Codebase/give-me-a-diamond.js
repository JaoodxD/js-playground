const diamond = (n) => {
    if (n < 1 || n % 2 === 0) return null;
    let line = '*'.repeat(n);
    let builder = [line];
    do {
        line = line.replace(/(?<=^| )\*|\*(?=$| )/gm, () => ' ').trimEnd();
        builder = [line, ...builder, line];
    } while ((n -= 2) > 1);
    builder.push('');
    return builder.join('\n');
};

const diamond2 = (n) => {
    if (n < 1 || n % 2 === 0) return null;
    const line = (stars, len) => '*'.repeat(stars).padStart(len, ' ') + '\n';
    let builder = [line(n, n)];
    for (let i = n - 2; i > 0; i -= 2) {
        const newLine = line(i, --n);
        builder = [newLine, ...builder, newLine];
    }
    return builder.join('');
};

console.log(diamond(5));
console.log(diamond2(5));
