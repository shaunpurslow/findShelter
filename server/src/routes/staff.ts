/**
 * All routes for staff resource are defined here
 */

import express from 'express';
const router = express.Router();

module.exports = (dbconn) => {
  router.get('', (req, res) => {});

  router.post('', (req, res) => {});

  return router;
};
