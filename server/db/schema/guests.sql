DROP TABLE IF EXISTS guests CASCADE;

CREATE TABLE guests (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  emergency_contact VARCHAR(10) NOT NULL,
  emergency_name VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  email VARCHAR(255)
);

INSERT INTO guests
(first_name, last_name, emergency_contact, emergency_name, phone, email)
VALUES
('Ricardo', 'Wagner', '5875768888', 'Leticia', '5875768888', 'me@ricardowgomes.tech');
