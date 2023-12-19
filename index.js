import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import {router} from './publics/js/routs.js';
import { pool } from "./publics/js/connection/conection.js";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

// middle
app.set('view engine','ejs')
app.set('views', './views')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('publics'));
app.use(session({
    secret: 'cat',
    resave: true,
    saveUninitialized: true
  }))
// ////////
// rutas
app.use(router)
// ////////

function main(port) {
    app.listen(port,()=>{
        console.log(`servidor corriendo en http://localhost:${port} `)
    })
}

main(port)