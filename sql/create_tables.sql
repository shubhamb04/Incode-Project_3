CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null
);

INSERT INTO users (firstname, lastname, email, password)
        values ('Shubham', 'Bhavsar', 'sbhavsar1992@gmail.com', 'shubham');

CREATE TABLE schedules(
    user_id SERIAL PRIMARY KEY NOT NULL,
    day INT NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

INSERT INTO schedules (user_id, day, start_at, end_at)
        values ('1', '2', '02:30', '04:30');
