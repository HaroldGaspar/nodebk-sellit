import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Customer } from "../entity/Customer";

export const getCustomers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const entities = await getRepository(Customer).find();
  return res.json(entities);
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newEntity = await getRepository(Customer).create(req.body);
  const results = await getRepository(Customer).save(newEntity);
  return res.json(results);
};
