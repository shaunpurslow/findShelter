/**
 * All routes for shelter resource are defined here
 */

// const express = require('express');
import express from 'express';
const router = express.Router();

// exports a function that ultimate returns a configured router
module.exports = (dbconn) => {
  router.get('/', (req, res) => {
    dbconn
      .query('SELECT * FROM shelters')
      .then((data) => res.send(data.rows))
      .catch((e) => res.status(500).json({ error: e.message }));
  });

  router.get('', (req, res) => {});
  router.get('', (req, res) => {});
  router.patch('', (req, res) => {});
  router.post('', (req, res) => {});
  router.delete('', (req, res) => {});
  return router;
};
