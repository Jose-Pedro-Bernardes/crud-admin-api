CREATE TABLE IF NOT EXISTS users (
  "id"        SERIAL,
  "name"      VARCHAR(20)    NOT NULL,
  "email"     VARCHAR(100)   UNIQUE NOT NULL,
  "password"  VARCHAR(120)   NOT NULL,
  "admin"     BOOLEAN        NOT NULL DEFAULT false,
  "active"    BOOLEAN        NOT NULL DEFAULT true,
  PRIMARY KEY("id")
);