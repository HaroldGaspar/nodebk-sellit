import { NextFunction, Request, Response } from "express";
import { getRepository, QueryFailedError } from "typeorm";
import { Cart } from "../entity/Cart";
import { Customer } from "../entity/Customer";
import { Store } from "../entity/Store";
import { User } from "../entity/User";
import { ICustomer, IStore, ovCreateCustomer } from "../interface/interface";

import bcrypt from "bcryptjs";

const jwt = require("jsonwebtoken");

//register
export const signup = async (req: Request, res: Response, next: any) => {
  try {
    const { username, email, password, store } = req.body;
    const isSeller: boolean = store === "" ? false : true;
    //create user
    const newUser = await getRepository(User).create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    let userPersist;
    userPersist = await getRepository(User).save(newUser);
    console.log(userPersist);

    if (userPersist == undefined) next(userPersist);

    //create store?
    let storePersist;
    if (isSeller) {
      const storeObj: IStore = { name: store };
      const newStore = await getRepository(Store).create(storeObj);
      storePersist = await getRepository(Store).save(newStore);
    }

    //create customer
    const customerObj: ICustomer = {
      isSeller,
      user: userPersist,
      store: storePersist,
    };
    let customerPersist;
    const newCustomer = await getRepository(Customer).create(customerObj);
    customerPersist = await getRepository(Customer).save(newCustomer);

    //update user and store customerid
    const userWithCustomer = await getRepository(User).merge(userPersist, {
      customer: customerPersist,
    });
    await getRepository(User).save(userWithCustomer);
    if (storePersist !== undefined) {
      const storeWithCustomer = await getRepository(Store).merge(storePersist, {
        customer: customerPersist,
      });
      await getRepository(Store).save(storeWithCustomer);
    }
    //create first cart
    const newCart = await getRepository(Cart).create({
      customer: customerPersist,
    });
    const cartPersist = await getRepository(Cart).save(newCart);

    //atach cart
    customerPersist = await getRepository(Customer).save({
      ...customerPersist,
      carts: [cartPersist],
    });

    return res.json(customerPersist);
  } catch (error) {
    next(error);
  }
};

//change password
export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.body.userId);
  const { previousPassword, newPassword, confirmPassword } = req.body;
  if (user) {
    //validate
    if (newPassword != confirmPassword)
      return res.status(400).json({ message: "password not mached" });

    //hashing
    const password = bcrypt.hashSync(previousPassword, 10);
    getRepository(User).merge(user, { password });

    const results = await getRepository(User).save({ password });
    return res.json(results);
  }

  return res.json({ msg: "Not user found" });
};

export async function verifyToken(req: Request, res: Response, next: any) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauhtorized Request NO_HEADER");
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).send("Unauhtorized Request JWT_WRONG_FORMAT");
    }

    const payload = await jwt.verify(token, "secretkey");
    console.log("verifing token ", payload);
    if (!payload) {
      return res.status(401).send("Unauhtorized Request");
    }
    req.body.userId = payload._id;
    req.body.customer = payload.customer;
    req.body.cart = payload.cart;
    req.body.username = payload.username;
    req.body.isSeller = payload.isSeller;
    req.body.store = payload.store;
    next();
  } catch (e) {
    //console.log(e)
    return res.status(401).send("Unauhtorized Request");
  }
}

//return a jwt
export async function signin(req: Request, res: Response, next: any) {
  const { email, password } = req.body;

  const user = await getRepository(User).findOne({ email });
  if (!user) return res.status(401).send("The email doen't exists");

  console.log(user.customer);

  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).send("Wrong Password");

  const token = jwt.sign(
    {
      _id: user.id,
      customer: user.customer.id,
      username: user.username,
      isSeller: user.customer.isSeller,
      store: user.customer.store?.id,
      cart: user.customer.carts.filter((c) => c.isActual === true)[0].id,
    },
    "secretkey"
  );

  return res.status(200).json({ token });
}
