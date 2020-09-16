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
              maxRotation:0,
              maxTicksLimit:8
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
  };

  const ageArr=(startAge, endAge)=>{
    let ages=[];
    while(startAge<=endAge)ages.push(startAge++);
    return ages;
  }
  
  const buildpensionData=(xArray,dataArray)=>{
    return {
      labels: xArray,
      datasets: dataArray
    }
  }
  
  const buildPensionSet=(originArr,colorInput,pointColor,pointRad,showLine)=>{
    return {
      data: originArr,
      pointRadius: pointRad,
      pointBackgroundColor:pointColor,
      pointBorderColor:pointColor,
      borderWidth: 10,
      borderColor: colorInput,
      backgroundColor: 'transparent',
      showLine:showLine,
    }
  }

  export {reduceData,buildChart,buildPensionSet,buildpensionData,ageArr};