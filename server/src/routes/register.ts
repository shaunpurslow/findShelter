/**
 * All routes for registering a new shelter and new staff user
 */

import bcrypt from 'bcryptjs';
import express from 'express';
const router = express.Router();

// REFACTOR: registration process is really convoluted, need to discuss how we can simplify - getting callback help - promises edition
export default function (dbconn) {
  router.post('/', (req, res) => {
    const { registrationFormData } = req.body;

    // check if given staff email already exists
    const { email } = registrationFormData;
    const query = `
      SELECT *
      FROM staff
      WHERE email = $1
    `;
    const values = [email];
    dbconn
      .query(query, values)
      .then((data) => {
        if (data.length) {
          res.status(400).json({ error: 'email already exists' });
          return;
        }

        // if staff email does not exist:
        //  1 - create new shelter
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
        } = registrationFormData;

        const query = `
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
      `;
        const values = [
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
        ];

        return dbconn.query(query, values);
      })
      .then((data) => {
        // 2 - create new user and associate to the newly created shelter
        const { id } = data.rows;
        const { first_name, last_name, phone, email, is_manager, password } =
          registrationFormData;
        // async password hashing
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            const query = `
            INSERT INTO staff(
              shelter_id, 
              first_name,
              last_name,
              phone,
              email,
              is_manager,
              password
            )
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `;
            const values = [
              id,
              first_name,
              last_name,
              phone,
              email,
              is_manager,
              hashedPassword,
            ];

            // create new staff
            dbconn
              .query(query, values)
              .then((data) => {
                res.send(data.rows);
                return;
              })
              .catch((e) => res.status(500).json({ error: e.message }));
          })
          .catch((e) => res.status(500).json({ error: e.message }));
      })
      .catch((e) => res.status(500).json({ error: e.message }));
  });
  return router;
}
