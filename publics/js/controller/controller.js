import {pool} from '../connection/conection.js';
import { searchUser } from "../utilitis/serchUser.js";
import { getPass } from "../utilitis/compPass.js";
import bcrypt from "bcrypt";

function log(req,res) {
    res.render('log', {head:'partials/head',titulo:'login',footer:'partials/footer'})
}

async function register(req,res) {
    const datos = req.body;
    let responce = await searchUser(datos.user);
    if(responce === true){
        console.log('El usuario ya existe..')
        res.redirect('/log')
        return
    }else if(responce === false){
        const passHash = bcrypt.hashSync(datos.password, 12)
        await pool.query(`INSERT INTO users(NOMBRE,EMAIL,CELULAR,PASSWORD,IDUSUARIO)VALUE('${datos.nombre}','${datos.email}','${datos.celular}','${passHash}','${datos.user}')`, function(err, result) {
            if (err === true && responce){console.log(err.sqlState);res.redirect('/')}
            else{res.redirect('/log')}
        });
    }
};

async function auth(req,res) {
    const datos = req.body;
    let exist = await searchUser(datos.user);
    let pass = await getPass(datos.user, datos.password);
    if(exist){
        await bcrypt.compare(datos.password,pass,(err,resp)=> {
            if (resp) {
                console.log('exito')
                req.session.loggedin = true;
                req.session.user = datos.user;
                res.redirect('/');
            }else{console.log('eeeeeeeee')}
        })
    }else{
        console.log('El usuario no existe')
        res.send()
    }
};

function closeSession(req,res) {
    if(req.session.loggedin == true){
        req.session.destroy()
        res.redirect('/')
    }else{
        console.log('Todavia no se inicio sesion')
        res.redirect('/')
    }
}

export {register,auth,log,closeSession};