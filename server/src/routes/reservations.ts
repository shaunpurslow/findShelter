/**
 * All routes for reservation resource are defined here
 */

import express from 'express';
const router = express.Router();

export default function (dbconn) {
  router.get('/', (req, res) => {
    const { shelter_id } = req.body;
    if (!shelter_id) {
      res.status(400).json({ error: 'missing shelter id' });
      return;
    }
    const query = `
      SELECT 
        r.reservation_date,
        g.id as guest_id,
        g.first_name,
        g.last_name,
        g.emergency_contact,
        g.emergency_name,
        g.phone,
        g.email,
        st.status
      FROM reservations r
      JOIN shelters s
        ON r.shelter_id = s.id
      JOIN guests g
        ON r.guest_id = g.id
      JOIN status st
        ON g.id = st.guest_id
      WHERE r.shelter_id = $1;
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

  router.post('/', (req, res) => {
    console.log(req.body);
    const { shelter_id, guest_id, reservation_date } = req.body;
    if (!shelter_id || !guest_id || !reservation_date) {
      res.status(400).json({
        error: 'shelter_id, guest_id, or reservation_date missing',
      });
      return;
    }
    const query = `
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
      .query(query, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
