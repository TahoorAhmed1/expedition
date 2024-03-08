const express = require('express');
const { getTeamMembers } = require('../../../controllers/client/team/team.controllers');

const router = express.Router();

router.get('/', getTeamMembers);

module.exports = router;
