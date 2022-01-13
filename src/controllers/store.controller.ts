import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";

export const getStores = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const entities = await getRepository(Store).find();
  return res.json(entities);
};

export const createStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newEntity = await getRepository(Store).create(req.body);
  const results = await getRepository(Store).save(newEntity);
  return res.json(results);
};
