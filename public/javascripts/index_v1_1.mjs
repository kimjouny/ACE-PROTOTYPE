import {initCarousel} from './carousel.mjs'
import {graphToggle} from './graphToggle.mjs'
import {CUSTOMERS} from './pensionData.mjs'
import {COLORS} from './chartColor.mjs'
/* PIE INTEGRATION  */
import {totalAsset_pieChart} from './pie.mjs'
import {monthlyPention_chart} from './pie.mjs'

/* PIE PART */
window.onload=()=>{
  totalAsset_pieChart(55, 90, 2700000, 200000000, 429051000, 130485000, 199140000);
  monthlyPention_chart(55, 90, 27000000, 200000000, 429051000, 130485000, 199140000,112312312);
}

/*CAROUSEL LAYOUT INTERACTION */
const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');
initCarousel(CAROUSEL_WRAP,CAROUSEL_BTNS);


/* TOGGLE INTERACTION */
const TOGGLE_ELES=document.getElementsByClassName('graph_element');
const GRAPH_TOGGLES=document.getElementsByClassName('graph_toggle_container')[0];
GRAPH_TOGGLES.addEventListener('click',e=>graphToggle(e,TOGGLE_ELES));

/**INIT CHART */
const buildChart=(context, inputData)=>{
  return new Chart(context,{
    type: 'line',
    data: inputData,
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
}


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
let CHARTJS=buildChart(ctx,data);

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

let segdata=temp_dataset.slice(0,11).reduce((acc,v)=>{
  acc.push(Math.round(v/12));
  return acc;
},[]);
const SEG1=document.getElementById('segment_graph1');
let data1 = {
  labels: Array.apply(null, Array(segdata.length)).map(function() {
    return '';
  }),
  datasets: [{
    data: segdata,
    pointRadius: 0,
    borderWidth: 10,
    borderColor: '#50953a',
    backgroundColor: 'transparent',
  }]
};
/**SEGMENT CHART */
let SEGCHART=buildChart(SEG1,data1);