const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: true }));





module.exports = router; 