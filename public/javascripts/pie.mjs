const totalAsset_pieChart=(retireAge, deadAge, reqAsset, finAsset, pubPention, retirePention, perPention)=>{
  var futureScore=0;    //미래준비율 표시 변수
      var ageRange = deadAge - retireAge + 1; //연령범위
      var reqAsset = reqAsset;  //월 필요금액
      var monthlyFinAsset = Math.round(finAsset / ageRange / 12); //월별로 받을 금액들
      var monthlyPubPention = Math.round(pubPention / ageRange / 12);
      var monthlyPerPention = Math.round(perPention / ageRange / 12);
      var monthlyRetirePention = Math.round(retirePention / ageRange / 12);
      var preIncome=finAsset + pubPention + perPention + retirePention;
      var preExpend=reqAsset*ageRange*12;
      var shortAmount = preExpend - preIncome;  //부족금액
      am4core.useTheme(am4themes_animated);

      // 도넛차트 시작
      var chart = am4core.create("totalAsset_pieChart", am4charts.PieChart);
      chart.innerRadius = am4core.percent(10);
      chart.logo.disabled = true; //arm차트 로고 숨기기

      // 카테고리별 도넛차트 생성
      var pieSeries2 = chart.series.push(new am4charts.PieSeries());
      pieSeries2.dataFields.value = "value";
      pieSeries2.slices.template.propertyFields.fill = "fill";
      pieSeries2.labels.template.fontSize = "30";

      pieSeries2.ticks.template.disabled = true;
      pieSeries2.alignLabels = false;
      pieSeries2.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries2.labels.template.radius = am4core.percent(-22);
      pieSeries2.labels.template.fill = am4core.color("white");
          
      
      // Add data
      pieSeries2.data = [{
        "category": "금융자산",
        "value": finAsset,
        "fill": "#22CEE9",
        "labelDisabled" : true
        
      }, {
        "category": "공적연금",
        "value": pubPention,
        "fill": "#FA9F44",
        "labelDisabled" : true
      },
      {
        "category": "퇴직연금",
        "value": retirePention,
        "fill": "#1DCFC1",
        "labelDisabled" : true
      },
      {
        "category": "개인연금",
        "value": perPention,
        "fill": "#CEA974",
        "labelDisabled" : true
      },

      {
        "category": "부족금액",
        "value": shortAmount,
        "fill": "#FFFFFF",
        "labelDisabled": true
      }];

      // 부족금액 큰 조각 생성부분
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.propertyFields.fill = "fill";
      pieSeries.labels.template.fontSize = "37";
      pieSeries.slices.template.strokeWidth = 7;  // 큰 조각 파이 테두리 여백
     
     
      pieSeries.slices.template.propertyFields.disabled = "labelDisabled2";
      pieSeries.labels.template.propertyFields.disabled = "labelDisabled";  //큰 조각 라벨
      pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";   //큰 조각 화살표

      //shortAmout 라벨
      pieSeries.ticks.template.disabled = true;
      pieSeries.alignLabels = false;
      pieSeries.labels.template.text = "[bold]"+(shortAmount / 100000000).toFixed(1)+"억원 부족";
      pieSeries.labels.template.radius = am4core.percent(-10);
      pieSeries.labels.template.fill = am4core.color("red");

      pieSeries.labels.template.adapter.add("radius", function(radius, target) {
        
        return 10;
      });

      pieSeries.data = [{
        "category": "",
        "value": preIncome,
        "labelDisabled": true,
        "labelDisabled2": true

      }, {
        "category": "부족금액\n",
        "value": shortAmount,
        "fill": "#FF4560",
      
      }];

      pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
        return am4core.percent(45);
      })

      pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
        return am4core.percent(45);
      })

      pieSeries.adapter.add("radius", function (innerRadius, target) {
        return am4core.percent(110);
      })

      pieSeries2.adapter.add("radius", function (innerRadius, target) {
        return am4core.percent(90);
      })

      //레전드 박스
      document.getElementById('pie_legend_box1').innerHTML = "금융자산<br>" + (finAsset / 100000000).toFixed(1) + "억원";
      document.getElementById('pie_legend_box2').innerHTML = "공적연금<br>" + (pubPention / 100000000).toFixed(1) + "억원";
      document.getElementById('pie_legend_box3').innerHTML = "퇴직연금<br>" + (retirePention / 100000000).toFixed(1) + "억원";
      document.getElementById('pie_legend_box4').innerHTML = "개인연금<br>" + (perPention / 100000000).toFixed(1) + "억원";
     
      // 마우스 클릭 이벤트 제어
      var slice = pieSeries.slices.template;
      slice.states.getKey("hover").properties.scale = 1;
      slice.states.getKey("active").properties.shiftRadius = 0;
      slice = pieSeries2.slices.template;
      slice.states.getKey("hover").properties.scale = 1;
      slice.states.getKey("active").properties.shiftRadius = 0;

      // 파이차트 가운데 합계 라벨
      var label = pieSeries.createChild(am4core.Label);
      futureScore=Math.round((preIncome / preExpend) * 100);
      document.getElementById('future_span').innerHTML = futureScore+"%";
      label.text = futureScore+"%";
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.fontSize = 80;  
      
      //애니메이션 효과
      pieSeries.hiddenState.properties.endAngle = -80;
      pieSeries2.hiddenState.properties.endAngle = -80;

       // 상단 공통금액 출력
      var totAsset = ((preExpend-preIncome)/100000000).toFixed(1);
     
      if(totAsset>0){
        document.getElementById("totAsset").style.color="red";
        document.getElementById('totState').innerHTML = "부족자금";
      }
      else{
        document.getElementById("totAsset").style.color="blue";
        document.getElementById('totState').innerHTML = "여유자금";
        totAsset=-1*totAsset;
      }
      document.getElementById('totAsset').innerHTML = totAsset+"억원";
      document.getElementById('preIncome').innerHTML = (preIncome/100000000).toFixed(1);
      document.getElementById('preExpend').innerHTML = (preExpend/100000000).toFixed(1);
    
    }


/*연금 Bar차트 함수
      retireAge : 은퇴나이(연금받을 시기)
      deadAge : 죽을나이(연금 종료시기)
      payPubPention : 납부한 공적연금
      prePubpention : 앞으로 납부할 공적연금
      payRetirPention : 납부한 퇴직연금
      prePubPention : 앞으로 납부할 퇴직연금
      payPerPention : 납부한 개인연금
      prePubPention : 앞으로 납부할 개인연금
    
    */
   const monthlyPention_chart=(retireAge, deadAge, payPubPention, prePubPention, payRetirePention, preRetirePention, payPerPention, prePerPention)=> {
    var ageRange = deadAge - retireAge + 1; //연령범위
    var reqAsset = reqAsset;  //월 필요금액
    var monthlyPubPention = Math.round((payPubPention+prePubPention) / ageRange / 12 / 10000); //월별로 받을 연금 금액들(만원단위)
    var monthlyRetirePention = Math.round((payRetirePention+preRetirePention) / ageRange / 12 / 10000);
    var monthlyPerPention = Math.round((prePerPention+prePerPention) / ageRange / 12 / 10000);

    //바 차트 옵션
    var options = {
      series: [{
        name: '현재 납입액',
        data: [Math.round(payPubPention / 1000000), Math.round(payRetirePention / 1000000), Math.round(payPerPention / 1000000)]
      }, {
        name: '추가 예상적립액　　　*단위 : 백만원',
        data: [Math.round(prePubPention / 1000000), Math.round(preRetirePention / 1000000),Math.round(prePerPention / 1000000)],
        color: '#949494'
      }],
      dataLabels: { //바 슬라이스 안에 데이터
        textAnchor: 'middle',
        distributed: false,
        offsetY: 10,
        style: {
          fontSize: '3rem',
          fontWeight: 'bold',
        },
      },
      chart: {  //전체적인 차트 옵션
        type: 'bar',
        height: "65%",
        stacked: true,
        stackType: true,
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {  //x축 옵션
        categories: ['공적연금', '퇴직연금', '개인연금'],
        labels: {
          formatter: function (val) {
            return val
          },
          style: {
            colors: [],
            fontSize: '2.5rem',
            fontFamily: 'KB',
            fontWeight: 500,
            cssClass: 'apexcharts-xaxis-label',
          },
          offsetY: 10
        },
        axisTicks: {
          show: true,
          height: 12
        }
      },
      yaxis: {  //y축 옵션
        labels: {
          style: {
            fontSize: '2.5rem',
            fontFamily: 'KB',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-label'
          }
        }

      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1
      },
      legend: { //도넛 차트 레전드
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '30rem',
        offsetX: 1,
        markers: {
          width: '30rem',
          height: '30rem',
        },
        onItemClick: {
          toggleDataSeries: false
        },
        onItemHover: {
          highlightDataSeries: false
        }
      },
      tooltip: {
        enabled: false,
      },
      states: {
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          }
        },
      }
    }

    var chart = new ApexCharts(document.querySelector("#pention_barchart"), options);
    chart.render();

    // 상단 공통금액 출력
    document.getElementById('monthlyTotPention').innerHTML = monthlyPerPention+monthlyPubPention+monthlyRetirePention;
    document.getElementById('monthlyPubPention').innerHTML = monthlyPubPention;
    document.getElementById('monthlyRetirePention').innerHTML = monthlyRetirePention;
    document.getElementById('monthlyPerPention').innerHTML = monthlyPerPention;

    //테이블 표시
    document.getElementById('prePention').innerHTML = "<td>예상적립액</td><td>" + Math.round(prePubPention / 1000000) + "백만원</td><td>" + Math.round(preRetirePention / 1000000) + "백만원</td><td>" + Math.round(payPerPention / 1000000) + "백만원</td>";
    document.getElementById('payPention').innerHTML = "<td>총납입액</td><td>" + Math.round(payPubPention / 1000000) + "백만원</td><td>" + Math.round(payRetirePention / 1000000) + "백만원</td><td>" + Math.round(payPerPention / 1000000) + "백만원</td>";
  }

  export {monthlyPention_chart , totalAsset_pieChart}
