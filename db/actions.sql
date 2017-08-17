-- insert data

CREATE PROCEDURE addRest (
  IN name       VARCHAR(100),
  IN latitude   FLOAT,
  IN longitude  FLOAT,
  IN dishLimit  INT,
  IN availeDish INT,
  IN rating     INT,
  IN uniqueId   VARCHAR(10),
  IN targetTime TIMESTAMP
)
BEGIN
  insert into rest (name,latitude,longitude,dishLimit,availeDish,rating,uniqueId,targetTime)
    values (name,latitude,longitude,dishLimit,availeDish,rating,uniqueId,targetTime);
END;

CREATE PROCEDURE rmRestByName (
  IN in_name VARCHAR(100)
)
BEGIN
  DELETE FROM rest WHERE name = in_name;
END;

CREATE PROCEDURE rmRestById (
  IN in_id INT
)
BEGIN
  DELETE FROM rest WHERE id = in_id;
END;
