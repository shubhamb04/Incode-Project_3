
CREATE TABLE schedules(
    user_id SERIAL PRIMARY KEY NOT NULL,
    username varchar(50) not null,
    day INT NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);


