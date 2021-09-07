/**
 * All routes for cities resource are defined here
 */

import express from 'express';
const router = express.Router();

export default function (dbconn) {
  // TECHNIQUE 1
  // load all the cities from the database on to the front end and filter from front end
  router.get('/', (req, res) => {
    const getShelterCities = `
      SELECT DISTINCT ON (city)
        city, 
        province,
        id
      FROM shelters
      ORDER BY city;
    `;
    dbconn
      .query(getShelterCities)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  // TECHNIQUE 2
  // network query filtering the database on the backend
  router.get('/search/', (req, res) => {
    const { value } = req.query;
    const getShelterCities = `
    SELECT DISTINCT city, province, id
    FROM shelters
    WHERE LOWER(shelters.city) LIKE LOWER($1)
    ORDER BY city
    LIMIT 10;
    `;
    const values = [`%${value}%`];
    dbconn
      .query(getShelterCities, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
