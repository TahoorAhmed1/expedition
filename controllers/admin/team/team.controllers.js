const { prisma } = require('@/configs/prisma');
const { createSuccessResponse, updateSuccessResponse, deleteSuccessResponse } = require('@/constants/responses');

const addTeamMember = async (req, res, next) => {
  try {
    const member = await prisma.teamMembers.create({
      data: {
        ...req.body,
      },
    });
    const response = createSuccessResponse(member);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const updateTeamMember = async (req, res, next) => {
  const { memberId } = req.params;
  try {
    const result = await prisma.teamMembers.update({
      where: {
        id: Number(memberId),
      },
      data: {
        ...req.body,
      },
    });
    const response = updateSuccessResponse(result);
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

const deleteTeamMember = async (req, res, next) => {
  const { memberId } = req.params;
  try {
    await prisma.teamMembers.delete({
      where: {
        id: Number(memberId),
      },
    });

    const response = deleteSuccessResponse();
    return res.status(response.status.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
