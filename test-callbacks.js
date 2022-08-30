const wait = async (ms, data) => new Promise(resolve => setTimeout(() => resolve(data), ms));

const main = async () => {
    const results = await Promise.all([
        wait(5000, 1).then(data => {
            console.log(data);
            return data;
        }),
        wait(1000, 2).then(data => {
            console.log(data);
            return data;
        })
    ]);

    console.log(results);

}
main();

