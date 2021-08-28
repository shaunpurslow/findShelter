/**
 * All routes for shelter resource are defined here
 */

// const express = require('express');
import express from 'express';
const router = express.Router();

// exports a function that ultimate returns a configured router
// db connection provided using dependency injection pattern for increased testability
module.exports = (dbconn) => {
  router.get('/', (req, res) => {
    dbconn
      .query('SELECT * FROM shelters;')
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.get('/search', (req, res) => {
    // TODO: move type definitions to seperate file
    console.log(req.query);
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

    // make database requests
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

  router.patch('', (req, res) => {});
  router.post('', (req, res) => {});
  router.delete('', (req, res) => {});
  return router;
};
