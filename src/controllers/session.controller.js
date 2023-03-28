import { checkLoginUser } from "./user.controller.js"


export const getSession = (req, res) => {
    if (req.session.login) { 
        res.redirect('/product', 200, {
            'message': "Bienvenido/a a mi tienda"
        })
    }
    
    res.redirect('/api/session/login', 500, {
        
    })
}

export const testLogin = async(req, res) => {
    const {email,password} = req.body;
    //Consultar datos del formulario de login
    try {

        if (await checkLoginUser(email,password)) { 
            req.session.login = true
            res.redirect('/product', 200)
        } else {
            res.redirect("/api/session/login", 500, {
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const destroySession = (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.redirect('/product', 200, {
        'divMessage': "Buenos días/tardes"
    })
}