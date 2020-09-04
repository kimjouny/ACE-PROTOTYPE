import {initCarousel} from './carousel.mjs'
import {graphToggle} from './graphToggle.mjs'

/*CAROUSEL LAYOUT INTERACTION */
const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');
initCarousel(CAROUSEL_WRAP,CAROUSEL_BTNS);


/* TOGGLE INTERACTION */
const TOGGLE_ELES=document.getElementsByClassName('graph_element');
const GRAPH_TOGGLES=document.getElementsByClassName('graph_toggle_container')[0];
GRAPH_TOGGLES.addEventListener('click',e=>graphToggle(e,TOGGLE_ELES));