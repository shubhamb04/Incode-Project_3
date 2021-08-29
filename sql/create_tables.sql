CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname varchar(256) not null,
    lastname varchar(256) not null,
    email varchar(256) not null,
    password varchar(100) not null
)