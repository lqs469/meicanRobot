-- insert data

CREATE PROCEDURE addRest (
  IN name       VARCHAR(100),
  IN latitude   FLOAT,
  IN longtitude FLOAT,
  IN dishLimit  INT,
  IN availeDish INT,
  IN rating     INT,
  IN status     INT,
  IN uniqueId   INT
)
BEGIN
  insert into rest (name,latitude,longtitude,dishLimit,availeDish,rating,status,uniqueId)
    values (name,latitude,longtitude,dishLimit,availeDish,rating,status,uniqueId);
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
