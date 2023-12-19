const $tap = document.querySelector('.tap');
const $tap_class= [...$tap.classList];
const $main = document.querySelector('.loged');
const $conteinerForm = document.querySelector('.container-forms');
$tap.addEventListener('click',()=>{
    if ($tap_class.find(elem => elem == 'right') !== undefined) {
        $tap.classList.toggle('right')
        $tap.classList.toggle('left')
        $tap.style['pointer-events'] = 'none';
        $main.style['pointer-events'] = 'none';
        setTimeout(()=>{
            $main.style['pointer-events'] = 'auto'
            $tap.style['pointer-events'] = 'auto'
        },1000)
    }
})
$conteinerForm.addEventListener('click',(e)=>{
    if (e.target != $conteinerForm) {
    }else{
        window.location.href = 'http://localhost:3000/index';
    }
})