/**
 * All routes for shelter resource are defined here
 */

import express from 'express';
const session = require('express-session');
const router = express.Router();

// exports a function that ultimate returns a configured router
// db connection provided using dependency injection pattern for increased testability
export default function (dbconn) {
  router.get('/', (req, res) => {
    const query = `
      SELECT 
        shelters.*,
        COUNT(reservations.is_confirmed) FILTER (WHERE reservations.is_confirmed = true) AS confirmed_reservations
     FROM shelters
     JOIN reservations
      ON reservations.shelter_id = shelters.id
     GROUP BY (shelters.id)
    `;

    dbconn
      .query(query)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.get('/search', (req, res) => {
    interface ISearchQueryParams {
      value?: string;
    }
    const { value }: ISearchQueryParams = req.query;
    const values: string[] = [`%${value}%`];

    let query: string = `
     SELECT 
       shelters.*,
       COUNT(reservations.is_confirmed) FILTER (WHERE reservations.is_confirmed = true) AS confirmed_reservations
     FROM shelters
     JOIN reservations
      ON reservations.shelter_id = shelters.id
    WHERE LOWER(city) LIKE LOWER($1)
      OR LOWER(province) LIKE LOWER($1)
      OR LOWER(name) LIKE LOWER($1)
      OR LOWER(postal_code) LIKE LOWER($1)
      OR LOWER(street_address) LIKE LOWER($1)
    GROUP BY (shelters.id)
      `;

    dbconn
      .query(query, values)
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    dbconn
      .query(
        `
        SELECT 
       shelters.*,
       COUNT(reservations.is_confirmed) FILTER (WHERE reservations.is_confirmed = true) AS confirmed_reservations
     FROM shelters
     JOIN reservations
      ON reservations.shelter_id = shelters.id
    WHERE shelters.id = $1
    GROUP BY shelters.id
        `,
        [id]
      )
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.post('/', (req, res) => {
    const {
      name,
      street_address,
      city,
      province,
      postal_code,
      country,
      phone,
      email,
      thumbnail_url,
      website_url,
      capacity,
      couples,
      female_only,
      male_only,
      family,
      pets,
    } = req.body;

    dbconn
      .query(
        `
        INSERT INTO shelters(
          name,
          street_address,
          city,
          province,
          postal_code,
          country,
          phone,
          email,
          thumbnail_url,
          website_url,
          capacity,
          couples,
          female_only,
          male_only,
          family,
          pets
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *

      `,
        [
          name,
          street_address,
          city,
          province,
          postal_code,
          country,
          phone,
          email,
          thumbnail_url,
          website_url,
          capacity,
          couples,
          female_only,
          male_only,
          family,
          pets,
        ]
      )
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  // Route to get information from the shelter to the dashboard
  router.get('/login/:id', (req, res) => {
    const { id } = req.params;

    dbconn
      .query(
        `
        SELECT first_name, last_name, shelters.thumbnail_url, shelters.capacity, shelters.id AS shelter_id FROM staff
        JOIN shelters on shelters.id = shelter_id
        WHERE staff.id = $1;
        `,
        [id]
      )
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
}
