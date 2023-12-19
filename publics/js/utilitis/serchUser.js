import {pool} from "../connection/conection.js";
async function searchUser(user) {
    let responce;
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(
                `SELECT IDUSUARIO FROM users WHERE IDUSUARIO = '${user}'`,
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });

        if (result[0] !== undefined) {
            console.log('op1');
            responce = true;
        } else {
            console.log('op2');
            responce = false;
        }
        return responce;
    } catch (error) {
        throw error;
    }
}

export {searchUser}