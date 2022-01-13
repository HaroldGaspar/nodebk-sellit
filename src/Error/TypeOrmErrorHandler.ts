import { Request, Response, NextFunction, Errback } from "express";
import { QueryFailedError } from "typeorm";

export function logErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof QueryFailedError) {
    if (error.driverError.code === "ER_DUP_ENTRY") {
      return res.status(400).send({
        message: `${error.driverError.code},
            : Usuario o correo repetido, intenta con otras credenciales`,
      });
    } else {
      return res.send({ message: "no ER_DUP_ENTRY error", error });
    }
  } else {
    return res.send({ message: "no QueryFailedError error", error });
  }

  // return res.status(400).send({
  //   header: "personal error handler",
  //   error,
  // message: `${error.driverError.code}`,

  //   : Usuario o correo repetido, intenta con otras credenciales,
  // });
}
