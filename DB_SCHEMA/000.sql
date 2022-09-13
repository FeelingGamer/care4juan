CREATE TABLE accounts 
(
    email_address TEXT NOT NULL,
    password text DEFAULT md5('user123456')
);

CREATE TABLE users 
(
    pk SERIAL PRIMARY KEY,
    email_address TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT NOW(),
    user_type INTEGER NOT NULL,
    address TEXT,
    archived BOOLEAN DEFAULT FALSE
);

INSERT INTO accounts
(
    email_address,
    password
)
VALUES
(
    'care4juan@gmail.com',
    md5('123456')
);

INSERT INTO users
(
    email_address
)
VALUES
(
    'care4juan@gmail.com'
); 


CREATE TABLE beneficiary
(
    pk SERIAL PRIMARY KEY,
    first_name text,
    last_name text,
    middle_name text,
    extension_name text,
    birth_date TIMESTAMP,
    age INTEGER,
    sex INTEGER,
    archived BOOLEAN DEFAULT FALSE,
    SC_PK integer,
    SP_pk integer,
    PWSN_pk integer,
    CONSTRAINT SC_PK FOREIGN KEY (SC_pk) REFERENCES SC(pk),
    CONSTRAINT SP_pk FOREIGN KEY (SP_pk) REFERENCES SP(pk),
    CONSTRAINT PWSN_pk FOREIGN KEY (PWSN_pk) REFERENCES PWSN(pk),
    CONSTRAINT user_pk FOREIGN KEY (user_pk) REFERENCES users(pk)
);


CREATE TABLE SC
(
    pk SERIAL PRIMARY KEY,
    philheath text,
    cash_incentives text,
    cash_amount INTEGER,
    archived BOOLEAN DEFAULT FALSE

);


CREATE TABLE SP
(
    pk SERIAL PRIMARY KEY,
    marriedClass INTEGER,
    problem text,
    application_status INTEGER,
    archived BOOLEAN DEFAULT FALSE
);


CREATE TABLE PWSN
(
    pk SERIAL PRIMARY KEY,
    philheath text,
    cash_incentives text,
    cash_amount int,
    employment_text text,
    mployment_type text,
    family_composition jsonb,
    income int,
    religion text,
    fourps integer,
    voter integer,
    blood_type text,
    archived BOOLEAN DEFAULT FALSE
);

