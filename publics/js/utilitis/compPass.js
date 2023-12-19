import {pool} from "../connection/conection.js";

async function getPass(user) {
    try {
        const result = new Promise((res,rej)=>{
                pool.query(`SELECT PASSWORD FROM users WHERE IDUSUARIO = '${user}'
            `,function(err, result) {
                if (err) throw rej(err);
                res(result);
            })
        });
        return result.then(res =>{
            return res[0]['PASSWORD']
        })
    } catch (error) {
        throw error;
    };
}

export {getPass}