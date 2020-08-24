const monthlyReqChart=(retireAge, deadAge, reqAsset, finAsset, pubPention, perPention, retirePention)=>{
    var ageRange=deadAge-retireAge+1; //연령범위
    var reqAsset=reqAsset;  //월 필요금액
    var monthlyFinAsset=Math.round(finAsset/ageRange/12); //월별로 받을 금액  
    var monthlyPubPention=Math.round(pubPention/ageRange/12);
    var monthlyPerPention=Math.round(perPention/ageRange/12);
    var monthlyRetirePention=Math.round(retirePention/ageRange/12);
    var shortAmount=reqAsset-(monthlyFinAsset+monthlyPubPention+monthlyPerPention+monthlyRetirePention);
    
    // Themes begin
    //am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.logo.disabled = true; //arm차트 로고 숨기기

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(20);
    

    // Add second series
    var pieSeries2 = chart.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "category";
    pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
    pieSeries2.slices.template.propertyFields.fill = "fill";
    pieSeries2.labels.template.fontSize="30";
    //pieSeries.legend.itemContainers.template.clickable=false;
    // Add data
    pieSeries2.data = [{
    "category": "금융자산",
    "value": monthlyFinAsset,
    "fill":"#008FFB"
  }, {
    "category": "공적연금",
    "value": monthlyPubPention,
    "fill":"#00E397"
  }, 
  {
    "category": "퇴직연금",
    "value": monthlyRetirePention,
    "fill":"#FEB019"
  },
  {
    "category": "개인연금",
    "value": monthlyPerPention,
    "fill":"#FF4560"
  },
  
    {
    "category": "부족금액",
    "value": shortAmount,
    "labelDisabled":true,
    "fill":"#B3C9ED"
  }];

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.innerRadius = 10;
      pieSeries.slices.template.fillOpacity = 1;
  
      pieSeries.slices.template.propertyFields.disabled = "labelDisabled2";
      pieSeries.labels.template.propertyFields.disabled = "labelDisabled";  //큰 조각 라벨
      pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";   //큰 조각 화살표
    // chart.legend.disabled="legendDisabled";
      // Add data
      pieSeries.data = [{
        "category": "",
        "value": monthlyFinAsset+monthlyPerPention+monthlyPubPention+monthlyRetirePention,
        "labelDisabled":true,
        "labelDisabled2":true,
      
      }, {
        "category": "부족금액",
        "value": shortAmount,
        "labelDisabled" : true
      }];
  
  
  
      // Disable sliding out of slices
      pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
      pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
      
  
  var slice = pieSeries.slices.template;
  slice.states.getKey("hover").properties.scale = 1;
  slice.states.getKey("active").properties.shiftRadius = 0;
  slice = pieSeries2.slices.template;
  slice.states.getKey("hover").properties.scale = 1;
  slice.states.getKey("active").properties.shiftRadius = 0;

  var label = pieSeries.createChild(am4core.Label);   //가운데 합계
  label.text =  "미래준비율\n"+Math.round((monthlyFinAsset+monthlyPerPention+monthlyPubPention+monthlyRetirePention)/reqAsset*100)+"% 달성";
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 40;
  
  pieSeries.adapter.add("innerRadius", function(innerRadius, target){
    return am4core.percent(40);s
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

 /*  var chart2 = am4core.create("chartdiv2", am4charts.XYChart);
  chart2.logo.disabled = true; //arm차트 로고 숨기기
  //chart2.hiddenState.properties.opacity = 0; // this creates initial fade-in
  
  chart2.data = [
    {
      category: "One",
      value1: 1,
      value2: 5
    }
  ];
  
  chart2.colors.step = 2;
  chart2.padding(30, 30, 10, 30);
  
  var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  
  var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = 0;
  valueAxis.max = 100;
  valueAxis.strictMinMax = true;
  valueAxis.calculateTotals = true;
  valueAxis.renderer.minWidth = 50;
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;
  
  
  var series1 = chart2.series.push(new am4charts.ColumnSeries());
  series1.columns.template.width = am4core.percent(100);
  series1.columns.template.tooltipText =
    "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
  series1.name = "Series 1";
  series1.dataFields.categoryX = "category";
  series1.dataFields.valueY = "value1";
  series1.dataFields.valueYShow = "totalPercent";
  series1.dataItems.template.locations.categoryX = 0.5;
  series1.stacked = true;
  series1.tooltip.pointerOrientation = "vertical";
  
  var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
  bullet1.interactionsEnabled = false;
  bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
  bullet1.label.fill = am4core.color("#ffffff");
  bullet1.locationY = 0.5;
  
  var series2 = chart2.series.push(new am4charts.ColumnSeries());
  series2.columns.template.width = am4core.percent(100);
  series2.columns.template.tooltipText =
    "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
  series2.name = "Series 2";
  series2.dataFields.categoryX = "category";
  series2.dataFields.valueY = "value2";
  series2.dataFields.valueYShow = "totalPercent";
  series2.fill="#ffffff";
  series2.dataItems.template.locations.categoryX = 0.5;
  series2.stacked = true;
  series2.tooltip.pointerOrientation = "vertical";
  
  var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
  bullet2.interactionsEnabled = false;
  bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
  bullet2.locationY = 0.5;
  bullet2.label.fill = am4core.color("#000000");
  // end am4core.ready() */
}

export {monthlyReqChart}