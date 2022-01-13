import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
import { Review } from "../entity/Review";

//getReviewsByProduct
export const getReviewsByProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { product } = req.query;
  console.log(product);
  const reviews = await getRepository(Review).find({
    where: { product },
  });

  return res.json(reviews);
};

export const createReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { comment, stars, username, customer } = req.body;
  const product: any = req.params.product;
  console.log(customer);
  const newEntity = await getRepository(Review).create({
    comment,
    stars,
    username,
    customer,
    product,
  });
  const results: any = await getRepository(Review).save(newEntity);

  //updt product rating
  const objDb = await getRepository(Product).findOne(results.product);
  if (objDb) {
    await getRepository(Product).save({
      ...objDb,
      rating: objDb.rating + results.stars,
    });
  }
  return res.json(results);
};
