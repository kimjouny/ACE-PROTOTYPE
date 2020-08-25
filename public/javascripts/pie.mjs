const monthlyReqChart=(retireAge, deadAge, reqAsset, finAsset, pubPention, perPention, retirePention)=>{
  var ageRange=deadAge-retireAge+1; //연령범위
  var reqAsset=reqAsset;  //월 필요금액
  var monthlyFinAsset=Math.round(finAsset/ageRange/12); //월별로 받을 금액들
  var monthlyPubPention=Math.round(pubPention/ageRange/12);
  var monthlyPerPention=Math.round(perPention/ageRange/12);
  var monthlyRetirePention=Math.round(retirePention/ageRange/12);
  var shortAmount=reqAsset-(monthlyFinAsset+monthlyPubPention+monthlyPerPention+monthlyRetirePention);  //월 부족금액
  
  // 도넛차트 시작
  var chart = am4core.create("chartdiv", am4charts.PieChart);
  chart.innerRadius = am4core.percent(20);
  chart.logo.disabled = true; //arm차트 로고 숨기기
 
  // 카테고리별 도넛차트 생성
  var pieSeries2 = chart.series.push(new am4charts.PieSeries());
  pieSeries2.dataFields.value = "value";
  pieSeries2.slices.template.propertyFields.fill = "fill";
  pieSeries2.labels.template.fontSize="30";
  pieSeries2.labels.template.propertyFields.disabled = "labelDisabled";  //조각 라벨
  pieSeries2.ticks.template.propertyFields.disabled = "labelDisabled";   //조각 화살표
  // Add data
  pieSeries2.data = [{
    "category": "금융자산",
    "value": monthlyFinAsset,
    "fill":"#008FFB",
    "labelDisabled":true
    }, {
    "category": "공적연금",
    "value": monthlyPubPention,
    "fill":"#00E397",
    "labelDisabled":true
    }, 
    {
    "category": "퇴직연금",
    "value": monthlyRetirePention,
    "fill":"#FEB019",
    "labelDisabled":true
    },
    {
    "category": "개인연금",
    "value": monthlyPerPention,
    "fill":"#B3C9ED",
    "labelDisabled":true,
    },
    
    {
    "category": "부족금액",
    "value": shortAmount,
    "fill":"#FF4560",
    "labelDisabled":true
  }];

  // 부족금액 큰 조각 생성부분
  var pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "value";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.propertyFields.disabled = "labelDisabled2";
  pieSeries.labels.template.propertyFields.disabled = "labelDisabled";  //큰 조각 라벨
  pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";   //큰 조각 화살표
  pieSeries.slices.template.propertyFields.fill = "fill";
  pieSeries.data = [{
    "category": "",
    "value": monthlyFinAsset+monthlyPerPention+monthlyPubPention+monthlyRetirePention,
    "labelDisabled":true,
    "labelDisabled2":true
  
  }, {
    "category": "부족금액",
    "value": shortAmount,
    "labelDisabled" : true,
    "fill":"#FF4560"
  }];

  pieSeries.adapter.add("innerRadius", function(innerRadius, target){
    return am4core.percent(40);
  })
  
  pieSeries2.adapter.add("innerRadius", function(innerRadius, target){
    return am4core.percent(60);
  })
  
  pieSeries.adapter.add("radius", function(innerRadius, target){
    return am4core.percent(100);
  })
  
  pieSeries2.adapter.add("radius", function(innerRadius, target){
    return am4core.percent(80);
  })
  
  // 마우스 클릭 이벤트 제어
  var slice = pieSeries.slices.template;    
  slice.states.getKey("hover").properties.scale = 1;
  slice.states.getKey("active").properties.shiftRadius = 0;
  slice = pieSeries2.slices.template;
  slice.states.getKey("hover").properties.scale = 1;
  slice.states.getKey("active").properties.shiftRadius = 0;

  // 파이차트 가운데 합계 라벨
  var label = pieSeries.createChild(am4core.Label);
  label.text =  '미래준비율\n'+Math.round((monthlyFinAsset+monthlyPerPention+monthlyPubPention+monthlyRetirePention)/reqAsset*100)+"% 달성";
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 40;

  // 오른쪽 카테고리 설명
  var legend = new am4charts.Legend();
  legend.parent = chart.chartContainer;
  legend.fontSize="20"
  legend.align = "right";
  legend.data = [{
    "name": "금융자산 : " + Math.round(monthlyFinAsset/10000)+"만원",
    "fill":"#008FFB"
  }, {
    "name": "공적연금 : " + Math.round(monthlyPubPention/10000)+"만원",
    "fill": "#00E397"
  }, {
    "name": "퇴직연금 : " + Math.round(monthlyRetirePention/10000)+"만원",
    "fill": "#FEB019"
  },{
    "name": "개인연금 : " + Math.round(monthlyPerPention/10000)+"만원",
    "fill": "#B3C9ED"
  },{
    "name": "부족금액 : " + Math.round(shortAmount/10000)+"만원",
    "fill": "#FF4560"
    
  }];
  legend.position="right";
  legend.fontSize=40;
  legend.maxWidth = undefined;
  legend.itemContainers.template.clickable = false;
    legend.itemContainers.template.focusable = false;
    legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
  
}

export {monthlyReqChart}