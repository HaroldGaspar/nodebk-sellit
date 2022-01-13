//==============// AUTH //==============//

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  confimationToken: string;
  confirmed: boolean;
  verified: boolean;
}
export interface ICustomer {
  id?: number;
  isSeller: boolean;
  user: IUser;
  store: IStore | undefined;
  reviews?: IReview[];
  carts?: ICart[];
}

export interface ovCreateCustomer {
  isSeller: boolean;
  user: number;
  store: number | null;
}

export interface ICart {
  id?: number;
  totalPrice?: number;
  customer: ICustomer;
  isActual?: boolean;
  transaction?: string;
  cartDetails?: ICartDetail[];
}

//==============// PRODUCTS //==============//
export interface IStore {
  id?: number;
  name: string; //customer register
  address?: string;
  description?: string;
  phoneNumber?: string;
  products?: IProduct[];
}
export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}
export interface IProduct {
  id: number;
  name: string;
  mark: string;
  price: number;
  stock: number;
  description: string;
  rating: number;
  photo: string;
  category: ICategory;
  store: IStore;
  reviews: IReview[];
}

export interface LatestProduct {}

//==============// SERVICE //==============//
export interface ICartDetail {
  id: number;
  qty: number;
  product: IProduct;
  cart: ICart;
}
export interface IReview {
  id: number;
  comment: string;
  stars: number;
  username: string;
  product: IProduct;
  customer: ICustomer;
}
