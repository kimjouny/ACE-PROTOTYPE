

let xDown = null;                                                        
let yDown = null;

const SCROLL_VIEW=document.getElementsByClassName('slide_container')[0];
const OVERLAY=document.getElementsByClassName('overlay_section')[0];
window.onload=()=>{
    setTimeout(()=>{OVERLAY.style.opacity='0'},1500);
}

OVERLAY.addEventListener('transitionend',()=>{
    OVERLAY.style.display='none';
})

const getTouches=(evt)=>{return evt.touches;}                                                     
  
const handleTouchStart=(evt)=>{
    const firstTouch = getTouches(evt)[0];                                      
    // xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                
};                                                

const handleTouchMove=(evt)=>{
    if (!yDown )return;
                                 
    const yUp = evt.touches[0].clientY;

    const yDiff = yDown - yUp;
    if ( yDiff > 0 ) {
        /* up swipe */ 
        SCROLL_VIEW.style.bottom="7%"
    } else { 
        /* down swipe */
        SCROLL_VIEW.style.bottom="-30%"
    }                                                                 

    yDown = null;                                             
};

SCROLL_VIEW.addEventListener('touchstart',handleTouchStart);
SCROLL_VIEW.addEventListener('touchmove',handleTouchMove)

const PROTOTYPES=document.getElementsByClassName('version_el');
PROTOTYPES[0].addEventListener('click',()=>window.location.href="/v1.0")