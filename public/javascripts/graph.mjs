import {CUSTOMERS} from './pensionData.mjs'
import {monthlyReqChart} from './pie.mjs'
import {COLORS} from './chartColor.mjs'

/*PIE SCRIPT START */
monthlyReqChart(55, 90, 2700000, 200000000, 429051000, 130485000, 199140000);

/**INIT CHART */
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


/**BUILD CHART */
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


/**SET SPEND OPTIONS */
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


/** STOCK INTERACTION */
const STOCK_EL=document.createElement('div');
const STOCK_AGE=document.createElement('div');
const STOCK_POPUP=document.getElementsByClassName('stockdisplay_container')[0];
const STPOP_AGE=STOCK_POPUP.getElementsByClassName('stockdisplay_agecontrol')[0];
const STPOP_INCOME=STOCK_POPUP.getElementsByClassName('stockdisplay_month_income')[0];
const CHART_HEAD=document.getElementsByClassName('chartJS_text')[0];
const ST_PRODUCT=STOCK_POPUP.getElementsByClassName('STpension_container')[0];
STOCK_EL.classList.add('chartJS_stockline');
STOCK_AGE.classList.add('chartJS_stockage');

const getPensionIncome=()=>{return (document.getElementsByClassName('pension_used').length)?46:0;}


const buildPensionInfo=(age)=>{
  const pensionInfo=CUSTOMERS[0].pensions.reduce((acc,v,idx)=>{
    if(!v.receipts[age-55])return acc;
    const CONCATTED=`
      <ul class="STpension_wrap">
          <li class="STpension_label" style="background-color:${COLORS[idx]}"></li>
          <li class="STpension_type">${v.product_name}</li>
          <li class="STpension_amt">${Math.floor(v.receipts[age-55]/120)}만원</li>
      </ul>
    `;
    return [acc[0]+CONCATTED,acc[1]+1];
  },['',0]);
  if(getPensionIncome())pensionInfo[0]=pensionInfo[0].concat(`
    <ul class="STpension_wrap">
      <li class="STpension_label" style="background-color:${COLORS[CUSTOMERS[0].pensions.length]}"></li>
      <li class="STpension_type">주택연금</li>
      <li class="STpension_amt">46만원</li>
    </ul>
  `)
  ST_PRODUCT.innerHTML=pensionInfo[0]; 
}

const handleStockTouchStart=(e)=>{
  /* VALIDATE GRAPH SECTION */
  if(e.touches[0].clientX<e.currentTarget.offsetWidth*0.1+e.currentTarget.offsetLeft)return;
  const graphRatio=(e.touches[0].clientX-e.currentTarget.offsetLeft-(e.currentTarget.offsetWidth*0.12))/(e.currentTarget.offsetWidth*0.88);
  const currentAge=Math.round(55+graphRatio*(numDataPoints));
  STOCK_EL.style.left=`${e.touches[0].clientX}px`
  STOCK_AGE.style.left=`${e.touches[0].clientX}px`
  STOCK_AGE.innerHTML=`${currentAge}`;
  GRAPH_AREA.appendChild(STOCK_EL)
  GRAPH_AREA.appendChild(STOCK_AGE);
  STPOP_AGE.innerHTML=currentAge;
  STPOP_INCOME.innerHTML=`${Math.floor(temp_dataset[currentAge-55]/120)+getPensionIncome()}만원`;
  CHART_HEAD.style.visibility="hidden";
  STOCK_POPUP.style.visibility="visible";
  buildPensionInfo(currentAge);
}

const handleStockTouchMove=(e)=>{
    if(e.touches[0].clientX<e.currentTarget.offsetWidth*0.1+e.currentTarget.offsetLeft)return;
    const graphRatio=(e.touches[0].clientX-e.currentTarget.offsetLeft-(e.currentTarget.offsetWidth*0.12))/(e.currentTarget.offsetWidth*0.88);
    const currentAge=Math.round(55+graphRatio*(numDataPoints));
    if(currentAge<55||currentAge>90)return;
    STOCK_EL.style.left=`${e.touches[0].clientX}px`
    STOCK_AGE.style.left=`${e.touches[0].clientX}px`
    STOCK_AGE.innerHTML=`${currentAge}`;
    STPOP_AGE.innerHTML=currentAge;
    STPOP_INCOME.innerHTML=`${Math.floor(temp_dataset[currentAge-55]/120)+getPensionIncome()}만원`;
    buildPensionInfo(currentAge);
}

const handleStockTouchEnd=(e)=>{
  GRAPH_AREA.removeChild(STOCK_EL);
  GRAPH_AREA.removeChild(STOCK_AGE);
  CHART_HEAD.style.visibility="visible";
  STOCK_POPUP.style.visibility="hidden";
}

/* STOCK INTERACTION */
const GRAPH_AREA=document.getElementsByClassName('chartJS_wrapper')[0];
GRAPH_AREA.addEventListener('touchstart', handleStockTouchStart);
GRAPH_AREA.addEventListener('touchmove', handleStockTouchMove);
GRAPH_AREA.addEventListener('touchend', handleStockTouchEnd);


const changeHorozontal=(spendInput,spendtext)=>{
  const SPEND_LINE=document.getElementsByClassName('chartJS_spendline')[0];
  const SPEND_BOX=document.getElementsByClassName('chartJS_spendtext')[0];
  SPEND_LINE.style.top=`${92-1.84*spendInput*12/100}%`
  SPEND_BOX.style.top=`${92-1.84*spendInput*12/100}%`
  SPEND_BOX.innerHTML=spendtext;
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
  /*x axis width update */
  const X_AXIS=document.getElementsByClassName('chartJS_agecontainer')[0]
  X_AXIS.style.width=`${36/(e.target.value-54)*90}%`
  console.log(changeGaugeText());
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
const POPUP=document.getElementsByClassName('hpension_popup_container')[0];
POPUP.getElementsByClassName('hclose_wrapper')[0].addEventListener('click',()=>{
  POPUP.style.display='none'
})
POPUP.getElementsByClassName('estate_btn')[0].addEventListener('click',()=>{
  POPUP.style.display='none'
  HOME_PENSION.classList.add('pension_used')
  HOME_PENSION.removeEventListener('click',homePensionHandler)
  ctx.style.transform='translateY(-20%)' 
})
const homePensionHandler=(e)=>{
  POPUP.style.display='flex';
}
HOME_PENSION.addEventListener('click',homePensionHandler)