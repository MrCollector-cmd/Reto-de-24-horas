import express from "express";
import { pool } from "./connection/conection.js";
import {auth,register,log,closeSession} from "./controller/controller.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// router.get('/getProductos',(req,res)=>{
//     let datos = fs.readFileSync(__dirname+'\\fluid\\prods.json');
//     datos = JSON.parse(datos)
//         datos.forEach(elem => {
//             pool.query(
//                     `
// INSERT INTO productos (NOMBRE,CATEGORIA,IMG,STOCK,PRECIO,DESCRIPCION,ID_PROD) VALUES('${elem.nombre}','${elem.categoria}','${elem.img}','${elem.stock}','${elem.precio}','${elem.descripcion}','${elem.id_prod}')
// `,
//                     (err, result) => {
//                         if (err) throw err;
//                         console.log(result);
//                     }
//                 );
//         })
//     })



router.get('/',(req,res)=>{
    if (req.session.loggedin == true) {
        res.render('index',{titulo:"Inicio",head:'partials/head_main',main:'partials/main-inicio',nav:'partials/nav_session',footer:'footer'})
    }else(
        res.render('index',{titulo:"Inicio",head:'partials/head_main',main:'partials/main-inicio',nav:'partials/nav',footer:'footer'})
    )
});
router.get('/index',(req,res)=>{
    if (req.session.loggedin == true) {
        res.render('index',{titulo:"Inicio",head:'partials/head_main',main:'partials/main-inicio',nav:'partials/nav_session',footer:'footer'})
    }else(
        res.render('index',{titulo:"Inicio",head:'partials/head_main',main:'partials/main-inicio',nav:'partials/nav',footer:'footer'})
    )
});
router.get('/productos',(req,res)=>{
    if (req.session.loggedin == true) {
        res.render('index',{titulo:"Productos",head:'partials/head_main-prods',main:'partials/main-productos',nav:'partials/nav_session'})
    } else {
        res.render('index',{titulo:"Productos",head:'partials/head_main-prods',main:'partials/main-productos',nav:'partials/nav'})
    }
});
router.get('/carrito',(req,res)=>{
    if (req.session.loggedin == true) {
        res.render('index',{titulo:"Carrito",head:'partials/head_main-carrito',main:'partials/main-carrito',nav:'partials/nav_session'})
    } else {
        console.log('usted no se a logueado');
        res.redirect('/log')
    }
});
router.post('/setCarrito',(req,res)=>{
    if(req.session.loggedin == true){
        const data = req.body;
        try {
            pool.query(`INSERT INTO carrito(IDUSUARIO,IDPRODUCTO)VALUE('${req.session.user}','${data.id_prod}')`, function(err, result) {
                if (err) throw err;
                else{res.redirect('/productos')}
            });
        } catch (error) {
            throw error
        }
    }else{
        console.log('usted todavia no se a logueado');
        res.json({loc:'http://localhost:3000/log'});
    }
})

// rutas globales
router.get('/productos/get',(req,res)=>{
    try {
        pool.query(
        `SELECT * FROM productos`,
        (err, result) => {
            if (err) throw err;
            res.send(result)
        }
        );
    } catch (error) {
        console.log(error)
    }
});
router.get('/carrito/get',(req,res)=>{
    if (req.session.loggedin == true) {
        try {
            pool.query(
                `SELECT * ,
                COUNT(IDPRODUCTO) as CANT_PRODUCTO,
                (SELECT COUNT(IDUSUARIO) FROM carrito c2 WHERE c2.IDUSUARIO = '${req.session.user}') AS CANT_COMPRAS 
                FROM carrito c 
                INNER JOIN productos p ON p.ID = c.IDPRODUCTO 
                WHERE IDUSUARIO = '${req.session.user}'
                GROUP BY IDPRODUCTO  HAVING COUNT(IDPRODUCTO)
                `,
            (err, result) => {
                if (err) throw err;
                res.send(result)
            }
            );
        } catch (error) {
            console.log(error)
        }
    } else {
        res.redirect('/log')
    }
});
router.post('/carrito/delete',(req,res)=>{
    const data = req.body;
    if (req.session.loggedin == true) {
        try {
            pool.query(
                `DELETE FROM carrito WHERE IDPRODUCTO = '${data.id}' AND IDUSUARIO = '${req.session.user}'`,
            (err, result) => {
                if (err) throw err;
                res.send(result)
            }
            );
        } catch (error) {
            console.log(error)
        }
    } else {
        res.redirect('/log')
    }
});
router.get('/log',log)
router.post('/login',auth)
router.post('/register',register)
router.get('/logout',closeSession)

export {router}