import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cart } from "../entity/Cart";
const jwt = require("jsonwebtoken");

//Get carts by profile view
export const getCartsByCustomer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const customer = req.body.customer;
  const entities = await getRepository(Cart).find({
    where: { customer, isActual: false },
  });
  return res.json(entities);
};

//update the qty of a cartDT
export const updateCartActualState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { totalPrice, userId, customer, cart, username, isSeller } = req.body;

  //checkout to strapi

  //persit cart with transactionID
  const cartDb = await getRepository(Cart).findOne(cart);
  if (cartDb == undefined) {
    return res.status(400).json({ message: "cart not found" });
  }

  const updatedCart = await getRepository(Cart).save({
    ...cartDb,
    totalPrice,
    isActual: false,
    transaction: "pm_feljhgfaelkl",
  });

  //create a new cart for the customer
  const newCart = await getRepository(Cart).create({ customer });
  const cartPersist = await getRepository(Cart).save(newCart);

  //insert new token with cart updated
  const token = jwt.sign(
    {
      _id: userId,
      customer,
      username,
      isSeller,
      cart: cartPersist.id,
    },
    "secretkey"
  );

  return res.json({
    msg: "Cart down with total price and transaction",
    transaction: updatedCart.transaction,
    newCart: cartPersist,
    newToken: token,
  });
};
