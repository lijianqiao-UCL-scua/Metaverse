// Legend
var colorScale = d3.scaleLinear()
.domain([0,500,14592])
// .range(["#e42c64", "#121b74"]); 
.range(["#FFD333", "#FF7E44", "#FF4060"]);

var colorLegend = d3.legendColor()
.labelFormat(d3.format(",d"))
.scale(colorScale)

let data = new Map()

// ********* code by py start *********
// 
let dateDate = {}
let geojson = []
// data
window.selectDate = {
  year: 2019,
  month: 1,
}
//********* code by py end *********

// map
const mapDraw = () => {
  let topo = geojson[0]
  
  //mapboxgs
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1bWVyIiwiYSI6ImNsMnhxY2IwYTBwZ28zY3FsYmg0c2M1azkifQ.BiKfF9HlqPLW8Qb0WeXvww'
      
  //Setup mapbox-gl map
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-74.025, 40.71],
      zoom: 9.5,  
  })
  
  // map.addControl(new mapboxgl.NavigationControl());
  
  // svg
  var container = map.getCanvasContainer()
  var svg = d3.select(container).append("svg")

  // mouse 
  const mouseOver = function(d) {
    const { year, month } = window.selectDate
    //tooltip
    d3.select("#tooltip")
      .style("opacity", 1);

    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "white") 
      .style("stroke-width", "2")
      .style("stroke-opacity","0.8")
      .style("fill-opacity","0.8");

    //tooltip
    d3.select("#tooltip")
      .style("left", (d3.event.pageX) + 20 + "px")//tooltip
      .style("top", (d3.event.pageY) - 30 + "px")//https://stackoverflow.com/questions/50970336/prevent-css-tooltip-from-going-out-of-page-window
      // .html('Zipcode:' + d.properties.ZIPCODE);
    d3.select("#Truecomplain")
      .text("True complaints:");
    d3.select("#True")
      // ********* load dateDate map  *********
      // .text(dateDate[year][month][d.properties.ZIPCODE] || 0);
      .text(dateDate[d.properties.ZIPCODE] || 0);
    d3.select("#countyname")
      .text(d.properties.COUNTY);
    d3.select("#zipcode")
      .text(d.properties.ZIPCODE); 
  }

  let mouseOut = function(d) {    
    d3.select(this)
      .transition()
      .style("stroke", function (d) {
        const { year, month } = window.selectDate;
        // return colorScale(dateDate[year][month][d.properties.ZIPCODE] || 0);
        return colorScale(dateDate[d.properties.ZIPCODE] || 0);
      })
      .style("stroke-opacity","0.3")
      .style("stroke-width", "1")
      .style("fill-opacity","0.3");
    
    d3.select("#tooltip")
    .style("opacity", 0)
  
  }
  
  //latitude/longtitude 
  var transform = d3.geoTransform({point: projectPoint});
  var path = d3.geoPath().projection(transform);
  var featureElement = svg.selectAll("path")
    .data(topo.features)
    .enter()
    //legend .call(colorLegend)
    .append("path")
    // .attr("stroke", function (d) {
    //   const { year, month } = window.selectDate;
    //   return colorScale(dateDate[year][month][d.properties.ZIPCODE] || 0);
    // })
    // .attr("stroke-opacity",0.3)
    // .style("stroke-width", "1")
    // .attr("fill", function (d) {
    //   const { year, month } = window.selectDate;
    //   return colorScale(dateDate[year][month][d.properties.ZIPCODE] || 0);
    // })
    .attr("fill-opacity", 0.3)
    .on("mouseover", mouseOver )
    .on("mouseout", mouseOut ).attr("d", path);

  //path
  function update() {
    featureElement.attr("d", path)
  }

  map.on("viewreset", update)
  map.on("movestart", function(){
      svg.classed("hidden", true);
  });	
  map.on("rotate", function(){
      svg.classed("hidden", true);
  });	
  map.on("moveend", function(){
      update()
      svg.classed("hidden", false);
  })
  
  //update
  update()
  
  function projectPoint(lon, lat) {
      var point = map.project(new mapboxgl.LngLat(lon, lat));
      this.stream.point(point.x, point.y);
  }

  // ********* change date *********
  window.handleChangeDate = (newData) => {
    dateDate = newData
    // map
    featureElement.attr("fill", function (d) {
      return colorScale(newData[d.properties.ZIPCODE] || 0);
    }).attr("stroke", function (d) {
      return colorScale(newData[d.properties.ZIPCODE] || 0);
    }).attr("d", path)
  }
  //** end */

  // // ********* change date *********
  // window.handleChangeDate = (year, month) => {
  //   window.selectDate = {
  //     year,
  //     month
  //   }
  //   // map
  //   featureElement.attr("fill", function (d) {
  //     const { year, month } = window.selectDate;
  //     return colorScale(dateDate[year][month][d.properties.ZIPCODE] || 0);
  //   }).attr("stroke", function (d) {
  //     const { year, month } = window.selectDate;
  //     return colorScale(dateDate[year][month][d.properties.ZIPCODE] || 0);
  //   }).attr("d", path)
  // }
  // //** end */
}


Promise.all([
  d3.json("./data/NYCgeo.geojson"),
  // d3.csv("./data/year_code.csv", function(item) {
  //   // ********* map *********
  //   if(!dateDate[item.year]) {
  //     dateDate[item.year] = {}
  //   }
  //   if(!dateDate[item.year][item.month]) {
  //     dateDate[item.year][item.month] = {}
  //   }
  //   dateDate[item.year][item.month][item.zipcode] = item.Unique_Key
  // }),
  // d3.csv("./data/gdf5.csv", function(d) {
  //   data.set(d.ZIPCODE, +d.True)
  // })
]).then((res) => {
  geojson = res
  // mapDraw()
});

