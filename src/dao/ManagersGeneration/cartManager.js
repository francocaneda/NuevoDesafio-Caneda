
import { getManagerCart } from "../daoManager.js";

const data = await getManagerCart()
const cartManager = new data.cartManagerMongoDB();

export default cartManager;