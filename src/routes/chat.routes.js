import { Router } from "express";

const routerChat = Router();

routerChat.get('/', async(req,res) => {
        res.render("chat", { 
        titulo: "Caneda Franco",
      })
      
  })

export default routerChat;