DROP TABLE IF EXISTS guests CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS shelters CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS status CASCADE;

CREATE TABLE shelters (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  email VARCHAR(255),
  thumbnail_url VARCHAR(255),
  website_url VARCHAR(255),
  capacity INTEGER NOT NULL,
  couples BOOLEAN NOT NULL DEFAULT true,
  female_only BOOLEAN NOT NULL DEFAULT true,
  male_only BOOLEAN NOT NULL DEFAULT true,
  family BOOLEAN NOT NULL DEFAULT true,
  pets BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE guests (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  emergency_number VARCHAR(255) NOT NULL,
  emergency_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  email VARCHAR(255),
  status VARCHAR(255),
  shelter_id INT REFERENCES shelters(id) ON DELETE CASCADE
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY NOT NULL,
  shelter_id INT REFERENCES shelters(id) ON DELETE CASCADE,
  guest_id INT REFERENCES guests(id) ON DELETE CASCADE,
  status VARCHAR(255)
);

CREATE TABLE staff (
  id SERIAL PRIMARY KEY NOT NULL,
  shelter_id INT REFERENCES shelters(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  is_manager BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  shelter_id INT REFERENCES shelters(id) ON DELETE CASCADE,
  guest_id INT REFERENCES guests(id) ON DELETE CASCADE,
  reservation_date date NOT NULL,
  is_confirmed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  shelter_id INT REFERENCES shelters(id) ON DELETE CASCADE,
  staff_id INT REFERENCES staff(id) ON DELETE CASCADE,
  guest_id INT REFERENCES guests(id) ON DELETE CASCADE,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp,
  note TEXT
);