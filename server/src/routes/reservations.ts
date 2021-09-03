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
    const query = `
      SELECT 
        reservations.id as id,
        shelter_id,
        guest_id,
        reservations.reservation_date,
        reservations.is_confirmed,
        guests.first_name,
        guests.last_name,
        guests.emergency_number,
        guests.emergency_name,
        phone,
        email
      FROM reservations
      JOIN guests
      ON reservations.guest_id = guests.id
      WHERE shelter_id = $1;
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

    // make the query
    const query = `
      SELECT *
      FROM shelters
      JOIN reservations
        ON shelters.id = reservations.shelter_id
      JOIN guests
        ON guests.id = reservations.guest_id
      WHERE shelter_id = $1
        AND LOWER(first_name) = LOWER($2)
        AND LOWER(last_name) = LOWER($3)
    `;
    const values = [shelter_id, first_name, last_name];

    dbconn
      .query(query, values)
      .then((data) => {
        // IF exists:
        // use that id to create the new reso
        if (data.rows.length) {
          const { guest_id } = data.rows[0];
          const createReservationQuery = `
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
            .query(createReservationQuery, values)
            .then((data) => res.send(data.rows))
            .catch((e) => res.status(500).json({ error: e.message }));
          return;
        }

        // ELSE IF DOESNT EXIST:
        // create a new guest

        const createNewGuestQuery = `
          INSERT INTO guests(
            first_name, 
            last_name, 
            emergency_number,   
            emergency_name
          )
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [
          first_name,
          last_name,
          emergency_number,
          emergency_name,
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
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
