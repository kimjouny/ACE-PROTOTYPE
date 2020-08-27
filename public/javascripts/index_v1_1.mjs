const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');
for(let i=0;i<CAROUSEL_WRAP.length;i++){
    CAROUSEL_BTNS[i].addEventListener('click',(e)=>{
        if(e.target.tagName!=="LI")return;
        CAROUSEL_WRAP[i].style.transform=`translateX(${e.target.value*(-100)}%)`
    })
}

