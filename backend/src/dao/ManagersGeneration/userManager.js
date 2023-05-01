import { getManagerUsers } from "../daoManager.js";
import { createHash } from "../../utils/bcrypt.js";


const data = await getManagerUsers()
const userManager = new data.ManagerUserMongoDB();

export const createUser = async (req, res) => {
    res.send({ status: "success", message: "User Created" })
}

export default userManager;