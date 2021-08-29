/**
 * All routes for shelter resource are defined here
 */

import express from 'express';
const router = express.Router();

// exports a function that ultimate returns a configured router
// db connection provided using dependency injection pattern for increased testability
export default function (dbconn) {
  router.get('/', (req, res) => {
    dbconn
      .query('SELECT * FROM shelters;')
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  // TODO: so.much.to.talk.about searching
  router.get('/search', (req, res) => {
    // TODO: move type definitions to seperate file
    interface ISearchQueryParams {
      city?: string;
      province?: string;
    }
    const { city, province }: ISearchQueryParams = req.query;
    const values: string[] = [`%${city}%`];
    let query: string = `
        SELECT *
        FROM shelters
        WHERE LOWER(city) LIKE LOWER($1)
      `;

    if (province) {
      query += `AND LOWER(province) LIKE LOWER($2)`;
      values.push(province);
    }

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
        SELECT *
        FROM shelters
        WHERE id = $1
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

  return router;
}
