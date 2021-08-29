/**
 * All routes for shelter resource are defined here
 */

import bcrypt from 'bcryptjs';
import express from 'express';
const router = express.Router();

export default function (dbconn) {
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
}
