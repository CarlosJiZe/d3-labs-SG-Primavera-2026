/*
*    main.js
*/

const width = 600;
const height = 400;

const margin = {left: 180, right: 10, top: 130, bottom: 60};

var flag = true;

const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");

const header = svg.append("g")
    .attr("transform", "translate(0, 3)");

header.append("rect")
    .attr("width", "100%")
    .attr("height", 90)
    .attr("fill", "rgb(132, 90, 11)");

header.append("image")
    .attr("href", "img/logo.png")
    .attr("x", 10)
    .attr("y", 5)
    .attr("height", 80);

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//X axis scale
const x = d3.scaleBand()
    .range([0,width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

// Creation of the x axis
const bottomAxis = d3.axisBottom(x);

//Grouping for x axis
var xAxisGroup = g.append("g")
    .attr("transform","translate(0, "+height+")")
    .attr("class","x-axis");

// X axis label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill","white")
    .text("Month"); 

// Y axis scale
const y = d3.scaleLinear()
    .range([height,0]);

// Creation of the y axis
const leftAxis = d3.axisLeft(y)
    .ticks(11)
    .tickFormat(d=>"$"+ (d/1000) + "K");

//Grouping for y axis
const yAxisGroup = g.append("g")
    .attr("class","y-axis");

// Y axis label
var Ylabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill","white")
    .text("Revenue (dlls.)");  

//Loading data
d3.json("data/revenues.json").then((data)=>{

    data.forEach((d)=>{
        d.revenue = +d.revenue
        d.profit = +d.profit
    })

//Simulating update events
d3.interval(()=>{
    console.log("Hello World");
    update(data);
    flag = !flag;
},1000);

update(data);

}).catch((error)=> {
    console.log(error);
});

//Update function
function update(data){

    //Flag to switch between revenue and profit
    var value = flag ? "revenue" : "profit";

    //Flag to switch between labels
    var label = flag ? "Revenue (dlls.)" : "Profit (dlls.)";

    //Update Y label
    Ylabel.text(label);

    //Update scales
    x.domain(data.map(d=> d.month));
    y.domain([0,d3.max(data, d=> d[value])]);

    //Update axes
    xAxisGroup.call(bottomAxis);
    yAxisGroup.call(leftAxis);

    //Styles for axes
    g.selectAll(".x-axis path, .x-axis line, .y-axis path, .y-axis line")
        .attr("stroke", "white");
    
    g.selectAll(".x-axis text, .y-axis text")
        .attr("fill", "white");

    //Join
    const rect = g.selectAll("rect")
    .data(data);

    //Exit
    rect.exit().remove();


    //Update
    rect.attr("x", d=> x(d.month))
        .attr("y",d=> y(d[value]))
        .attr("width",x.bandwidth())
        .attr("height", d=> height - y(d[value]));

    //Enter
    rect.enter().append("rect")
        .attr("x", d=> x(d.month))
        .attr("y",d=> y(d[value]))
        .attr("width",x.bandwidth())
        .attr("height", d=> height - y(d[value]))
        .attr("fill", "rgb(204,204,2)");

}