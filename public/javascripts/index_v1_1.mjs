const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');


let xDown = [null,null];                                                        
let xPos = [0,0];
let carouselRun=false;
const getTouches=(evt)=> {return evt.touches; }             // browser API}                                                     

const handleTouchStart=(evt,idx)=>{
    const firstTouch = getTouches(evt)[0];                                      
    xDown[idx] = firstTouch.clientX;                                                                      
};                                                

const handleTouchMove=(evt,idx)=> {
    if (!xDown || carouselRun )return;
    var xUp = evt.touches[0].clientX;                                    
    var xDiff = xDown[idx] - xUp;
    if ( xDiff > 0 ) {
        /* left swipe */ 
        if(xPos[idx]>=2)return;
        CAROUSEL_WRAP[idx].style.transform=`translateX(${(++xPos[idx])*(-100)}%)`
        carouselRun=true;
    } else {
        /* right swipe */
        if(xPos[idx]<1)return;
        CAROUSEL_WRAP[idx].style.transform=`translateX(${(--xPos[idx])*(-100)}%)`
        carouselRun=true;
    }                       
    /* reset values */
    xDown[idx] = null;                                             
};

for(let i=0;i<CAROUSEL_WRAP.length;i++){
    CAROUSEL_WRAP[i].addEventListener('touchstart',(e)=>handleTouchStart(e,i),false);
    CAROUSEL_WRAP[i].addEventListener('touchmove',(e)=>handleTouchMove(e,i),false);
    CAROUSEL_BTNS[i].addEventListener('click',(e)=>{
        if(e.target.tagName!=="LI")return;
        CAROUSEL_WRAP[i].style.transform=`translateX(${e.target.value*(-100)}%)`
    })
    CAROUSEL_WRAP[i].addEventListener('transitionend',()=>carouselRun=false);
}

