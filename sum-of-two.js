const add = (a, b) => {
    while (b) {
        let temp = a & b;
        a = a ^ b;
        b = temp << 1;
    }
    return a;
}
