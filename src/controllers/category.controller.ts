import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";

//list of all categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const entities = await getRepository(Category).find();
  return res.json(entities);
};

//give a eager query by a category
//PENDIENT should be pagination and be order by last
export async function getCategory(req: Request, res: Response) {
  const categories = await getRepository(Category).findOne(req.params.id);
  return res.json(categories);
}

export const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newEntity = await getRepository(Category).create(req.body);
  const results = await getRepository(Category).save(newEntity);
  return res.json(results);
};
