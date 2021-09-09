/**
 * All routes for reservation resource are defined here
 */

import express from 'express';
const router = express.Router();

// use this query to the REFACTOR route: /shelters/:id/reservations
export default function (dbconn) {
  router.get('/search', (req, res) => {
    const { shelter_id } = req.query;
    if (!shelter_id) {
      res.status(400).json({ error: 'missing shelter id' });
      return;
    }
    //at time zone 'pst' 
    const query = `
      SELECT 
      reservations.id as id,
      reservations.shelter_id,
      reservations.guest_id,
      reservations.reservation_date as reservation_date,
      reservations.is_confirmed,
      guests.first_name,
      guests.last_name,
      guests.emergency_number,
      guests.emergency_name,
      guests.phone,
      guests.email
      FROM reservations
      JOIN guests ON reservations.guest_id = guests.id
      WHERE reservations.shelter_id = $1
      ORDER BY reservations.id DESC;
    `;
    const values = [shelter_id];
    dbconn
      .query(query, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT *
      FROM reservations
      WHERE id = $1
    `;
    const values = [id];
    dbconn
      .query(query, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { is_confirmed } = req.body;

    const query = `
      UPDATE reservations
      SET is_confirmed = $1
      WHERE id = $2
      RETURNING *
    `;
    const values = [is_confirmed, id];

    dbconn
      .query(query, values)
      .then((data) => {
        // emit updated reservations to all sockets
        req['io'].emit('updateBedAvailability', data.rows);
        res.send(data.rows);
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.post('/', (req, res) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      emergency_number,
      emergency_name,
      shelter_id,
      reservation_date,
    } = req.body;

    // check if all of the required info has been sent over
    if (!first_name || !last_name || !emergency_name || !emergency_number) {
      res.status(400).json({
        error:
          'first_name, last_name, emergency_number or emergency_name missing',
      });
      return;
    }

    // create a new guest
    const createNewGuestQuery = `
          INSERT INTO guests(
            first_name,
            last_name,
            phone,
            email,
            emergency_number,
            emergency_name,
            shelter_id
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id;
        `;

    const values = [
      first_name,
      last_name,
      phone,
      email,
      emergency_number,
      emergency_name,
      shelter_id,
    ];

    dbconn
      .query(createNewGuestQuery, values)
      .then((data) => {
        const { id: guest_id } = data.rows[0];
        // create new reservation with the new guest
        const createNewGuestsReservation = `
              INSERT INTO reservations(
              reservation_date,
              guest_id,
              shelter_id
              )
            VALUES ($1, $2, $3)
            RETURNING *;
            `;
        const values = [reservation_date, guest_id, shelter_id];
        dbconn
          .query(createNewGuestsReservation, values)
          .then((data) => res.send(data.rows))
          .catch((e) => res.status(500).json({ error: e.message }));
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleteReservationQuery = `
      DELETE FROM reservations
      WHERE id = $1
      RETURNING *
    `;
    const values = [id];

    dbconn
      .query(deleteReservationQuery, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
