let config = { message: 'hello' };
const setup = (cfg = config) => ({
    f: () => console.log(cfg.message)
});

setup().f();
setup({ message: 'zdarova' }).f();
