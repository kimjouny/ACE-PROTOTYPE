import {initCarousel} from './carousel.mjs'
// import {graphToggle} from './graphToggle.mjs'
import {CUSTOMERS,PERSONA,OPTIMIZED_PERSONA} from './pensionData.mjs'
import {COLORS} from './chartColor.mjs'
import {counterAnimation} from './counterAnimation.mjs'

/* PIE INTEGRATION  */
import {totalAsset_pieChart} from './pie.mjs'
import {monthlyPention_chart} from './pie.mjs'

/* PIE PART */
window.onload=()=>{
  totalAsset_pieChart(55, 90, 2650000, 239143000, 429051000, 289444000, 55788000);  //jy 파라미터 변경
  monthlyPention_chart(55, 90, 27000000, 200000000, 429051000, 130485000, 199140000,112312312);
}

/* PACHINCO INTERACTION */
counterAnimation('.pc_amount');
counterAnimation('.pc_ratio');


/*CAROUSEL LAYOUT INTERACTION */
const CAROUSEL_BTNS=document.getElementsByClassName('carousel_btn_wrapper');
const CAROUSEL_WRAP=document.getElementsByClassName('carousel_wrapper');
initCarousel(CAROUSEL_WRAP,CAROUSEL_BTNS);

/**INIT CHART */
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 30;
Chart.defaults.global.defaultFontFamily = 'KB';

const reduceData=(originData)=>{
  return originData.assets.reduce((asset_acc,asset)=>{
    asset.product_lists.reduce((product_acc,product)=>{
        product.receipts.reduce((receipt_acc,receipt,idx)=>{
          receipt_acc[idx]+=receipt;
          return receipt_acc;
        },product_acc);
        return product_acc;
    },asset_acc);
    return asset_acc;
  },[
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ]).reduce((acc,v)=>{
    acc.push(v/1000);
    return acc;
  },[]);
}

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
      pointDot: true,
      scales: {
        xAxes: [{
          display: true,
          ticks:{
            autoSkip:true,
            autoSkipPadding:60,
            maxRotation:0,
            labelOffset:5,
          }
        }],
        yAxes: [{
          display: true,
          ticks:{
            suggestedMin:15,
            suggestedMax:45,
            stepSize:5
          }
        }],
      }
    }
  });
}

const ageArr=(startAge, endAge)=>{
  let ages=[];
  while(startAge<=endAge)ages.push(startAge++);
  return ages;
}

const buildpensionData=(dataLength,xArray,dataArray,colorInput,pointColor,pointRad)=>{
  return {
    labels: xArray,
    datasets: [{
      data: dataArray,
      pointRadius: pointRad,
      pointBackgroundColor:pointColor,
      pointBorderColor:pointColor,
      borderWidth: 10,
      borderColor: colorInput,
      backgroundColor: 'transparent',
    }]
  }
}

const ctx = document.getElementById("myChart");
let numDataPoints = 36;
const dataset=reduceData(PERSONA[0]);
let temp_dataset=dataset
let data = buildpensionData(numDataPoints,ageArr(55,90),temp_dataset,'#007acc','rgba(78,171,243,0.5)',7)


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
          <li class="STpension_type">${v.category}</li>
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
  if(e.touches[0].pageY-e.currentTarget.getBoundingClientRect().y<CANVAS_CONTAINER.offsetTop)return;
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
    if(e.touches[0].pageY-e.currentTarget.getBoundingClientRect().y<CANVAS_CONTAINER.offsetTop)return;
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
const CANVAS_CONTAINER=document.getElementsByClassName('canvas_container')[0];
const GRAPH_AREA=document.getElementsByClassName('chartJS_wrapper')[0];
// GRAPH_AREA.addEventListener('touchstart', handleStockTouchStart);
// GRAPH_AREA.addEventListener('touchmove', handleStockTouchMove);
// GRAPH_AREA.addEventListener('touchend', handleStockTouchEnd);

const optimizeHandler=()=>{
  data.datasets=[
    {
      data: reduceData(OPTIMIZED_PERSONA[0]),
      pointRadius: 7,
      pointBackgroundColor:'rgba(78,171,243,0.5)',
      pointBorderColor:'rgba(78,171,243,0.5)',
      borderWidth: 10,
      borderColor: '#007acc',
      backgroundColor: 'transparent',
    },
    {
      data: reduceData(PERSONA[0]),
      pointRadius: 0,
      pointBackgroundColor:'transparent',
      pointBorderColor:'transparent',
      borderWidth: 10,
      borderColor: 'rgb(200,200,200,0.6)',
      backgroundColor: 'transparent',
    },
  ]
  CHARTJS.update();
}

const OPTIMIZE_BTN=document.getElementsByClassName('optimize_container')[0];
OPTIMIZE_BTN.addEventListener('click',optimizeHandler);

/** HOSUNG MIGRATION */
var national_pension_down_content = document.getElementById(
  "national_pension_down_content"
);
var national_pension_down_button = document.getElementById(
  "national_pension_down_button"
);
national_pension_down_button.addEventListener(
  "click",
  national_pension_content
);
function national_pension_content() {
  if (national_pension_down_content.style.display == "none") {
    national_pension_down_content.style.display = "block";
    national_pension_down_button.childNodes[1].className = national_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-down",
      "fa-chevron-up"
    );
  } else {
    national_pension_down_content.style.display = "none";
    national_pension_down_button.childNodes[1].className = national_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-up",
      "fa-chevron-down"
    );
  }
}

//퇴직연금 button으로 위아래
var retire_pension_down_content = document.getElementById(
  "retire_pension_down_content"
);
var retire_pension_down_button = document.getElementById(
  "retire_pension_down_button"
);

retire_pension_down_button.addEventListener(
  "click",
  retire_pension_down_button1
);

function retire_pension_down_button1() {
  if (retire_pension_down_content.style.display == "none") {
    retire_pension_down_content.style.display = "block";

    retire_pension_down_button.childNodes[1].className = retire_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-down",
      "fa-chevron-up"
    );
    retire_pension_down_content.style.display = "block";
  } else {
    retire_pension_down_content.style.display = "none";
    retire_pension_down_button.childNodes[1].className = retire_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-up",
      "fa-chevron-down"
    );
  }
}

//개인연금 button으로 위아래
var personal_pension_down_button = document.getElementById(
  "personal_pension_down_button"
);
var personal_pension_down_content = document.getElementById(
  "personal_pension_down_content"
);

personal_pension_down_button.addEventListener(
  "click",
  personal_pension_down_button1
);

function personal_pension_down_button1() {
  if (personal_pension_down_content.style.display == "none") {
    personal_pension_down_content.style.display = "block";
    personal_pension_down_button.childNodes[1].className = personal_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-down",
      "fa-chevron-up"
    );
  } else {
    personal_pension_down_content.style.display = "none";
    personal_pension_down_button.childNodes[1].className = personal_pension_down_button.childNodes[1].className.replace(
      "fa-chevron-up",
      "fa-chevron-down"
    );
  }
}

//금융자산 button으로 위아래
var financial_pension_down_button = document.getElementById(
  "financial_pension_down_button"
);
var financial_pension_down_content = document.getElementById(
  "financial_pension_down_content"
);

financial_pension_down_button.addEventListener(
  "click",
  financial_pension_down_button1
);

function financial_pension_down_button1() {
  if (financial_pension_down_content.style.display == "none") {
    financial_pension_down_content.style.display = "block";
  } else {
    financial_pension_down_content.style.display = "none";
  }
}

const pension_array = [
  {
    type: "국민연금",
    list: [{ name: "국민연금", amount: "48477420", used: true }],
  },
  {
    type: "퇴직연금",
    list: [
      {
        name: "AB미국그로스(주식-재간접)",
        amount: "44415792",
        used: true,
      },
      // {
      //   name: "AB베트남(주식-재간접",
      //   amount: "12345678",
      //   used: true,
      // },
    ],
    sums: function () {
      var sum = 0;
      for (var i = 0; i < this.list.length; ++i) {
        if (this.list[i].used == true) {
          sum += Number(this.list[i].amount);
        }
      }
      return sum;
    },
  },
  {
    type: "개인연금",
    list: [
      { name: "KB실버웰빙 연금신탁(채권형)", amount: "28497190", used: true },
      // { name: "CHN중국펀드", amount: "523272", used: true },
    ],
  },
  {
    type: "금융자산",
    list: [
      {
        name: "마이다스 미소 중소형주 투자신탁",
        amount: "200000000",
        used: true,
      },
    ],
  },
  {
    type: "기타자산",
    list: [
      { name: "금", amount: "888888", used: true },
      { name: "은", amount: "343333", used: true },
    ],
  },
];

//pension_array값을 납부총액, 평가금액 등 detail에 넣기
var pension_array_0_0 = document.getElementById("pension_array_0_0");
pension_array_0_0.innerHTML =
  "납부총액 : " + numberWithCommas(pension_array[0].list[0].amount) + "원";

var pension_array_1_0 = document.getElementById("pension_array_1_0");
pension_array_1_0.innerHTML =
  "평가금액 : " + numberWithCommas(pension_array[1].list[0].amount) + "원";

//khs
// var pension_array_1_1 = document.getElementById("pension_array_1_1");
// pension_array_1_1.innerHTML =
//   "평가금액 : " + numberWithCommas(pension_array[1].list[1].amount) + "원";

var pension_array_2_0 = document.getElementById("pension_array_2_0");
pension_array_2_0.innerHTML =
  "평가금액 : " + numberWithCommas(pension_array[2].list[0].amount) + "원";

var pension_array_3_0 = document.getElementById("pension_array_3_0");
pension_array_3_0.innerHTML =
  "평가금액 : " + numberWithCommas(pension_array[3].list[0].amount) + "원";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var toggle_array = document.getElementsByClassName(
  "national_pension_down_toggle_whole"
);

calculator();
function calculator() {
  // console.log(pension_array[1].list.length);

  //국민연금 총액 national_pension_total_sum
  var national_pension_total_sum = 0;
  if (pension_array[0].list[0].used == true) {
    national_pension_total_sum = pension_array[0].list[0].amount;
  }
  var national_pension_calculate2 = document.getElementById(
    "national_pension_calculate2"
  );
  national_pension_calculate2.innerHTML =
    numberWithCommas(national_pension_total_sum) + "원";

  //퇴직연금 총액 retire_pension_total_sum
  var retire_pension_total_sum = 0;
  for (var i = 0; i < pension_array[1].list.length; ++i) {
    if (pension_array[1].list[i].used == true) {
      retire_pension_total_sum += Number(pension_array[1].list[i].amount);
    }
  }
  var national_pension_calculate1 = document.getElementById(
    "national_pension_calculate1"
  );
  national_pension_calculate1.innerHTML =
    numberWithCommas(retire_pension_total_sum) + "원";

  //연금성 총액 다 더한값 pension_total_sum
  var pension_total_sum = 0;
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < pension_array[i].list.length; ++j) {
      if (pension_array[i].list[j].used == true) {
        pension_total_sum += Number(pension_array[i].list[j].amount);
      }
    }
  }
  // khs 이 계산 함수 전체
  console.log("연금총액 총 값 :", pension_total_sum);
  var national_pension_calculate3 = document.getElementById(
    "national_pension_calculate3"
  );
  national_pension_calculate3.innerHTML = "원";
  national_pension_calculate3.innerHTML =
    numberWithCommas(Math.floor(pension_total_sum)) +
    national_pension_calculate3.innerHTML;

  //개인연금 personal_total_sum
  var personal_total_sum = 0;
  for (var i = 0; i < pension_array[2].list.length; ++i) {
    if (pension_array[2].list[i].used == true) {
      personal_total_sum += Number(pension_array[2].list[i].amount);
    }
  }
  console.log("개인연금 총 값 :", personal_total_sum);
  var personal_pension_calculate = document.getElementById(
    "personal_pension_calculate"
  );
  personal_pension_calculate.innerHTML =
    numberWithCommas(personal_total_sum) + "원";

  //금융자산(위)  financial_total_sum
  var financial_total_sum = 0;
  for (var i = 0; i < pension_array[3].list.length; ++i) {
    if (pension_array[3].list[i].used == true) {
      financial_total_sum += Number(pension_array[3].list[i].amount);
    }
  }
  console.log("금융자산 총 값 :", financial_total_sum);
  var national_pension_calculate4 = document.getElementById(
    "national_pension_calculate4"
  );
  var hs_asset_list_financial_pension_money_1 = document.getElementById(
    "hs_asset_list_financial_pension_money_1"
  );

  national_pension_calculate4.innerHTML = "원";
  national_pension_calculate4.innerHTML =
    numberWithCommas(financial_total_sum) +
    national_pension_calculate4.innerHTML;
  hs_asset_list_financial_pension_money_1.innerHTML = "원";
  hs_asset_list_financial_pension_money_1.innerHTML =
    numberWithCommas(financial_total_sum) +
    hs_asset_list_financial_pension_money_1.innerHTML;

  //은퇴준비 자산총액 = 연금성 자산+ 금융자산   total_sum
  var total_sum = Math.floor(
    Number(pension_total_sum) + Number(financial_total_sum)
  );
  var national_pension_calculate5 = document.getElementById(
    "national_pension_calculate5"
  );
  national_pension_calculate5.innerHTML = "원";
  national_pension_calculate5.innerHTML =
    numberWithCommas(total_sum) + national_pension_calculate5.innerHTML;
}

function ho(event) {
  console.log(event.currentTarget.id);

  //national_pension_down_toggle_whole_id_1
  switch (event.currentTarget.id) {
    case "national_pension_down_toggle_whole_id_1":
      //id로,
      var a = document.getElementById(
        "national_pension_down_toggle_circle_id_1"
      );
      var b = document.getElementById(
        "national_pension_down_toggle_whole_id_1"
      );

      var left = a.style.left;
      if (left == "" || left == "40px") {
        b.style.background = "#CCCCCC";
        a.style.left = "0px";
        console.log("1번 토글 off");
        pension_array[0].list[0].used = false;

        calculator();
      } else if (left == "0px") {
        b.style.background = "#53FF4C";
        a.style.left = "40px";
        console.log("1번 토글 on");
        pension_array[0].list[0].used = true;
        calculator();
      }
      break;
    //national_pension_down_toggle_whole_id_2
    case "national_pension_down_toggle_whole_id_2":
      var a = document.getElementById(
        "national_pension_down_toggle_circle_id_2"
      );
      var b = document.getElementById(
        "national_pension_down_toggle_whole_id_2"
      );

      var left = a.style.left;
      if (left == "" || left == "40px") {
        b.style.background = "#CCCCCC";
        a.style.left = "0px";
        console.log("2번 토글 off");
        pension_array[1].list[0].used = false;
        calculator();
      } else if (left == "0px") {
        b.style.background = "#53FF4C";
        a.style.left = "40px";
        console.log("2번 토글 on");
        pension_array[1].list[0].used = true;
        calculator();
      }
      break;
    // case "national_pension_down_toggle_circle_id_3":
    //   var a = document.getElementById(
    //     "national_pension_down_toggle_circle_id_3"
    //   );
    //   var b = document.getElementById(
    //     "national_pension_down_toggle_whole_id_3"
    //   );

    //   var left = a.style.left;
    //   if (left == "" || left == "40px") {
    //     console.log("3번 토글 off");
    //     b.style.background = "#CCCCCC";
    //     a.style.left = "0px";
    //     pension_array[1].list[1].used = false;
    //     calculator();
    //   } else if (left == "0px") {
    //     b.style.background = "#53FF4C";
    //     a.style.left = "40px";
    //     console.log("3번 토글 on");
    //     pension_array[1].list[1].used = true;
    //     calculator();
    //   }
    //   break;
    //national_pension_down_toggle_whole_id_4
    case "national_pension_down_toggle_whole_id_4":
      //id로,
      var a = document.getElementById(
        "national_pension_down_toggle_circle_id_4"
      );
      var b = document.getElementById(
        "national_pension_down_toggle_whole_id_4"
      );

      var left = a.style.left;
      if (left == "" || left == "40px") {
        b.style.background = "#CCCCCC";
        a.style.left = "0px";
        console.log("4번 토글 off");
        pension_array[2].list[0].used = false;
        calculator();
      } else if (left == "0px") {
        b.style.background = "#53FF4C";
        a.style.left = "40px";
        console.log("4번 토글 on");
        pension_array[2].list[0].used = true;
        calculator();
      }
      break;
    //national_pension_down_toggle_whole_id_5
    case "national_pension_down_toggle_whole_id_5":
      //id로,
      var a = document.getElementById(
        "national_pension_down_toggle_circle_id_5"
      );
      var b = document.getElementById(
        "national_pension_down_toggle_whole_id_5"
      );

      var left = a.style.left;
      if (left == "" || left == "40px") {
        b.style.background = "#CCCCCC";
        a.style.left = "0px";
        console.log("5번 토글 off");
        pension_array[3].list[0].used = false;
        calculator();
      } else if (left == "0px") {
        b.style.background = "#53FF4C";
        a.style.left = "40px";
        console.log("5번 토글 on");
        pension_array[3].list[0].used = true;
        calculator();
      }
      break;
  }
}

toggle_array[0].addEventListener("click", ho);
toggle_array[1].addEventListener("click", ho);
toggle_array[2].addEventListener("click", ho);
toggle_array[3].addEventListener("click", ho);
// toggle_array[4].addEventListener("click", ho);

//range 버튼
var national_pension_range = document.getElementById("national_pension_range");
national_pension_range.addEventListener("click", range_start_0_0);
var retire_pension_range_1_0 = document.getElementById(
  "retire_pension_range_1_0"
);
retire_pension_range_1_0.addEventListener("click", range_start_1_0);
// var retire_pension_range_1_1 = document.getElementById(
//   "retire_pension_range_1_1"
// );
// retire_pension_range_1_1.addEventListener("click", range_start_1_1);
var retire_pension_range_2_0 = document.getElementById(
  "retire_pension_range_2_0"
);
retire_pension_range_2_0.addEventListener("click", range_start_2_0);

//modal contents display on/off
var modal_pension_array_0_0 = document.getElementById(
  "modal_pension_array_0_0"
);
var modal_pension_array_0_0_close = document.getElementById(
  "modal_pension_array_0_0_close"
);
modal_pension_array_0_0.style.display = "none";
//range 1_0
var modal_pension_array_1_0 = document.getElementById(
  "modal_pension_array_1_0"
);
var modal_pension_array_1_0_close = document.getElementById(
  "modal_pension_array_1_0_close"
);
modal_pension_array_1_0.style.display = "none";
//range 1_1
//khs
// var modal_pension_array_1_1 = document.getElementById(
//   "modal_pension_array_1_1"
// );
// modal_pension_array_1_1.style.display = "none";
// var modal_pension_array_1_1_close = document.getElementById(
//   "modal_pension_array_1_1_close"
// );
//range 2_0
var modal_pension_array_2_0 = document.getElementById(
  "modal_pension_array_2_0"
);
modal_pension_array_2_0.style.display = "none";
var modal_pension_array_2_0_close = document.getElementById(
  "modal_pension_array_2_0_close"
);

function range_close() {
  console.log("rance close");
  modal_pension_array_0_0.style.display = "none";
  modal_pension_array_1_0.style.display = "none";
  //khs
  //modal_pension_array_1_1.style.display = "none";
  modal_pension_array_2_0.style.display = "none";
}
function range_start_0_0() {
  console.log("range");
  modal_pension_array_0_0.style.display = "block";
}
function range_start_1_0() {
  console.log("range");
  modal_pension_array_1_0.style.display = "block";
}
//khs
// function range_start_1_1() {
//   console.log("range");
//   modal_pension_array_1_1.style.display = "block";
// }
function range_start_2_0() {
  console.log("range");
  modal_pension_array_2_0.style.display = "block";
}
// modal 시작
var pension_array_0_0_slider = document.getElementById(
  "pension_array_0_0_slider"
);
var slider_range = document.getElementById("slider_range_0_0");
slider_range.innerHTML = "60";
// pension_array_0_0_slider.addEventListener("input", function () {
//   slider_range.innerHTML = pension_array_0_0_slider.value;
// });
modal_pension_array_0_0_close.addEventListener("click", range_close);

// modal 1_0
var pension_array_1_0_slider = document.getElementById(
  "pension_array_1_0_slider"
);
var slider_range_1_0 = document.getElementById("slider_range_1_0");
slider_range_1_0.innerHTML = "60";
// pension_array_1_0_slider.addEventListener("input", function () {
//   slider_range_1_0.innerHTML = pension_array_1_0_slider.value;
// });

var pension_array_1_0_slider_2 = document.getElementById(
  "pension_array_1_0_slider_2"
);
var slider_range_1_0_2 = document.getElementById("slider_range_1_0_2");
slider_range_1_0_2.innerHTML = "60";
// pension_array_1_0_slider_2.addEventListener("input", function () {
//   slider_range_1_0_2.innerHTML = pension_array_1_0_slider_2.value;
// });
modal_pension_array_1_0_close.addEventListener("click", range_close);

//khs
//modal 1_1
// var pension_array_1_1_slider = document.getElementById(
//   "pension_array_1_1_slider"
// );
// var slider_range_1_1 = document.getElementById("slider_range_1_1");
// slider_range_1_1.innerHTML = "60";
// pension_array_1_1_slider.addEventListener("input", function () {
//   slider_range_1_1.innerHTML = pension_array_1_1_slider.value;
// });

// var pension_array_1_1_slider_2 = document.getElementById(
//   "pension_array_1_1_slider_2"
// );
// var slider_range_1_1_2 = document.getElementById("slider_range_1_1_2");
// slider_range_1_1_2.innerHTML = "60";
// // pension_array_1_1_slider_2.addEventListener("input", function () {
// //   slider_range_1_1_2.innerHTML = pension_array_1_1_slider_2.value;
// // });
// modal_pension_array_1_1_close.addEventListener("click", range_close);

//modal 2_0
var pension_array_2_0_slider = document.getElementById(
  "pension_array_2_0_slider"
);
var slider_range_2_0 = document.getElementById("slider_range_2_0");
slider_range_2_0.innerHTML = "58";
// pension_array_2_0_slider.addEventListener("input", function () {
//   slider_range_2_0.innerHTML = slider_range_2_0.value;
// });

var pension_array_2_0_slider_2 = document.getElementById(
  "pension_array_2_0_slider_2"
);
var slider_range_2_0_2 = document.getElementById("slider_range_2_0_2");
slider_range_2_0_2.innerHTML = "60";
// pension_array_2_0_slider_2.addEventListener("input", function () {
//   slider_range_2_0_2.innerHTML = pension_array_2_0_slider_2.value;
// });
modal_pension_array_2_0_close.addEventListener("click", range_close);

//새로운 modal range
//modal 0_0
var slider_0_0 = document.getElementById("slider_0_0");
noUiSlider.create(slider_0_0, {
  // start: [55, 90],
  start: [60],
  connect: [true, false],
  step: 1,
  orientation: "horizontal", // 'horizontal' or 'vertical'
  range: {
    min: [55],
    max: [65],
  },
  // Move handle on tap, bars are draggable
  // behaviour: "tap-drag",
  //tooltips: true,
  // pips: {
  //   mode: "steps",
  //   stepped: true,
  //   density: 2,
  // },
});

//modal 1_0
// window.onload = () => {
var slider_1_0 = document.getElementById("slider_1_0");
noUiSlider.create(slider_1_0, {
  start: [55, 90],
  connect: true,
  step: 1,
  orientation: "horizontal", // 'horizontal' or 'vertical'
  range: {
    min: 55,
    max: 90,
  },
  // pips: {
  //   mode: "steps",
  //   stepped: true,
  //   density: 2,
  // },
});

//khs
//modal 1_1
// var slider_1_1 = document.getElementById("slider_1_1");
// noUiSlider.create(slider_1_1, {
//   start: [55, 90],
//   connect: true,
//   step: 1,
//   orientation: "horizontal", // 'horizontal' or 'vertical'
//   range: {
//     min: 55,
//     max: 90,
//   },
//   // pips: {
//   //   mode: "steps",
//   //   stepped: true,
//   //   density: 2,
//   // },
// });

//modal 2_0
var slider_2_0 = document.getElementById("slider_2_0");
noUiSlider.create(slider_2_0, {
  start: [58, 90],
  connect: true,
  step: 1,
  orientation: "horizontal", // 'horizontal' or 'vertical'
  range: {
    min: 55,
    max: 90,
  },
  // pips: {
  //   mode: "steps",
  //   stepped: true,
  //   density: 2,
  // },
});

var slider_range_0_0 = document.getElementById("slider_range_0_0");
var slider_range_1_0 = document.getElementById("slider_range_1_0");
var slider_range_1_0_2 = document.getElementById("slider_range_1_0_2");
//khs
// var slider_range_1_1 = document.getElementById("slider_range_1_1");
var slider_range_2_0 = document.getElementById("slider_range_2_0");

//초기화 값
slider_range_0_0.innerHTML = "60";
slider_range_1_0.innerHTML = "55";
slider_range_1_0_2.innerHTML = "90";
//khs
// slider_range_1_1.innerHTML = "55";
// slider_range_1_1_2.innerHTML = "90";
slider_range_2_0.innerHTML = "58";
slider_range_2_0_2.innerHTML = "90";

slider_0_0.noUiSlider.on("slide.one", slider_0_0_func);
// slider_0_0.addEventListener("update", slider_0_0_func);
function slider_0_0_func() {
  console.log("0_0");
  slider_range_0_0.innerHTML = Math.floor(slider_0_0.noUiSlider.get());

  var pension_0_0_range_start_text2 = document.getElementById(
    "pension_0_0_range_start_text2"
  );
  pension_0_0_range_start_text2.innerHTML = Math.floor(
    slider_0_0.noUiSlider.get()
  );

  var pension_0_0_range_start_text = document.getElementById(
    "pension_0_0_range_start_text"
  );
  pension_0_0_range_start_text.innerHTML =
    38 + Math.floor(slider_0_0.noUiSlider.get()) - 55;
  var slider_range_0_0_1 = document.getElementById("slider_range_0_0_1");
  slider_range_0_0_1.innerHTML =
    38 + Math.floor(slider_0_0.noUiSlider.get()) - 55;
}

slider_1_0.noUiSlider.on("slide.one", slider_1_0_func);
//slider_1_0.addEventListener("click", slider_1_0_func);
function slider_1_0_func() {
  console.log("1_0");
  slider_range_1_0.innerHTML = Math.floor(slider_1_0.noUiSlider.get()[0]);
  slider_range_1_0_2.innerHTML = Math.floor(slider_1_0.noUiSlider.get()[1]);

  var pension_1_0_range_start_text2 = document.getElementById(
    "pension_1_0_range_start_text2"
  );
  pension_1_0_range_start_text2.innerHTML = Math.floor(
    slider_1_0.noUiSlider.get()[0]
  );
  var pension_1_0_range_start_text = document.getElementById(
    "pension_1_0_range_start_text"
  );
  pension_1_0_range_start_text.innerHTML =
    38 + Math.floor(slider_1_0.noUiSlider.get()[0]) - 55;
  var slider_range_1_0_a = document.getElementById("slider_range_1_0_a");
  slider_range_1_0_a.innerHTML =
    38 + Math.floor(slider_1_0.noUiSlider.get()[0]) - 55;
  var slider_range_1_0_b = document.getElementById("slider_range_1_0_b");
  slider_range_1_0_b.innerHTML =
    38 + Math.floor(slider_1_0.noUiSlider.get()[1]) - 55;
}

//khs
// slider_1_1.noUiSlider.on("slide.one", slider_1_1_func);
// //slider_1_1.addEventListener("click", slider_1_1_func);
// function slider_1_1_func() {
//   console.log("1_1");
//   slider_range_1_1.innerHTML = Math.floor(slider_1_1.noUiSlider.get()[0]);
//   slider_range_1_1_2.innerHTML = Math.floor(slider_1_1.noUiSlider.get()[1]);

//   var pension_1_1_range_start_text2 = document.getElementById(
//     "pension_1_1_range_start_text2"
//   );
//   pension_1_1_range_start_text2.innerHTML = Math.floor(
//     slider_1_1.noUiSlider.get()[0]
//   );
//   var pension_1_1_range_start_text = document.getElementById(
//     "pension_1_1_range_start_text"
//   );
//   pension_1_1_range_start_text.innerHTML =
//     38 + Math.floor(slider_1_1.noUiSlider.get()[0]) - 55;

//   var slider_range_1_1_a = document.getElementById("slider_range_1_1_a");
//   slider_range_1_1_a.innerHTML =
//     38 + Math.floor(slider_1_1.noUiSlider.get()[0]) - 55;
//   var slider_range_1_1_b = document.getElementById("slider_range_1_1_b");
//   slider_range_1_1_b.innerHTML =
//     38 + Math.floor(slider_1_1.noUiSlider.get()[1]) - 55;
// }

slider_2_0.noUiSlider.on("slide.one", slider_2_0_func);
//slider_2_0.addEventListener("click", slider_2_0_func);
function slider_2_0_func() {
  console.log("2_0");
  slider_range_2_0.innerHTML = Math.floor(slider_2_0.noUiSlider.get()[0]);
  slider_range_2_0_2.innerHTML = Math.floor(slider_2_0.noUiSlider.get()[1]);

  var pension_2_0_range_start_text2 = document.getElementById(
    "pension_2_0_range_start_text2"
  );
  pension_2_0_range_start_text2.innerHTML = Math.floor(
    slider_2_0.noUiSlider.get()[0]
  );
  var pension_2_0_range_start_text = document.getElementById(
    "pension_2_0_range_start_text"
  );
  pension_2_0_range_start_text.innerHTML =
    38 + Math.floor(slider_2_0.noUiSlider.get()[0]) - 55;

  var slider_range_2_0_a = document.getElementById("slider_range_2_0_a");
  slider_range_2_0_a.innerHTML =
    38 + Math.floor(slider_2_0.noUiSlider.get()[0]) - 55;

  var slider_range_2_0_b = document.getElementById("slider_range_2_0_b");
  slider_range_2_0_b.innerHTML =
    38 + Math.floor(slider_2_0.noUiSlider.get()[1]) - 55;
}
