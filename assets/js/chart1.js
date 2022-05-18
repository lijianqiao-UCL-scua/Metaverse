var dom = document.getElementById('chart1');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  
  color :['#FF7E44'],

  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '1.7%',
    right: '0.5%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    
    axisLabel: {
      show: true,
      textStyle:{
        color:'#ffffff',
        fontSize : 10
      }
    },
    data: ["2019-01","2019-02","2019-03","2019-04","2019-05","2019-06","2019-07","2019-08","2019-09",
    "2019-10","2019-11","2019-12","2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07",
    "2020-08","2020-09","2020-10","2020-11","2020-12","2021-01","2021-02","2021-03","2021-04", "2021-05",
    "2021-06","2021-07","2021-08","2021-09", "2021-10","2021-11","2021-12"]
  },
  yAxis: {
    type: 'value',
    
    axisLabel: {
      show: true,
      textStyle:{
        color:'#ffffff',
        fontSize : 10
      }
    },
  },
  series: [
    {
      type: 'line',
      stack: 'Total',
      data: [14397,13925,16937,19451,25608,27521,14811,18672,21590,16475,12882,12364,13373,12748,16853,
        19568,44623,54290,43260,49765,46659,38491,27830,20699,22194,17890,26886,34620,46206,46849,43320,
        36686,41650,37711,22217,20167]
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);