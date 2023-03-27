/*import { Router } from "express";
import {ProductManager} from "../dao/FileSystem/models/ProductManager.js"
const routerSocket = Router();
const productManager = new ProductManager('src/models/products.json');




routerSocket.get('/realtimeproducts', async(req,res) => {
    
    const products = await productManager.getProducts()

    res.render("realTimeProducts", { 
        titulo: "Desafio 4 - Caneda Franco",
        products: products
    })
  })
  

routerSocket.get('/', async(req,res) => {
  const products = await productManager.getProducts()
      res.render("index", { 
      titulo: "Desafio 4 - Caneda Franco",
      products: products
    })
})



export default routerSocket;
*/