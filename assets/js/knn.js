var buttonFlag = $(".currentFlag").attr("value");
var title_3 = $(".currentFlag").attr("alt");
var neighNumber = ["neighs_5","neighs_10","neighs_30"];
var knnScores = ["74.38% ", "69.70%", "63.63%"];
var types = ['Noise - Residentia','Noise - Commercial','Noise - Helicopter','Noise - Vehicle','Noise - Street/Sidewalk']

var dotColor = d3.scaleOrdinal().domain(types)
.range(["#FF4C69", "#FF8C1B", "#FEDB15", "#02FEA9", "#C34CFF"])



    mapboxgl.accessToken = "pk.eyJ1IjoiY2h1bWVyIiwiYSI6ImNsMnhxY2IwYTBwZ28zY3FsYmg0c2M1azkifQ.BiKfF9HlqPLW8Qb0WeXvww";

    var map;
    const da=d3.json("./data/knn_points.geojson",function(d) {
        return d;
        }
    )   


    
    const data = d3
    .json(
        "./data/knn_points.geojson",
        function(d) {
        return d;
        }
    )
    .then(createMap)
    .then(createDots);

    //button
    //Setting onMouseClick event handler for buttons, set current clustering
    d3.selectAll(".fancy_btn")
    .on("click", function(){                    
    buttonFlag = $(this).attr("value");
    title_3 = $(this).attr("alt");
    $(".btn").removeClass("currentFlag");
    $(this).addClass("currentFlag");
    });

// mouse
const mouseOver = function(d) {


    d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
        .style("fill-opacity","0.8")
        .attr("r", 20);

    if (neighNumber[buttonFlag]=="neighs_5"){
        var neighb=d.properties.neighs_5;
    } else if (neighNumber[buttonFlag]=="neighs_10"){
        var neighb=d.properties.neighs_10;
    } else{
        var neighb=d.properties.neighs_30;
    }
        
    d3.select("#knntip")
        .style("left", (d3.event.pageX) + 20 + "px")//
        .style("top", (d3.event.pageY) - 30 + "px")
        .style("opacity","1")
        .html("Number of Nearest Neighbors:" + "<strong>" + title_3 + "</strong>" + "<br/>" +
        "KNN Prediction Score:" + "<strong>" + knnScores[buttonFlag] + "</strong>" + "<br/>" +
        "Predicted Noise Complaint:" + "<strong>" + neighb + "</strong>");
}

let mouseOut = function(d) {    
    d3.select(this)
    .transition()
    .duration(200)
    .style("fill-opacity","0.5")
    .attr("r", 2);
    
    d3.select("#knntip")
    .style("opacity", 0);

}

    function createMap(data) {
    map = new mapboxgl.Map({
        container: "map_knn", // container id
        style: "mapbox://styles/mapbox/dark-v9", // stylesheet location
        center: [-74.025, 40.71],
        zoom: 9.5, 
    });


    map.on("viewreset", render);
    map.on("move", render);
    map.on("moveend", render);
    render();

    

    // Optional: Modify map with d3
    d3.selectAll(".mapboxgl-canvas")
        .style("opacity", 1)
        .style("position", "absolute")
        .style("z-index", 1);
    return data;
    }

    function createDots(data) {
    var container = map.getCanvasContainer();

    var svg = d3
        .select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "2000")
        // Ensure d3 layer in front of map
        .style("position", "absolute")
        .style("z-index", 10);

    let dots = svg
        .selectAll("circle")
        .data(data.features)
        .enter()
        .append("circle")
        
        .attr("class", "circle")
        .attr("r", 2)
        .style("fill-opacity", "0.5")
    //   .style("fill", "#ff3636")
        .style("fill", function(d){
        if (neighNumber[buttonFlag]=="neighs_5"){
            var neighb=d.properties.neighs_5;
        } else if (neighNumber[buttonFlag]=="neighs_10"){
            var neighb=d.properties.neighs_10;
        } else{
            var neighb=d.properties.neighs_30;
        }
            return dotColor(neighb)
        })
        .on("mouseover",mouseOver)
        .on("mouseout", mouseOut );

    render();
    }

    // Projection method:
    // Project geojson coordinate to the map's current state
    function project(d) {
    return map.project(new mapboxgl.LngLat(d[0], d[1]));
    }

    // Render method redraws lines
    function render() {
    d3.selectAll(".circle")
        .attr("cx", function(d) {
        return project(d.geometry.coordinates).x;
        })
        .attr("cy", function(d) {
        return project(d.geometry.coordinates).y;
        });
    }