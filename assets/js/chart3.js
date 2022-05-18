var dom = document.getElementById('chart3');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  backgroundColor: '#111111',
  textStyle: {color: '#ffffff'},
  color :['#FFD331','#FF7E44','#ff3f60'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: '3%',
    left: 'center',
    textStyle: {color: '#fff',fontSize : 10,},
    
  },
  grid: {
    left: '7%',
    right: '4%',
    bottom: '7%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      show: true,
      textStyle:{
        fontSize : 10
      }
    }
  },
  yAxis: {
    type: 'category',
    data: ['Engine Idling','Car/Truck Horn','Car/Truck Music','Loud Talking','Construction','Banging/Pounding','Loud Music/Party'],
    axisLabel: {
      show: true,
      textStyle:{
        fontSize : 13
      }
    }
  },
  series: [
    {
      name: '2019',
      type: 'bar',
      data: [3382,3544,10209,13740,24075,25777,103433]
    },
    {
      name: '2020',
      type: 'bar',
      data: [4935,3368,30348,21999,16978,38808,233696]
    },
    {
      name: '2021',
      type: 'bar',
      data: [6693,3480,32691,21481,16052,41837,237947],
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}
