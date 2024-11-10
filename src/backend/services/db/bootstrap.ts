import { pool } from "./db";

export const bootstrap = async (): Promise<void> => {
  await bootstrapAuth();

  await bootstrapMed();
};

const bootstrapAuth = async (): Promise<void> => {
  await pool.query(`
        CREATE TABLE verification_token
        (
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,
        
        PRIMARY KEY (identifier, token)
        );
        
        CREATE TABLE accounts
        (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,
        
        PRIMARY KEY (id)
        );
        
        CREATE TABLE sessions
        (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        "sessionToken" VARCHAR(255) NOT NULL,
        
        PRIMARY KEY (id)
        );
        
        CREATE TABLE users
        (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255),
        "emailVerified" TIMESTAMPTZ,
        image TEXT,
        
        PRIMARY KEY (id)
        );`);
};
const bootstrapMed = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE markers
    (
        id SERIAL,
        code VARCHAR(255) NOT NULL,
        default_title VARCHAR(255) NOT NULL,
        default_unit_id INTEGER NOT NULL,

        PRIMARY KEY (id)
    );

    CREATE TABLE results
    (
        id SERIAL,
        marker_id INTEGER NOT NULL,
        value VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        abnormal BOOLEAN NOT NULL,
        user_id INTEGER NOT NULL,

        PRIMARY KEY (id)
    );

    CREATE TABLE units
    (
        id SERIAL,
        title VARCHAR(255) NOT NULL,

        PRIMARY KEY (id)
    );
`);
};
