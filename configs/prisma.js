const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const handlePrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P1000') {
      return 'Authentication failed against the database server. The provided database credentials are not valid.';
    }
    if (error.code === 'P1009') {
      return 'The database already exists on the database server.';
    }
    if (error.code === 'P1016') {
      return 'Your raw query had an incorrect number of parameters.';
    }
    if (error.code === 'P2000') {
      return "The provided value for the column is too long for the column's type.";
    }
    if (error.code === 'P2003') {
      return `Foreign key constraint failed on the field: ${error.meta.field_name}`;
    }
    if (error.code === 'P2006') {
      return 'The provided value for a field is not valid.';
    }
    if (error.code === 'P2009') {
      return 'Failed to validate the query.';
    }
    if (error.code === 'P2021') {
      return 'The table does not exist in the current database.';
    }
    if (error.code === 'P2022') {
      return 'The column does not exist in the current database.';
    }
    if (error.code === 'P2025') {
      return 'Record not found'; // An operation failed because it depends on one or more records that were required but not found.
    }
    if (error.code === 'P2026') {
      return "The current database provider doesn't support a feature that the query used.";
    }
    if (error.code === 'P2027') {
      return 'Multiple errors occurred on the database during query execution.';
    }
    if (error.code === 'P3001') {
      return 'Migration possible with destructive changes and possible data loss.';
    }
    if (error.code === 'P3008') {
      return 'The migration is already recorded as applied in the database.';
    }
    if (error.code === 'P3010') {
      return 'The name of the migration is too long.';
    }
    if (error.code === 'P3012') {
      return 'Migration cannot be rolled back because it is not in a failed state.';
    }
    if (error.code === 'P4000') {
      return 'Introspection operation failed to produce a schema file.';
    }
    if (error.code === 'P5015') {
      return 'Could not find Query Engine for the specified host and transaction ID.';
    }
    if (error.code === 'P6004') {
      return 'The global timeout of Accelerate has been exceeded.';
    }
    return error;
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return 'Something went wrong';
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    const message = error.message.split('\n');
    return message[message.length - 1];
  }
  return error;
};

module.exports = { prisma, handlePrismaError };
