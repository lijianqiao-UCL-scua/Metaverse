var dom = document.getElementById('chart4');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  backgroundColor: '#111111',
  color :['#ff3f60','#FF7E44','#FFD331','#fce28d','#ff7c92'],
   textStyle: {color: '#ffffff'},
  legend: {
    top: '10%',
    left: 'center',
    itemGap:35,
    textStyle: {
      fontSize:13,
      color: '#ffffff'},
  },
  tooltip: {},

  dataset: {
    source: [
      ['year', '2019', '2020', '2021'],
      ['MANHATTAN', 29.28, 26.29, 29.37],
      ['BROOKLYN', 28.48, 25.49, 26.47],
      ['BRONX', 21.08, 27.49, 27.07],
      ['QUEENS', 18.18, 18.30, 17.08],
      ['STATEN ISLAND', 2.98, 2.43, 0.01] 
    ]
  },
  title:[
    /* text:'Conplaints Number Per Boroughs (2019 vs 2020 vs 2021)',
    top:'75%',
    left:'15%',
    textStyle:{
      fontSize:'15',
      color:'#ffffff'
    }, */
    {
      subtext: '2019',
      left: '15%',
      top: '75%',
      textAlign: 'center',
      subtextStyle:{
        fontSize: 15,
        color:'#ffffff'
      }
    },
    {
      subtext: '2020',
      left: '50%',
      top: '75%',
      textAlign: 'center',
      subtextStyle:{
        fontSize: 15,
        color:'#ffffff'
      }
    },
    {
      subtext: '2021',
      left: '85%',
      top: '75%',
      textAlign: 'center',
      subtextStyle:{
        fontSize: 15,
        color:'#ffffff'
      }
    },
  ],
  series: [
    {
      type: 'pie',
      radius: ['20%', '35%'],
      center: ['15%', '50%'],
      encode: {
        itemName: 'year',
        value: '2019'
      },
      label: {
        normal: {
            show: false,
            formatter: '{d}%',
            fontSize:'10',
                }
            }
    },
    {
      type: 'pie',
      radius: ['20%', '35%'],
      center: ['50%', '50%'],
      encode: {
        itemName: 'year',
        value: '2020'
      },
      label: {
        normal: {
            show: false,
            formatter: '{d}%',
            fontSize:'10',
                }
            }
    },
    {
      type: 'pie',
      radius: ['20%', '35%'],
      center: ['85%', '50%'],
      encode: {
        itemName: 'year',
        value: '2021'
      },
      label: {
        normal: {
            show: false,
            formatter: '{d}%',
            fontSize:'10',
                }
            }
    },
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

