import {CUSTOMERS} from './pensionData.mjs'

const ctx = document.getElementById("myChart");
let numDataPoints = 36;
let dataset=[
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
];

for(let i=0;i<CUSTOMERS[0].pensions.length;i++){
    for(let j=0;j<numDataPoints;j++){
        dataset[j]+=CUSTOMERS[0].pensions[i].receipts[j];
    }
}

var data = {
  labels: Array.apply(null, Array(numDataPoints)).map(function() {
    return '';
  }),
  datasets: [{
    data: dataset,
    pointRadius: 0,
    borderWidth: 10,
    borderColor: '#50953a',
    backgroundColor: 'transparent',
  }]
};

new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    pointDot: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }],
    }
  }
});

const SPEND_OPTIONS=document.getElementsByClassName('chartJS_overlay_container')[0];
SPEND_OPTIONS.addEventListener('click',(e)=>{
  switch(e.target.tagName){
    case 'LI':{
      const SPEND_INPUT=document.getElementsByClassName('spend_input')[0];
      SPEND_INPUT.innerHTML=e.target.dataset.spend;
      /*change color */
      const ACTIVED=document.getElementsByClassName('spend_selected')[0];
      if(ACTIVED===e.target)break;
      ACTIVED.classList.remove('spend_selected');
      e.target.classList.add('spend_selected');
      /*change horizontal height */
      changeHorozontal(e.target.dataset.spend);
      break;
    }
    case 'DIV':{
      if(e.target.classList[0]=="spend_close_btn"){
        const SPEND_BUTTON=document.getElementsByClassName('edit_spend')[0];
        SPEND_OPTIONS.style.display='none';
        SPEND_BUTTON.classList.remove('edit_selected')
        SPEND_BUTTON.style.color='white'
        SPEND_BUTTON.style.border='none'
      }
      // hide component;
      break;
    }
    default :{}
  }
});

const changeHorozontal=(spendInput)=>{
  const SPEND_LINE=document.getElementsByClassName('chartJS_spendline')[0];
  const SPEND_BOX=document.getElementsByClassName('chartJS_spendtext')[0];
  switch(spendInput){
    case '170':{
      SPEND_LINE.style.top='60%';
      SPEND_BOX.style.top='60%';
      break;
    }
    case '210':{
      SPEND_LINE.style.top='50%';
      SPEND_BOX.style.top='50%';
      break;
    }
    case '240':{
      SPEND_LINE.style.top='45%';
      SPEND_BOX.style.top='45%';
      break;
    }
    case '265':{
      SPEND_LINE.style.top='40%';
      SPEND_BOX.style.top='40%';
      break;
    }
    case '360':{
      SPEND_LINE.style.top='30%';
      SPEND_BOX.style.top='30%';
      break;
    }
    default:{}
  }
}
const OVERLAY_OUT=document.getElementsByClassName('chartJS_overlay_container')[0];
const OVERLAY_BTN=document.getElementsByClassName('control_overlay_btn_container')[0];
OVERLAY_BTN.addEventListener('click',()=>{
  
  if(OVERLAY_OUT.classList.length===1){
    OVERLAY_OUT.classList.add('overlay_active'); 
    return; 
  }
  OVERLAY_OUT.classList.remove('overlay_active');
});

/*SLIDER EVENT LISTENER */
document.getElementById('range_slider').addEventListener('change',(e)=>{
  const AGE_TEXT=document.getElementsByClassName('age_input')[0];
  AGE_TEXT.innerHTML=e.target.value;
});

/*CLOSE BTN EVENT */
document.getElementsByClassName('overlay_close_btn')[0].addEventListener('click',()=>{
  OVERLAY_OUT.classList.remove('overlay_active');
});