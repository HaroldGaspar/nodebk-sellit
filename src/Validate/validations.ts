import { NextFunction } from "express";

export function validate(validation: (body: any) => any): any {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validation(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function createUsersValidation(data: any) {
  //   const schema = yup.object().shape({
  //     name: yup
  //       .string()
  //       .min(5)
  //       .matches(/^[a-z]+$/)
  //       .required(),
  //     age: yup.number().min(1).max(100).integer().required(),
  //     email: yup
  //       .string()
  //       .matches(/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/)
  //       .required(),
  //   });
  //   schema.validateSync(data);
}

module.exports = {
  validate,
  createUsersValidation,
};
