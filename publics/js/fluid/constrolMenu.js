

const $menuHamburguer = document.querySelector('.menu-h');
const $navs = document.querySelector('.nav');
const $bodyOrden = document.querySelector('body');
const $sep = document.querySelector('.sep');

export function expectedHamburguer() {
    $menuHamburguer.addEventListener('click',(e)=>{
        $bodyOrden.classList.toggle('bodyOrden');
        $navs.classList.toggle('ordenNav');
    });
    $navs.addEventListener('click',(e)=>{
        $navs.classList.toggle('ordenNav');
        $bodyOrden.classList.toggle('bodyOrden');
    })
}

expectedHamburguer()