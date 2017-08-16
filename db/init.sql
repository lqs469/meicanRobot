-- SHOW DATABASES;

DROP DATABASE meican;
CREATE DATABASE IF NOT EXISTS meican;
use meican;

CREATE TABLE IF NOT EXISTS rest (
  id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  latitude   FLOAT        NOT NULL,
  longtitude FLOAT        NOT NULL,
  dishLimit  INT          NOT NULL,
  availeDish INT          NOT NULL,
  rating     INT          NOT NULL,
  status     INT          NOT NULL,
  uniqueId   INT          NOT NULL,
  targetTime TIMESTAMP    NOT NUll DEFAULT CURRENT_TIMESTAMP()
) AUTO_INCREMENT = 0;

CREATE TABLE IF NOT EXISTS dash (
  id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NUll,
  dishSectionId VARCHAR(10)  NOT NULL,
  restId        INT          NOT NULL,
  targetTime    TIMESTAMP    NOT NUll DEFAULT CURRENT_TIMESTAMP()
)
