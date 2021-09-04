/**
 * All routes for guests resource are defined here
 */

import express from 'express';
const router = express.Router();

// use this query to the REFACTOR route: /shelters/:id/guests
export default function (dbconn) {
  router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'missing shelter id' });
      return;
    }
    const query = `
       SELECT * 
       FROM guests
       WHERE shelter_id = $1;
     `;
    const values = [id];
    dbconn
      .query(query, values)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
