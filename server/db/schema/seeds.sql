INSERT INTO shelters
(shelter_id, name, street_number, street_name, city, province,postal_code, country, phone, email, thumbnail_url, website_url,capacity, couples, female_only, male_only, family, pets)
VALUES
(1, 'Family & Friends', 303, '1st Street SW', 'AB', 'Alberta', 'T2P 0A5', 'Canada', 4032968000, 'info@familynfriends.com', 's', 'familynfriends.com', 100, true, false, false, true, true),
(2, 'Women Support', 405, '5 Ave SW', 'Calgary', 'AB', 'T2G 2C4', 'Canada', 4032968000, 'info@womensupport.ca', 's', 'womensupport.ca', 100, false, true, false, true, true),
(3, 'Mens Shelter ', 650, 'W 41st Ave', 'Vancouver', 'BC', 'V5Z 2M9', 'Canada', 4032968000, 'info@womensupport.ca', 's', 'womensupport.ca', 100, false, false, true, false, true);

INSERT INTO guests (first_name, last_name, emergency_contact,   emergency_name)
VALUES
('John', 'Fulano', 4032008000, 'Shaun'),
('Jane', 'Ciclano', 4038002222, 'Ricardo'),
('Jonas', 'Beltrano', 4032008000, 'Emmanuel');

INSERT INTO staff
(shelter_id, first_name, last_name, phone, email, password, is_manager)
VALUES
(1, 'Dwight', 'Schrute', '4032003000', 'dwight@office.com', 'password', false),
(1, 'Michael', 'Scott', '4032003000', 'michael@office.com', 'password', true),
(2, 'Jim', 'Halpert', '4032003000', 'jim@office.com', 'password', false),
(2, 'Pam', 'Beesly', '4032003000', 'pam@office.com', 'password', true),
(3, 'Angela', 'Martin', '4032003000', 'angela@office.com', 'password', false),
(3, 'Melora', 'Hardin', '4032003000', 'melora@office.com', 'password', true);

INSERT INTO reservations (shelter_id, guest_id, reservation_date)
VALUES
(1, 1, '2021-05-20'),
(1, 1, '2021-05-21'),
(1, 2, '2021-05-20'),
(1, 2, '2021-05-21'),
(1, 3, '2021-05-20'),
(1, 3, '2021-05-21'),
(2, 1, '2021-05-20'),
(2, 1, '2021-05-21'),
(2, 2, '2021-05-20'),
(2, 2, '2021-05-21'),
(2, 3, '2021-05-20'),
(2, 3, '2021-05-21'),
(3, 1, '2021-05-20'),
(3, 1, '2021-05-21'),
(3, 2, '2021-05-20'),
(3, 2, '2021-05-21'),
(3, 3, '2021-05-20'),
(3, 3, '2021-05-21');

INSERT INTO notes (shelter_id, staff_id, guest_id, note)
VALUES
(1, 1, 1, 'This is a short note about guest #1 from shelter #1 and staff #1'),
(1, 2, 2, 'This is a short note about guest #2 from shelter #2 and staff #1'),
(2, 1, 1, 'This is a short note about guest #2 from shelter #1 and staff #1'),
(3, 2, 2, 'This is a short note about guest #2 from shelter #3 and staff #2');

INSERT INTO status (shelter_id, guest_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3);