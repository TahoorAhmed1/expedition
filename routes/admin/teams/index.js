const express = require('express');

const authRequired = require('@/middleware/authRequired.middleware');
const restrictToAdmins = require('@/middleware/restrictToAdmins.middleware');
const validateRequest = require('@/middleware/validateRequest.middleware');
const { addTeamMemberSchema, updateTeamMemberSchema, deleteTeamMemberSchema } = require('@/validations/admin/team/team');
const { addTeamMember, updateTeamMember, deleteTeamMember } = require('@/controllers/admin/team/team.controllers');

const router = express.Router();

router.use(authRequired, restrictToAdmins);

router.post('/', validateRequest(addTeamMemberSchema), addTeamMember);
router.patch('/:memberId', validateRequest(updateTeamMemberSchema), updateTeamMember);
router.delete('/:memberId', validateRequest(deleteTeamMemberSchema), deleteTeamMember);

module.exports = router;
