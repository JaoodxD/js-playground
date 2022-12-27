({
    name: 'test',
    description: 'Test database',
    version: 1,
    driver: 'pg',

    authors: [
        { name: 'Maksym Shenderuk', email: 'jaood96@gmail.com' },
    ],
    connection: {
        host: '127.0.0.1',
        port: 5432,
        database: 'test_jaood',
        user: 'postgres',
        password: 'postgres',
    },
})
