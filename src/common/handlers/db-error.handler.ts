import {
  BadRequestException,
  InternalServerErrorException,
} from "./http-exceptions";

const errorCodes = ["14304", "23505"];

export const dbErrorHandler = (error: any) => {
  if (errorCodes.includes(error.code)) {
    throw new BadRequestException(error.detail ?? "Database constraint error");
  }

  console.error("Database error:", error);
  throw new InternalServerErrorException("Unexpected database error");
};
