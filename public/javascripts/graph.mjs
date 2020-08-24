import {CUSTOMERS} from './pensionData.mjs'
// import { ICON_BUILD } from './iconBuilder.mjs';

// ICON_BUILD();

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
let temp_dataset;

for(let i=0;i<CUSTOMERS[0].pensions.length;i++){
    for(let j=0;j<numDataPoints;j++){
        dataset[j]+=CUSTOMERS[0].pensions[i].receipts[j];
    }
}

temp_dataset=dataset;

var data = {
  labels: Array.apply(null, Array(numDataPoints)).map(function() {
    return '';
  }),
  datasets: [{
    data: temp_dataset,
    pointRadius: 0,
    borderWidth: 10,
    borderColor: '#50953a',
    backgroundColor: 'transparent',
  }]
};

let CHARTJS=new Chart(ctx, {
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
      changeHorozontal(e.target.dataset.spend,e.target.innerHTML);
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

const changeHorozontal=(spendInput,spendtext)=>{
  const SPEND_LINE=document.getElementsByClassName('chartJS_spendline')[0];
  const SPEND_BOX=document.getElementsByClassName('chartJS_spendtext')[0];
  SPEND_LINE.style.top=`${92-1.84*spendInput*12/100}%`
  SPEND_BOX.style.top=`${92-1.84*spendInput*12/100}%`
  SPEND_BOX.innerHTML=spendtext
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
const SLIDER=document.getElementById('range_slider');
SLIDER.addEventListener('change',(e)=>{
  const AGE_TEXT=document.getElementsByClassName('age_input')[0];
  AGE_TEXT.innerHTML=e.target.value;
  /* update graph */
  temp_dataset=dataset.slice(0,e.target.value-54)
  CHARTJS.data.labels=Array.apply(null, Array(e.target.value-54)).map(function() {
    return '';
  });
  CHARTJS.data.datasets.data=temp_dataset;
  CHARTJS.update();
  /**x axis width update */
  const X_AXIS=document.getElementsByClassName('chartJS_agecontainer')[0]
  X_AXIS.style.width=`${36/(e.target.value-54)*90}%`
});

SLIDER.addEventListener('input',(e)=>{
  const AGE_TEXT=document.getElementsByClassName('age_input')[0];
  AGE_TEXT.innerHTML=e.target.value;
})

/*CLOSE BTN EVENT */
document.getElementsByClassName('overlay_close_btn')[0].addEventListener('click',()=>{
  OVERLAY_OUT.classList.remove('overlay_active');
});

/* home pension Interaction  */
const HOME_PENSION=document.getElementsByClassName('home_pension_wrapper')[0];
const homePensionHandler=(e)=>{
  HOME_PENSION.classList.add('pension_used')
  HOME_PENSION.removeEventListener('click',homePensionHandler)
  ctx.style.transform='translateY(-20%)'
}
HOME_PENSION.addEventListener('click',homePensionHandler)

