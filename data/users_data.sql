DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    first_name VARCHAR(28) NOT NULL,
    last_name VARCHAR(28) NOT NULL,
    avatar TEXT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);


SELECT setval('users_id_seq', (SELECT MAX(id) + 1 FROM users));

