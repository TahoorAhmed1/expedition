const prisma = require('../configs/prisma');

const hasSubscriptionPeriodRemaining = async (userId) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      subscription: {
        select: {
          status: true,
        },
      },
      paymentHistory: {
        select: {
          amount: true,
          createdAt: true,
          validUpto: true,
        },
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  if (user.paymentHistory.length && new Date().getTime() > new Date(user.paymentHistory[0].validUpto).getTime()) {
    return true;
  }

  if (user.paymentHistory.length && user.subscription.status === 'ACTIVE') {
    await prisma.subscriptions.update({
      where: {
        userId,
      },
      data: {
        status: 'INACTIVE',
        type: null,
      },
    });
  }

  return false;
};

module.exports = {
  hasSubscriptionPeriodRemaining,
};
