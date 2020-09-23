import { reduceData, buildChart, buildPensionSet, buildpensionData, ageArr, changeAgeRange } from './pensionChart.mjs'
import { DEEPCOPY } from './util.mjs'
import { KB_SPENDINDEX, CUSTOMERS, PERSONA, OPTIMIZED_PERSONA } from './pensionData.mjs'

/**INIT CHART */
Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.global.defaultFontSize = 30;

Chart.defaults.global.defaultFontFamily = 'KB';

const ctx = document.getElementById("myChart");
let numDataPoints = 36;
let originData = [
  buildPensionSet(reduceData(PERSONA[0]), '#007acc', 'rgba(78,171,243,0.5)', 7, true),
  buildPensionSet(KB_SPENDINDEX, '#F6E04B', 'transparent', 0, true)
];


let pData = buildpensionData(ageArr(55, 90), DEEPCOPY(originData));



/**BUILD CHART */
let CHARTJS = buildChart(ctx, pData);

const updateGraphByRange = (val) => {
    const displayOption = OPTIONS[1].getElementsByClassName('option_content');
    for (let i = 0; i < displayOption.length; i++) {
      displayOption[i].style.backgroundColor = displayOption[i].dataset.bg;
      displayOption[i].style.color = "white";
    }
    switch (val) {
      case 0: {
        CHARTJS.options.scales.xAxes[0].ticks.maxTicksLimit = 8;
        changeAgeRange(CHARTJS, originData, 55, 90)
        break;
      }
      case 1: {
        CHARTJS.options.scales.xAxes[0].ticks.maxTicksLimit = 6;
        changeAgeRange(CHARTJS, originData, 55, 65);
        break;
      }
      case 2: {
        CHARTJS.options.scales.xAxes[0].ticks.maxTicksLimit = 6;
        changeAgeRange(CHARTJS, originData, 65, 75);
        break;
      }
      case 3: {
        CHARTJS.options.scales.xAxes[0].ticks.maxTicksLimit = 6;
        changeAgeRange(CHARTJS, originData, 75, 90);
        break;
      }
      default: { }
    }
  }
  
  const optimizeHandler = () => {
    originData = [
      buildPensionSet(reduceData(OPTIMIZED_PERSONA[0]), '#007acc', 'rgba(78,171,243,0.5)', 10, true),
      buildPensionSet(reduceData(PERSONA[0]), 'rgb(200,200,200,0.3)', 'transparent', 0, true),
      buildPensionSet(KB_SPENDINDEX, '#F6E04B', 'transparent', 0, true),
    ]
    const currentRange = document.getElementsByClassName('option_focused')[0].value;
    updateGraphByRange(currentRange);
    OPTIONS[1].innerHTML = `
      <li class="option_content" data-bg="#007ACC" value="0" style="color:white;background-color: #007ACC;">(최적화)예상수령액</li>
      <li class="option_content" data-bg="silver" value="1" style="color:white;background-color: silver;">(기존)예상수령액</li>  
      <li class="option_content" data-bg="#F6E04B" value="2" style="color:white;background-color: #F6E04B;">KB소비지수</li>
    `
  }
  
  const OPTIMIZE_BTN = document.getElementsByClassName("optimize_container")[0];
  OPTIMIZE_BTN.addEventListener("click", optimizeHandler);
  /**SEGMENT OPTION */
  const OPTIONS = document.getElementsByClassName("option_contents");
  
  
  OPTIONS[0].addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    const prevFocused = document.getElementsByClassName('option_focused')[0];
    if (e.target === prevFocused) return;
    prevFocused.classList.remove('option_focused');
    e.target.classList.add('option_focused');
    updateGraphByRange(e.target.value);
  })
  
  OPTIONS[1].addEventListener('click',(e)=>{
    if(e.target.tagName!=='LI')return;
    if(e.target.style.backgroundColor == "white"){
      e.target.classList.add('option_undisplay')
      e.target.style.backgroundColor=e.target.dataset.bg;
      e.target.style.color="white";
      if(!e.target.value)CHARTJS.data.datasets[e.target.value].pointRadius=7;
      CHARTJS.data.datasets[e.target.value].showLine=true;
    }
    else{
      e.target.classList.remove('option_undisplay')
      e.target.style.backgroundColor="white";
      e.target.style.color="black";
      if(!e.target.value)CHARTJS.data.datasets[e.target.value].pointRadius=0;
      CHARTJS.data.datasets[e.target.value].showLine=false;
  
    }
    CHARTJS.update();
  })