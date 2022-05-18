var dom = document.getElementById('chart5');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  backgroundColor: '#111111',
  color :'#FF7E44',
  textStyle: {color: '#ffffff'},
  xAxis: {
    type: 'category',
    data:['low income population','renter-occupied rate','occupied housing units','total population','meidian rooms number','unemployment rate','disability rate'],
    
    axisLabel:{
      show:true,
      interval:0,
      rotate:45,
      textStyle:{
        fontSize : 10
      }
    }
  },
  grid: {
    left:'15%',
    bottom: '10%',
    containLabel: true
  },
  yAxis: {
    type: 'value',
    name:'correlation coefficient',
    nameTextStyle:{
      fontSize:12,
    },
    axisLabel:{
      textStyle:{
        fontSize : 8
      }
    }
  },
  series: [
    {
      data: [0.68, 0.60, 0.58, 0.57, -0.46, 0.41, 0.04],
      type: 'bar',
      label:{
        show:true,
        fontSize:12
      }
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

