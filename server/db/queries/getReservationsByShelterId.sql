SELECT
reservations.reservation_date,
guests.*
FROM reservations
JOIN guests ON guests.id = guest_id
WHERE shelter_id = 1;