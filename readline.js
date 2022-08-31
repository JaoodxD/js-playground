const readline = require('readline');
const fs = require('fs');

const reader = readline.createInterface({
    input: fs.createReadStream('./readline.js'),
    output: process.stdout
});

reader.on('line', line => {
    console.log(line);
})
reader.on('close', () => reader.close());
