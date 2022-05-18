var dom = document.getElementById('chart2');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
/*
$('.image').resize(function (){
  myChart.resize();
});
*/
var app = {};


var optiontwo;

optiontwo = {

  
  /* title: {
    text: 'Types of noise complaints'
  }, */

  //#ff3f60，#FF7E44，#05e499，#FFD331
  //color :['#05e499','#FFD331','#FF7E44'],
  
  color :['#FFD331','#FF7E44','#ff3f60'],

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    
    textStyle:{
      color: '#ffffff',
      fontSize : 10
    }
  },
  grid: {
    left: '4.6%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    
    axisLabel: {
      show: true,
      textStyle:{
        color:'#ffffff',
        fontSize : 10
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['Noise-park','Noise-helicopter','Noise-commercial','Noise-vehicle','Noise-others','Noise-street',
    'Noise-residential'],
    
    axisLabel: {
      show: true,
      textStyle:{
        color:'#ffffff',
        fontSize : 13
      }
    }
  },
  series: [
    {
      name: '2019',
      type: 'bar',
      data: [1600,867,14234,16404,51863,39250,90043]
    },
    {
      name: '2020',
      type: 'bar',
      data: [4056,7958,19353,36997,44610,108414,166530]
    },
    {
      name: '2021',
      type: 'bar',
      data: [5093,5917,27028,40814,44279,101823,171186]
    }
  ]
};

if (optiontwo && typeof optiontwo === 'object') {
  myChart.setOption(optiontwo);
}

