import { getManagerUsers } from "../dao/daoManager.js";


const data = await getManagerUsers()
const managerUser = new data.ManagerUserMongoDB

export const createUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    try {
        const user = await managerUser.getElementByEmail(email)
        if (user) {
            
        }
        await managerUser.addElements([{ first_name, last_name, email, age, password }])

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const checkLoginUser = async (email, password) => {
    const usuarios = await managerUser.getElements();
    let resultado = false;
    usuarios.forEach(usuario=>{
        if (usuario.email == email && usuario.password==password){
            resultado= true
        }
    })
    return resultado


}