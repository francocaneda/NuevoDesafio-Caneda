import { Router } from "express";

const routerChat = Router();

routerChat.get('/', async(req,res) => {
        res.render("chat", { 
        titulo: "Segunda Pre Entrega - Caneda Franco",
      })
      
  })

export default routerChat;