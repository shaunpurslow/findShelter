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
    dbconn
      .query('SELECT * FROM shelters;')
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  // TODO: so.much.to.talk.about searching
  // router.get('/search', (req, res) => {
  //   // TODO: move type definitions to seperate file
  //   interface ISearchQueryParams {
  //     city?: string;
  //     province?: string;
  //   }
  //   const { city, province }: ISearchQueryParams = req.query;
  //   const values: string[] = [`%${city}%`];
  //   let query: string = `
  //       SELECT *
  //       FROM shelters
  //       WHERE LOWER(city) LIKE LOWER($1)
  //     `;

  //   if (province) {
  //     query += `AND LOWER(province) LIKE LOWER($2)`;
  //     values.push(province);
  //   }

  //   dbconn
  //     .query(query, values)
  //     .then((data) => res.send(data.rows))
  //     .catch((e) => res.status(500).json({ error: e.message }));
  // });

  router.get('/search', (req, res) => {
    interface ISearchQueryParams {
      value?: string;
      couples?: string;
      female_only?: string;
      male_only?: string;
      family?: string;
      pets?: string;
    }


    const { value,
      couples,
      female_only,
      male_only,
      family,
      pets }: ISearchQueryParams = req.query;

    const booleanValues = [
      couples,
      female_only,
      male_only,
      family,
      pets
    ];

    const mapValues = booleanValues.map(value => (value === 'true' ? '' : 'NOT'));

    const values: string[] = [...mapValues];
    let query: string = `
    SELECT * FROM shelters
    WHERE
    $1 couples
    OR $2 female_only
    OR $3 male_only	
    OR $4 family	
    OR $5 pets`

    if (value) {
      values.push(`%${value}%`);
      query += `AND LOWER(city) LIKE LOWER($6)
      OR LOWER(province) LIKE LOWER($6)
      OR LOWER(name) LIKE LOWER($6)
      OR LOWER(postal_code) LIKE LOWER($6)
      OR LOWER(street_address) LIKE LOWER($6);`

    } else {
      query += `;`
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

  // Route to get information from the shelter to the dashboard
  router.get('/login/:id', (req, res) => {
    const { id } = req.params;
    console.log('params', req.params)
    console.log('session', session)

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
