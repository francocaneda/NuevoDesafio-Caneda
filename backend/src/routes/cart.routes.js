import { Router } from "express";
import { getCart, updateCartProducts, addProductToCart, updateProductQuantity, deleteAllProductsFromCart, deleteOneProductFromCart } from "../controllers/cartController.js";

const routerCarts = Router();


routerCarts.get('/', getCart);
routerCarts.put('/', updateCartProducts);
routerCarts.post('/product/:pid', addProductToCart);
routerCarts.put('/product/:pid', updateProductQuantity);
routerCarts.delete('/', deleteAllProductsFromCart);
routerCarts.delete('/product/:pid', deleteOneProductFromCart);

export default routerCarts