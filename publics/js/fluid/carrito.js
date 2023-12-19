import { expectedHamburguer } from "./constrolMenu.js";
const $carritoVacio = document.querySelector('.carritoVacio');
const $carrito = document.querySelector('.carrito');


async function getCart() {
    let aux;
    await fetch('/carrito/get',{method:'get'})
    .then(response => response.json())
    .then(data => {
        aux = data;
        return aux;
    })
    .catch(err => console.log(err))
    return aux;
}
function deleteItem() {
    const $item = document.querySelectorAll('.eliminarDelCarrito');
    $item.forEach(elem=>{
        elem.addEventListener('click',(e)=>{
            const id = {id:e.currentTarget.id};
            try {
                fetch('/carrito/delete',{
                    method:'post',
                    body:JSON.stringify(id),
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                .then(res =>  chargeItems())
                .catch(res => console.log(res))                
            } catch (error) {
                throw error
            }
            chargeItems()
        })
    });
    expectedHamburguer()
}
function chargeItems() {
    getCart().then(data =>{
        console.log(data)
        if(data.length != 0){
            $carrito.innerHTML = '';
            let $newDivSeleccion = document.createElement('div');
            $newDivSeleccion.classList.add('seleccion');
            let total = 0;

            data.forEach(elem => {
                let $newDiv = document.createElement('div');
                $newDiv.classList.add('carrito_item');
                let contentHTML = `
                <img src="${elem['IMG']}" alt="${elem['DESCRIPCION']}">
                <div class="infItem">
                    <div class="cantidadItem">
                        <h3>Cantidad</h3>
                        <h4>${elem['CANT_PRODUCTO']}</h4>
                    </div>
                    <div class="nombreItem">
                        <h3>${elem['NOMBRE']}</h3>
                    </div>
                    <div class="precioItem">
                        <h3>Precio</h3>
                        <h4>$${elem['PRECIO']}</h4>
                    </div>
                    <button class="button eliminarDelCarrito" id="${elem['ID']}">Eliminar</button>
                </div>
                `;
                total += parseInt(elem['CANT_PRODUCTO'])*parseInt(elem['PRECIO']);
                $newDiv.innerHTML = contentHTML;
                $carrito.append($newDiv);
            });
            deleteItem();
            let html = `
                    <button class="button">Comprar</button>
                    <h3>$${total}</h3>
                    `;
            $newDivSeleccion.innerHTML = html;
            $carrito.append($newDivSeleccion);
        }else{
            $carrito.innerHTML = '';
            $carrito.innerHTML = `<h2 class="carritoVacio">No tiene productos en el carrito.</h2>`;
        }
    })
    expectedHamburguer()
}
chargeItems()