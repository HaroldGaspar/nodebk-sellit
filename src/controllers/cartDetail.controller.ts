import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
import { CartDetail } from "../entity/CartDetail";
import { Customer } from "../entity/Customer";
import { Product } from "../entity/Product";

//for cart view
export const getProductsByCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { cart } = req.body;
  console.log(cart);
  const cartDetails = await getRepository(CartDetail).find({
    where: { cart },
  });
  const resFormat = cartDetails.forEach((pd) => {
    pd.product.price = parseFloat(pd.product.price.toString());
  });

  return res.json(cartDetails);
};

//only send de productid
export const createCartDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { product } = req.params;
  const { cart } = req.body;

  const cartdb = await getRepository(Cart).findOne(cart);
  const productdb = await getRepository(Product).findOne(product);
  if (cartdb === undefined)
    return res.status(400).json({ message: "verifing failed" });

  const newEntity = await getRepository(CartDetail).create({
    cart: cartdb,
    product: productdb,
  });
  const results = await getRepository(CartDetail).save(newEntity);
  return res.json(results);
};

//update the qty of a cartDT
export const updateCartDetailQty = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { qty } = req.body;

  const objDb = await getRepository(CartDetail).findOne(req.params.id);
  if (objDb) {
    const results = await getRepository(CartDetail).save({
      ...objDb,
      qty,
    });
    return res.json(results);
  }

  return res.json({ msg: "Not obj found in DB" });
};

export const deleteProductDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(CartDetail).delete(req.params.id);
  return res.json(results);
};
