import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import { Store } from "../entity/Store";

export const getOneProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const productDetail = await getRepository(Product).findOne(req.params.id);
  return res.json(productDetail);
};

export const getStoreProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { store } = req.body;

  const storeProducts = await getRepository(Product).find({
    where: {
      store,
    },
  });
  return res.json(storeProducts);
};

//get first 12
export const getPopularProducts = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const entities = await getRepository(Product)
      .createQueryBuilder("product")
      .orderBy("product.rating", "DESC")
      .limit(3)
      // .where({ where: {
      //   last_modified:  MoreThan('2018-11-15  10:41:30.746877') },})
      .getMany();
    return res.json(entities);
  } catch (error) {
    next(error);
  }
};

export const getLatestProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const { offset, limit }: any = req.query;
  const page = parseInt(req.params.page) - 1;
  const limit = 4; //can be changed
  const offset = page * limit;
  const entities = await getRepository(Product).findAndCount({
    take: limit,
    skip: offset,
  });

  const resFormat = entities[0].map((pd) => {
    pd.price = parseFloat(pd.price.toString());
    return pd;
  });

  return res.json(resFormat);
};

//find store from customerId
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, mark, price, stock, description, photo, category, store } =
    req.body;

  //upload image

  //persit product
  const storedb = await getRepository(Store).findOne(store);
  const categorydb = await getRepository(Category).findOne(category);

  const newEntity = await getRepository(Product).create({
    name,
    mark,
    price,
    stock,
    description,
    photo,
    category: categorydb,
    store: storedb,
  });
  const productPersist = await getRepository(Product).save(newEntity);
  return res.json(productPersist);
};

//no update stock
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const objDb = await getRepository(Product).findOne(req.params.id);
    const { name, mark, price, description } = req.body;
    if (objDb) {
      //si el producto existe
      getRepository(Product).merge(objDb, { name, mark, price, description });
      const results = await getRepository(Product).save(objDb);
      return res.json(results);
    }

    return res.json({ message: "Not obj found in DB" });
  } catch (error) {
    next(error);
  }
};
