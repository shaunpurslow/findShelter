/**
 * All routes for access management are defined here
 * switched from ts to js because typescrupt could not make sense of the session method being added to req
 * could probably switch back to TS with more research on how to set session cookies in TS
 */

// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');
// import express from 'express';
const session = require('express-session');
const express = require('express');
const router = express.Router();

module.exports = function (dbconn) {
  router.post('/', (req, res) => {
    const { email, password: suppliedPassword } = req.body;

    const query = `
    SELECT 
    staff.id AS staff_id, 
    first_name, 
    last_name, 
    password, 
    shelters.thumbnail_url AS thumbnail_url, 
    shelters.capacity, 
    shelters.id AS shelter_id
    FROM staff
    JOIN shelters on shelters.id = shelter_id
    WHERE staff.email = $1;
    `;
    const values = [email];

    dbconn
      .query(query, values)
      .then((data) => {
        const user = data.rows[0];

        if (suppliedPassword !== user.password) {
          res.status(401).json({ error: 'unauthorized access' });
          return;
        }

        return res.send({ ...user });
      })
      .catch((e) => res.status(500).json({ error: e }));
  });

  return router;
};
