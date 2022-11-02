const towerBuilder = (nFloors) => {
    nFloors--;
    const baseLen = 1 + 2 * (nFloors);
    let line = '*'.repeat(baseLen);
    const tower = [];
    tower.unshift(line);
    while(nFloors--){
        line = line.replace(/(?<=^| )\*|\*(?=$| )/gm, ' ');
        tower.unshift(line);
    }
    return tower;
};
