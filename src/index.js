import "dotenv/config"
import express from "express";
import { Server } from "socket.io";
import { getmessageManagers, getproductManagers} from "./dao/daoManager.js";
import { __dirname, __filename } from "./path.js";
import rutasEnInicio from "./routes/rutasEnInicio.routes.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import { engine } from 'express-handlebars';
import * as path from 'path'
import routerChat from "./routes/chat.routes.js";
//import productManager from "./dao/ManagersGeneration/productManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//PORT
app.set("port", process.env.PORT || 5000)

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))

//Socket.io
const io = new Server(server)

//Messages
const messageData = await getmessageManagers()
const messageManager = new messageData.messageManagerMongoDB();





io.on("connection", async (socket) => {
    console.log("Cliente conectado")
    socket.on("message", async (info) => {
            messageManager.addElements([info]).then(() => {
            messageManager.getElements().then((mensajes) => {
                socket.emit("allMessages", mensajes)
            })
        })
    })
    messageManager.getElements().then((mensajes) => {
        socket.emit("allMessages", mensajes)
    })
})

//Routes
app.use('/', rutasEnInicio)
app.use('/chat', routerChat)
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use("/api/carts", routerCart)



/*
//Código utilizado en anteriores desafíos.

/*app.listen(PORT, () => {
    console.log(`Server on port:${PORT}`);
}); 

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"src/public/img");        
    },
    filename: (req,file,cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})


//Routes
app.post("/upload",upload.single("product"),(req,res)=>{
    res.send("Imagen cargada correctamente")
})*/