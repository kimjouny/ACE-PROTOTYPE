
let xDown = [null,null];    
let yDown=null;                                                   
let xPos = [0,0];
let carouselRun=false;
const getTouches=(evt)=> {return evt.touches; }             // browser API}                                                     

const handleTouchStart=(evt,idx)=>{
    const firstTouch = getTouches(evt)[0];                                      
    xDown[idx] = firstTouch.clientX;           
    yDown=firstTouch.clientY;                                                     
};                                                

const handleTouchMove=(evt,idx)=> {
    if (!xDown || carouselRun )return;
    if(document.getElementsByClassName('chartJS_text')[0].style.visibility=="hidden")return;
    var xUp = evt.touches[0].clientX;        
    let yUp = evt.touches[0].clientY;                            
    var xDiff = xDown[idx] - xUp;
    let yDiff= yDown-yUp;
    if(Math.abs(yDiff)>Math.abs(xDiff)){
        return;
    }
    if ( xDiff > 0 ) {
        /* left swipe */ 
        if(xPos[idx]>=2)return;
        evt.currentTarget.style.transform=`translateX(${(++xPos[idx])*(-100)}%)`
        carouselRun=true;
        const focused=document.getElementsByClassName('caro_btn_focused')[0];
        focused.classList.remove('caro_btn_focused');
        focused.nextElementSibling.classList.add('caro_btn_focused');
    } else {
        /* right swipe */
        if(xPos[idx]<0)return;
        evt.currentTarget.style.transform=`translateX(${(--xPos[idx])*(-100)}%)`
        carouselRun=true;
        const focused=document.getElementsByClassName('caro_btn_focused')[0];
        focused.classList.remove('caro_btn_focused');
        focused.previousElementSibling.classList.add('caro_btn_focused');
    }                       
    /* reset values */
    xDown[idx] = null;                                            
};

const handleCarouselBtn=(e,CAROUSEL_WRAP)=>{
    if(e.target.tagName!=="LI")return;
    CAROUSEL_WRAP.style.transform=`translateX(${e.target.value*(-100)}%)`
    const focused=document.getElementsByClassName('caro_btn_focused')[0];
    if(focused===e.target)return;
    e.target.classList.add('caro_btn_focused');
    focused.classList.remove('caro_btn_focused')
    xPos[0]=e.target.value;
}


const initCarousel=(CAROUSEL_WRAP,CAROUSEL_BTNS)=>{
    for(let i=0;i<CAROUSEL_WRAP.length;i++){
        CAROUSEL_WRAP[i].addEventListener('touchstart',(e)=>handleTouchStart(e,i),false);
        CAROUSEL_WRAP[i].addEventListener('touchmove',(e)=>handleTouchMove(e,i),false);
        CAROUSEL_BTNS[i].addEventListener('click',(e)=>handleCarouselBtn(e,CAROUSEL_WRAP[i]))
        CAROUSEL_WRAP[i].addEventListener('transitionend',()=>carouselRun=false);
    }
}

export {initCarousel}
