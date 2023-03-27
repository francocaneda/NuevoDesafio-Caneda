import fs from "fs";



export class Producto {
    constructor(title, description, price, thumbnail, code, stock, status, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }

    
}

const producto1 = new Producto("Peine", "Artículo accesorio", 500, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/peine.png?alt=media&token=b767443f-12a0-4150-b1d7-b3c2be33999c", 1, 50, true, "prueba")
const producto2 = new Producto("Royal Canin", "Artículo de alimento", 1200, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/alimento.png?alt=media&token=e3c27ed3-fc1f-4f37-b027-bda03c510c0d", 2, 40, true, "prueba")
const producto3 = new Producto("Bolso", "Artículo de traslado", 850, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/bolso.png?alt=media&token=d67b0ca0-d35f-4446-8be0-04de8c615706", 3, 60, true, "prueba")
const producto4 = new Producto("Chaleco", "Artículo de protección", 800, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/chaleco.png?alt=media&token=17c0271f-3417-4961-94f6-b1e3d3a2d579", 4, 53, true, "prueba")
const producto5 = new Producto("Shampoo", "Artículo de higiene", 600, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/shampoo.png?alt=media&token=8a425529-1ecc-46d6-af78-c56a773fd33e", 5, 58, true, "prueba")
const producto6 = new Producto("Arnes", "Artículo de traslado", 720, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/arnes.png?alt=media&token=5f964b11-fa5b-4fd3-b450-74e82d07b0cf" , 6, 61, true, "prueba")



export class ProductManager {
    constructor(path) {
        this.path = path;

    }
    checkArchivo = ()=>{
        return fs.promise.existsSync(this.path)
    }
    newArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    
    
    
    addProduct = async (newProduct) => { 
        
        let campos = 8;
        let i=0;
        for (const campo in newProduct){
            i++
        }
        

        if(i == campos){
        if ((newProduct.title != undefined) && (newProduct.description != undefined) && (newProduct.price != undefined) && (newProduct.thumbnail != undefined) && (newProduct.code != undefined) && (newProduct.stock != undefined) && (newProduct.status === true) && (newProduct.category != undefined)){
            
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(contenido);
            const tituloAuxiliar = products.find(product => product.code == newProduct.code);

            if (tituloAuxiliar)
            {
                
                console.log(`El producto "${tituloAuxiliar.title}" ya está en la lista.`);
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let auxiliar = JSON.parse(contenido);

                if (auxiliar.length>0){
                    const idAleatorio = auxiliar[auxiliar.length-1].id+1; 
                    auxiliar.push({ ...newProduct, id: idAleatorio });
                    await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));
                    
                }
                else{
                    const idAleatorio = 1;
                    auxiliar.push({ ...newProduct, id: idAleatorio });
                    await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));
                    
                }
            }        
        }else{
            console.log("No pueden faltar campos")
        }
    }else {
        console.log("Se deben completar los 8 campos");
        res.send(undefined);
        
    }
       
    }

    getProducts = async() => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8') 
        let auxiliar = JSON.parse(contenido)
        return auxiliar;  
    }


    getProductById = async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let auxiliar = JSON.parse(contenido)
        if(auxiliar.some(product=> product.id === id)) 
        {
            let pos = auxiliar.findIndex(product => product.id === id)
            return auxiliar[pos];
        }else{
            return console.log("Producto no identificado.")
        }        
    }


    updateProduct = async({title, description, price, thumbnail, code, stock, status, category, id})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let auxiliar = JSON.parse(contenido)
        const tituloAuxiliar = auxiliar.find(product => product.id === id);
        if(auxiliar.some(product=> product.id === id)) {
            let pos = auxiliar.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    auxiliar[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    auxiliar[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    auxiliar[pos].price = parseInt(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    auxiliar[pos].thumbnail = thumbnail;
                }
            }
            if (auxiliar.some(prod => prod.code==code)){
                return "Code repetido"
            }else if(code!=undefined){
                if (code.length>0)
                {
                    auxiliar[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    auxiliar[pos].stock = parseInt(stock);
                }
            }
            if (status!=undefined){
                if (status==false)
                {
                    auxiliar[pos].status = false;
                }else{
                    auxiliar[pos].status = true;
                }
            }
            if (category!=undefined){
                if (category.length>0)
                {
                    auxiliar[pos].category = category;
                }
            }
            if (id!=undefined){
                if (id.length>0)
                {
                    auxiliar[pos].id = parseInt(id);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(auxiliar))
            console.log(`El producto "${tituloAuxiliar.title}" fue actualizado.`);
        } else {
            console.log( "No hay productos para actualizar.")
        }
    
    }

    deleteProductById = async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        if(auxiliar.some(product=> product.id === id))
        {
            const arrayNuevo = auxiliar.filter(product => product.id != id);
            const tituloAuxiliar = auxiliar.find(product => product.id === id);
            await fs.promises.writeFile(this.path, JSON.stringify(arrayNuevo))
            console.log(`El producto "${tituloAuxiliar.title}" fue eliminado.`);
            
        }else{
            console.error("No se encontró el producto.");
            res.send(undefined);
        }
    }

    fileArchivo = async () => {
        
        await this.addProduct(producto1);
        await this.addProduct(producto2);
        await this.addProduct(producto3);
        await this.addProduct(producto4);
        await this.addProduct(producto5);
        await this.addProduct(producto6);
        

    }

}

const manager = new ProductManager('../models/products.json');
const tests = async()=>{
    await manager.updateProduct({id:1,title:"2",description:"3",price:"4",thumbnail:["5"],code:"6",stock:"7",status:false,category:"9"})
 };

tests();













