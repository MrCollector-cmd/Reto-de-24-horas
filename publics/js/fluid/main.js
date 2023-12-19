import { expectedHamburguer } from "./constrolMenu.js";
let $buttonProds = document.querySelectorAll('.buttons');
let $buttonAgregado = document.querySelector('.agrega');
let $conteinerInf = document.querySelector('.prodInfo');
const $conteinerCard = document.querySelector('.mercado_cards');
const $conteinerMain = document.getElementById('mainProductos');



async function getProds() {
    let aux;
    await fetch('/productos/get',{method:'get'})
    .then(response => response.json())
    .then(datos =>{aux = datos;return aux;})
    .catch(err => {throw(err)})
    return aux
};
function insertProds() {
    getProds().then(res=>{
        res.forEach(elem => {
            let $newDiv = document.createElement('div');
            $newDiv.classList.add('card');
            let content =`
                <img src="${elem['IMG']}" alt="${elem["DESCRIPCION"]}">
                <div class="inf_card">
                    <h3>${elem["NOMBRE"]}</h3>
                    <p>${elem["DESCRIPCION"]}</p>
                    <p class="precio">$${elem['PRECIO']}</p>
                    <button class="button" id="${elem['ID']}">Agregar</button>
                </div>
            `;
            $newDiv.innerHTML = content;
            $conteinerCard.appendChild($newDiv);
        });
        getButtons()
    });
}
function closeConteinerInf() {
    $conteinerInf = document.querySelector('.prodInfo')
    $conteinerInf.parentElement.addEventListener('click',(e)=>{
        if (e.target == $conteinerInf.parentElement) {
            $conteinerMain.lastChild.remove()
        }
    });
    expectedHamburguer()
}
async function setCartShop() {
    let $form = document.querySelector('form');
    $form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const ids = {id:e.currentTarget.id,cantidad:data.get('cantidad')};
        getProds().then(async (res) =>{
            const id_prod = res.find(dat => dat.ID_PROD == ids.id)['ID'];
            ids.id_prod = id_prod;
            try {
                for (let i = 0; i < parseInt(ids.cantidad); i++) {
                    await fetch('/setCarrito', {
                        method:'post',
                        body: JSON.stringify(ids),
                        headers:{
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        res.json().then(response=>{
                            if(response.loc != undefined){
                                window.location.href = response.loc;
                            }else{console.log(response)}
                        })
                    })
                    .catch(res => console.log(res))
                }
            } catch (error) {
                throw error;
            }
            $conteinerMain.lastChild.remove();
        })
    })
    expectedHamburguer()
}
function arrowsControl() {
    let arrows = document.querySelectorAll('.arrow');
    let input = document.querySelector('.inputNum');
    arrows.forEach(elem=>{
        elem.addEventListener('click',(e)=>{
            if (e.currentTarget.classList.contains('flechaArriba')) {
                input.setAttribute('value', `${parseInt(input.getAttribute('value'))+1}`)
            } else if(e.currentTarget.classList.contains('flechaAbajo') && parseInt(input.getAttribute('value')) > 1 ){
                input.setAttribute('value', `${parseInt(input.getAttribute('value'))-1}`)
            }
        });
    });
}
function getButtons() {
    $buttonProds = document.querySelectorAll('.button');
    $buttonProds.forEach(button => {
        button.addEventListener('click',(e)=>{
            let id = e.currentTarget.id;
            getProds().then(res =>{
                const match = res.find(elem => elem['ID'] == id);
                const newDiv = document.createElement('div');
                newDiv.classList.add('conteinerInfo');
                let contentHTML=`
                    <div class="prodInfo">
                        <img class="img" src="${match['IMG']}" alt="${match['DESCRIPCION']}">
                        <div class="infContent">
                            <h3>${match['NOMBRE']}</h3>
                            <h4>Descripcion</h4>
                            <p>${match['DESCRIPCION']}</p>
                            <h4 class="precio">$${match['PRECIO']}</h4>
                            <form class="options_select" id='${match['ID_PROD']}'>
                                <button type="submit" class="button agrega" >Agregar al carrito</button>
                                <img class="flechaArriba arrow" src="img/elem/arrow.png" alt="flecha para poner mayor cantidad de items">
                                <input class="inputNum" name="cantidad" type="number" min="1" value="1" readonly disable>
                                <img class="flechaAbajo arrow" src="img/elem/arrow.png" alt="flecha para poner menor cantidad de items">
                            </form>
                        </div>
                    </div>
                `;
                newDiv.innerHTML = contentHTML;
                $conteinerMain.appendChild(newDiv);
                arrowsControl();
                closeConteinerInf();
                setCartShop();
            });
            expectedHamburguer()
        });
    });
};

insertProds()