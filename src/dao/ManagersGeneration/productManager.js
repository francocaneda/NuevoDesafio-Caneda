import { getManagerProducts }  from "../daoManager.js";



const data = await getManagerProducts();
const managerProducts = new data.managerProductMongoDB();


export default managerProducts;