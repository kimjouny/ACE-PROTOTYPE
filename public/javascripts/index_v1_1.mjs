import {initCarousel} from './carousel.mjs'

const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');

initCarousel(CAROUSEL_WRAP,CAROUSEL_BTNS);
