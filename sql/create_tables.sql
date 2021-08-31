CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null
);

INSERT INTO users (firstname, lastname, email, password)
        values ('Shubham', 'Bhavsar', 'sbhavsar1992@gmail.com', 'shubham');