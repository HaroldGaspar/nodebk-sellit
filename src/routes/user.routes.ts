import { Router } from "express";
import {
  getCartsByCustomer,
  updateCartActualState,
} from "../controllers/cart.controller";
import {
  createCartDetail,
  deleteProductDetail,
  getProductsByCart,
  updateCartDetailQty,
} from "../controllers/cartDetail.controller";
import {
  createCategory,
  getCategories,
  getCategory,
} from "../controllers/category.controller";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customer.controller";
import {
  createProduct,
  getLatestProducts,
  getOneProduct,
  getPopularProducts,
  getStoreProduct,
  updateProduct,
} from "../controllers/product.controller";
import {
  createReview,
  getReviewsByProduct,
} from "../controllers/review.controller";
import { createStore, getStores } from "../controllers/store.controller";
const router = Router();

import {
  changePassword,
  verifyToken,
  signin,
  signup,
} from "../controllers/user.controller";
import { createUsersValidation, validate } from "../Validate/validations";

router.post("/register", validate(createUsersValidation), signup);
router.post("/authenticate", signin);
router.put("/change-password", verifyToken, changePassword);

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
// router.post("/categories", createCategory);

router.get("/products-popular", getPopularProducts);
router.get("/products-last/:page", getLatestProducts);
router.get("/products", verifyToken, getStoreProduct);
router.get("/products/:id", getOneProduct);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", verifyToken, updateProduct);

router.get("/reviews", getReviewsByProduct);
router.post("/reviews/:product", verifyToken, createReview);
// router.put("/reviews", verifyToken, updateCartDetailQty);
// router.delete("/reviews", deleteProductDetail);

router.get("/carts", verifyToken, getCartsByCustomer);
router.post("/carts", verifyToken, updateCartActualState);

router.get("/cartDetails", verifyToken, getProductsByCart);
router.post("/cartDetails/:product", verifyToken, createCartDetail);
router.put("/cartDetails/:id", verifyToken, updateCartDetailQty);
router.delete("/cartDetails/:id", verifyToken, deleteProductDetail);
export default router;
