/**
 * All routes for reservation resource are defined here
 */

import express from 'express';
const router = express.Router();

export default function (dbconn) {
  router.get('/search', (req, res) => {
    const { shelter_id } = req.query;
    console.log(shelter_id);
    if (!shelter_id) {
      res.status(400).json({ error: 'missing shelter id' });
      return;
    }
    const query = `
      SELECT *
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

  // receive POST req to create a new reso

  // check the shelter to see if guest is already there
  // make query to database where shelterid is the one given
  // check if shelter has a current guest with the same first name last name

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
