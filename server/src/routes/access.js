/**
 * All routes for access management are defined here
 * switched from ts to js because typescrupt could not make sense of the session method being added to req
 * could probably switch back to TS with more research on how to set session cookies in TS
 */

// import bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');
// import express from 'express';
const express = require('express');
const router = express.Router();

module.exports = function (dbconn) {
  router.get('/', (req, res) => {
    const { email, password: suppliedPassword } = req.body;
    const query = `
      SELECT password
      FROM staff
      WHERE email = $1
    `;
    const values = [email];

    dbconn
      .query(query, values)
      .then((data) => {
        const { id, password: hashedPassword } = data.rows;
        bcrypt.compare(suppliedPassword, hashedPassword).then((result) => {
          if (!result) {
            res.status(401).json({ error: 'unauthorized access' });
            return;
          }
          req.session.user_id = id;
          res.send(data.rows);
        });
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  return router;
};
